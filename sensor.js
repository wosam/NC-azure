const MonitorAPIService = require('./service');
const subscriptionId = '015cdaee-3214-4384-8172-445505af2019';
const tenant = 'e36f7ecd-3289-4db2-a23f-6b587e569a88';
const clientId = '9513aaf3-685b-45ec-a016-b0f19151ecc7';
const clientSecret = '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5';

async function test() {
    MonitorAPIService.setCredentials(tenant,clientId,clientSecret);
    const resources = await MonitorAPIService.sendMonitorAPIRequest(subscriptionId, 'resourceRequest', '', ['functionapp','Microsoft.Compute/virtualMachines']);
    console.log(resources, resources.length);
    const metricDefinitions = await MonitorAPIService.sendMonitorAPIRequest(resources[0], 'metricDefinitionRequest');
    console.log(metricDefinitions);
    const metricValues = await MonitorAPIService.sendMonitorAPIRequest(resources[0], 'metricValuesRequest', `${metricDefinitions[0]}${metricDefinitions[2]}`);
    console.log(metricValues[1]/*.timeseries[0].data*/);
}

test();
