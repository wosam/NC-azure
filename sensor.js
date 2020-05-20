const MonitorAPIService = require('./service');
//const subscriptionId = '015cdaee-3214-4384-8172-445505af2019';
const tenant = 'e36f7ecd-3289-4db2-a23f-6b587e569a88';
const clientId = '9513aaf3-685b-45ec-a016-b0f19151ecc7';
const clientSecret = '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5';

const getCredentials = () => ({
    tenant,
    clientId,
    clientSecret
});

async function test() {
    const subscription = await MonitorAPIService.sendMonitorAPIRequest(
        getCredentials(), 'subscription');
    console.log('SUB', subscription[0].subscriptionId);
    const resources = await MonitorAPIService.sendMonitorAPIRequest(
        getCredentials(), 'resource', subscription[0].subscriptionId, ['functionapp', 'Microsoft.Compute/virtualMachines']);
    console.log(resources, resources.length);
    const metricDefinitions = await MonitorAPIService.sendMonitorAPIRequest(
        getCredentials(), 'metricDefinition', resources[0]);
    console.log(metricDefinitions);
    const metricValues = await MonitorAPIService.sendMonitorAPIRequest(
        getCredentials(), 'metricValues', resources[0], [], `${metricDefinitions[0]}${metricDefinitions[2]}`);
    console.log(metricValues[1]/*.timeseries[0].data*/);
}

test();
