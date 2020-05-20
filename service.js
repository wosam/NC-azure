const adal = require('adal-node').AuthenticationContext;
const request = require('request');
const supportedNamespaces = require('./supportedNamespaces');
const resource = 'https://management.core.windows.net/';
const authorityHostUrl = 'https://login.microsoftonline.com';
let session;

const getRequestSettings = (id, token, requestType, metricList) => {
    if (metricList !== '') metricList = `metricnames=${metricList}&`;
    let url = 'https://management.azure.com' + id + '/providers/microsoft.insights/metrics?' + metricList + 'api-version=2018-01-01';
    if (requestType === 'subscription') url = 'https://management.azure.com/subscriptions?api-version=2020-01-01';
    if (requestType === 'resource') url = 'https://management.azure.com/subscriptions/' + id + '/resources?api-version=2019-10-01';
    if (requestType === 'metricDefinition') url = 'https://management.azure.com' + id + '/providers/microsoft.insights/metricDefinitions?api-version=2018-01-01';

    return {
        'method': 'GET',
        'url': url,
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }
};

const filterResources = (resourcesArray, resourceTypes = []) => {
    return resourcesArray.filter(resource => {
        const isNamespaceSupported = supportedNamespaces.some(namespace => resource.id.toLowerCase().includes(namespace.toLowerCase()));
        const isResourceExtension = resource.id.includes('extensions');
        const isResourceInResourceTypes = resourceTypes ?
            resourceTypes.some(resourceType => resourceType === resource.type) || resourceTypes.some(resourceType => resourceType === resource.kind)
            : true;
        return isNamespaceSupported && !isResourceExtension && isResourceInResourceTypes
    })
};

const getValidToken = (tenant, clientId, clientSecret) => {
    const authContext = new adal(authorityHostUrl + '/' + tenant);
    if (!session || session.expiresOn < new Date()) {
        return new Promise((resolve, reject) => {
            authContext.acquireTokenWithClientCredentials(resource, clientId, clientSecret, (error, tokenResponse) => {
                if (error) resolve(error);
                session = tokenResponse;
                resolve(session);
            });
        });
    }
    return session;
};

const sendMonitorAPIRequest = async (credentials, requestType, id = '', resourceTypes = [], metricList = '',) => {
    const token = await getValidToken(credentials.tenant, credentials.clientId, credentials.clientSecret);
    const requestSettings = getRequestSettings(id, token.accessToken, requestType, metricList);
    return new Promise((resolve, reject) => {
        request(requestSettings, (error, response) => {
            const responseBody = JSON.parse(response.body).value;
            if (error) resolve(error);
            if (requestType === 'subscription') resolve(responseBody);
            if (requestType === 'resource') resolve(filterResources(responseBody, resourceTypes).map(resource => resource.id));
            if (requestType === 'metricDefinition') resolve(responseBody.map(metricDefinition => metricDefinition.name.value + ','));
            if (requestType === 'metricValues') resolve(responseBody)
        })
    })
};

module.exports = {sendMonitorAPIRequest};


