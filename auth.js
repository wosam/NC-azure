const adal = require('adal-node').AuthenticationContext;
const request = require('request');
const authorityHostUrl = 'https://login.microsoftonline.com';
const tenant = 'e36f7ecd-3289-4db2-a23f-6b587e569a88';
const authorityUrl = authorityHostUrl + '/' + tenant;
const clientId = '9513aaf3-685b-45ec-a016-b0f19151ecc7';
const clientSecret = '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5';
const resource = 'https://management.core.windows.net/';

const context = new adal(authorityUrl);

const getOptions = token => ({
    'method': 'GET',
    //  https://management.azure.com/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/azmon-rest-api-walkthrough/providers/Microsoft.Storage/storageAccounts/ContosoStorage/providers/microsoft.insights/metricDefinitions?api-version=2018-01-01

    'url': 'https://management.azure.com/subscriptions/015cdaee-3214-4384-8172-445505af2019/resources?api-version=2019-10-01',
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
    console.log(JSON.parse(response.body));
});


context.acquireTokenWithClientCredentials(
    resource,
    clientId,
    clientSecret,
    getData
);














//
//
// /*
//  * @copyright
//  * Copyright © Microsoft Open Technologies, Inc.
//  *
//  * All Rights Reserved
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http: *www.apache.org/licenses/LICENSE-2.0
//  *
//  * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
//  * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
//  * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
//  * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
//  *
//  * See the Apache License, Version 2.0 for the specific language
//  * governing permissions and limitations under the License.
//  */
// 'use strict';
//
// var fs = require('fs');
// var adal = require('adal-node');
//
//
// var AuthenticationContext = adal.AuthenticationContext;
//
// function turnOnLogging() {
//     var log = adal.Logging;
//     log.setLoggingOptions(
//         {
//             level : log.LOGGING_LEVEL.VERBOSE,
//             log : function(level, message, error) {
//                 console.log(message);
//                 if (error) {
//                     console.log(error);
//                 }
//             }
//         });
// }
//
// /*
//  * You can override the default account information by providing a JSON file
//  * with the same parameters as the sampleParameters variable below.  Either
//  * through a command line argument, 'node sample.js parameters.json', or
//  * specifying in an environment variable.
//  * {
//  *    "tenant" : "rrandallaad1.onmicrosoft.com",
//  *    "authorityHostUrl" : "https://login.windows.net",
//  *    "clientId" : "624ac9bd-4c1c-4687-aec8-b56a8991cfb3",
//  *    "clientSecret" : "verySecret=""
//  * }
//  */
// var parametersFile = process.argv[2] || process.env['ADAL_SAMPLE_PARAMETERS_FILE'];
//
// var sampleParameters;
// if (parametersFile) {
//     var jsonFile = fs.readFileSync(parametersFile);
//     if (jsonFile) {
//         sampleParameters = JSON.parse(jsonFile);
//     } else {
//         console.log('File not found, falling back to defaults: ' + parametersFile);
//     }
// }
//
// // const tenant = 'e36f7ecd-3289-4db2-a23f-6b587e569a88';
// // const authorityUrl = authorityHostUrl + '/' + tenant;
// // const clientId = '9513aaf3-685b-45ec-a016-b0f19151ecc7';
// // const clientSecret = '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5';
//
// if (!parametersFile) {
//     sampleParameters = {
//         tenant : 'e36f7ecd-3289-4db2-a23f-6b587e569a88',
//         authorityHostUrl : 'https://login.windows.net',
//         clientId : '9513aaf3-685b-45ec-a016-b0f19151ecc7',
//         clientSecret : '1J3uN@0Isx4RFj-BrRrVnGOns/rqVe:5'
//     };
// }
//
// var authorityUrl = sampleParameters.authorityHostUrl + '/' + sampleParameters.tenant;
//
// var resource = '00000002-0000-0000-c000-000000000000';
//
// turnOnLogging();
//
// var context = new AuthenticationContext(authorityUrl);
//
// context.acquireTokenWithClientCredentials(resource, sampleParameters.clientId, sampleParameters.clientSecret, function(err, tokenResponse) {
//     if (err) {
//         console.log('well that didn\'t work: ' + err.stack);
//     } else {
//         console.log(tokenResponse);
//     }
// });
//
