const adal = require('adal-node').AuthenticationContext;
const request = require('request');
const authorityHostUrl = 'https://login.microsoftonline.com';
const tenant = 'e36f7ecd-3289-4db2-a23f-6b587e569a88';
const authorityUrl = authorityHostUrl + '/' + tenant;
const clientId = '9513aaf3-685b-45ec-a016-b0f19151ecc7';
const clientSecret = '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5';
const resource = 'https://management.core.windows.net/';
const availableMetrics = 'CpuTime,Requests,BytesReceived,BytesSent,Http101,Http2xx,Http3xx,Http401,Http403,Http404,Http406,Http4xx,Http5xx';
const context = new adal(authorityUrl);
// https:\//management.azure.com/subscriptions/\*{subscription-id}*/resourceGroups/*{resource-group-name}*/providers/*{resource-provider-namespace}*/*{resource-type}*/*{resource-name}*/providers/microsoft.insights/metrics?$filter=*{filter}*&api-version=*{apiVersion}*


const id = '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Web/sites/alfa111';

const getOptions = token => ({
    'method': 'GET',
    'url': 'https://management.azure.com' + id + '/providers/microsoft.insights/metrics?metricnames='+availableMetrics+'&api-version=2018-01-01',
    'headers': {
        'Authorization': 'Bearer ' + token
    }
});

const getData = (err, tokenResponse) => {
    if (err) {
        console.log(`Token generation failed due to ${err}`);
    } else {
        getResources(getOptions(tokenResponse.accessToken));
        //console.dir(tokenResponse, { depth: null, colors: true });
    }
};

const getResources = options => request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(/*JSON.parse*/(response.body));
});


context.acquireTokenWithClientCredentials(
    resource,
    clientId,
    clientSecret,
    getData
);







list = [{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/NetworkWatcherRG/providers/Microsoft.Network/networkWatchers/NetworkWatcher_westeurope',
        name: 'NetworkWatcher_westeurope',
    type: 'Microsoft.Network/networkWatchers',
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.BotService/botServices/Alfa111',
        name: 'Alfa111',
    type: 'Microsoft.BotService/botServices',
    sku: [Object],
    kind: 'sdk',
    location: 'global',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Compute/disks/C',
        name: 'C',
    type: 'Microsoft.Compute/disks',
    sku: [Object],
    managedBy:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Compute/virtualMachines/ws1',
        location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/WS/providers/Microsoft.Compute/disks/ws1_disk1_31a38876e6fe4d86ae361f92ec9abebd',
        name: 'ws1_disk1_31a38876e6fe4d86ae361f92ec9abebd',
    type: 'Microsoft.Compute/disks',
    sku: [Object],
    managedBy:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Compute/virtualMachines/ws1',
        location: 'westeurope' },
// { id:
//     '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Compute/virtualMachines/ws1',
//         name: 'ws1',
//     type: 'Microsoft.Compute/virtualMachines',
//     location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Compute/virtualMachines/ws1/extensions/LinuxDiagnostic',
        name: 'ws1/LinuxDiagnostic',
    type: 'Microsoft.Compute/virtualMachines/extensions',
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/microsoft.insights/actiongroups/test akcji',
        name: 'test akcji',
    type: 'microsoft.insights/actiongroups',
    location: 'global',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/microsoft.insights/metricalerts/cpu alert',
        name: 'cpu alert',
    type: 'microsoft.insights/metricalerts',
    location: 'global',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/microsoft.insights/metricalerts/testowy alert',
        name: 'testowy alert',
    type: 'microsoft.insights/metricalerts',
    location: 'global',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Network/networkInterfaces/ws1330',
        name: 'ws1330',
    type: 'Microsoft.Network/networkInterfaces',
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Network/networkSecurityGroups/ws1-nsg',
        name: 'ws1-nsg',
    type: 'Microsoft.Network/networkSecurityGroups',
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Network/publicIPAddresses/ws1-ip',
        name: 'ws1-ip',
    type: 'Microsoft.Network/publicIPAddresses',
    sku: [Object],
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Network/virtualNetworks/ws-vnet',
        name: 'ws-vnet',
    type: 'Microsoft.Network/virtualNetworks',
    location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Sql/servers/ws1',
        name: 'ws1',
    type: 'Microsoft.Sql/servers',
    kind: 'v12.0',
    location: 'westeurope',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Sql/servers/ws1/databases/master',
        name: 'ws1/master',
    type: 'Microsoft.Sql/servers/databases',
    sku: [Object],
    kind: 'v12.0,system',
    managedBy:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Sql/servers/ws1',
        location: 'westeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Sql/servers/ws1/databases/wsDb',
        name: 'ws1/wsDb',
    type: 'Microsoft.Sql/servers/databases',
    sku: [Object],
    kind: 'v12.0,user',
    location: 'westeurope',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Storage/storageAccounts/wsdiag896',
        name: 'wsdiag896',
    type: 'Microsoft.Storage/storageAccounts',
    sku: [Object],
    kind: 'Storage',
    location: 'westeurope',
    tags: {} },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Web/serverFarms/Alfa111',
        name: 'Alfa111',
    type: 'Microsoft.Web/serverFarms',
    sku: [Object],
    kind: 'app',
    location: 'northeurope' },
{ id:
    '/subscriptions/015cdaee-3214-4384-8172-445505af2019/resourceGroups/ws/providers/Microsoft.Web/sites/alfa111',
        name: 'alfa111',
    type: 'Microsoft.Web/sites',
    kind: 'app',
    location: 'northeurope' }];
