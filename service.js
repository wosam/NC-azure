const adal = require('adal-node').AuthenticationContext;
const request = require('request');
const supportedNamespaces = require('./supportedNamespaces');
const resource = 'https://management.core.windows.net/';
const authorityHostUrl = 'https://login.microsoftonline.com';

let serviceClientId;
let serviceClientSecret;
let authContext;
let session;

const setCredentials = (tenant, clientId, clientSecret) => {
    serviceClientId = clientId;
    serviceClientSecret = clientSecret;
    authContext = new adal(authorityHostUrl + '/' + tenant);
};

const getRequestSettings = (id, token, requestType, metricList) => {
    metricList = metricList ? `metricnames=${metricList}&` : '';
    let url = 'https://management.azure.com' + id + '/providers/microsoft.insights/metrics?' + metricList + 'api-version=2018-01-01';
    if (requestType === 'resourceRequest') url = 'https://management.azure.com/subscriptions/' + id + '/resources?api-version=2019-10-01';
    if (requestType === 'metricDefinitionRequest') url = 'https://management.azure.com' + id + '/providers/microsoft.insights/metricDefinitions?api-version=2018-01-01';

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
        return supportedNamespaces.some(namespace => resource.id.toLowerCase().includes(namespace.toLowerCase()))
            && !resource.id.includes('extensions')
            && (resourceTypes ? resourceTypes.some(resourceType => resourceType === resource.type) || resourceTypes.some(resourceType => resourceType === resource.kind) : true)
    })
};

async function getValidToken() {
    if (!session || session.expiresOn < new Date()) {
        return new Promise((resolve, reject) => {
            authContext.acquireTokenWithClientCredentials(resource, serviceClientId, serviceClientSecret, (error, tokenResponse) => {
                if (error) resolve(error);
                session = tokenResponse;
                resolve(session);
            });
        });
    }
    return session;
}

async function sendMonitorAPIRequest(id, requestType, metricList = '', resourceTypes = []) {
    const token = await getValidToken();
    const requestSettings = getRequestSettings(id, token.accessToken, requestType, metricList);
    return new Promise((resolve, reject) => {
        request(requestSettings, (error, response) => {
            const responseBody = JSON.parse(response.body).value;
            if (error) resolve(error);
            if (requestType === 'resourceRequest') {
                resolve(filterResources(responseBody, resourceTypes).map(resource => resource.id))
            }
            if (requestType === 'metricDefinitionRequest') resolve(responseBody.map(metricDefinition => metricDefinition.name.value + ','));
            if (requestType === 'metricValuesRequest') resolve(responseBody)
        })
    })
}

module.exports = {sendMonitorAPIRequest, setCredentials};


