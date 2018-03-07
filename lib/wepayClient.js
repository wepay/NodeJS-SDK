const http = require('https');

// Stage API endpoint
const STAGE_API_ENDPOINT = 'stage.wepayapi.com';

// Production API endpoint
const PRODUCTION_API_ENDPOINT = 'wepayapi.com';
let settings = {};

/**
 * Creates a new options object based on the default options and the given parameters.
 * @param {string} url API URL to be called.
 * @param {string} riskToken Risk Token.
 * @param {string} clientIP IP address of the client calling the API.
 * @returns A new object with the required request options set.
 */
function setRequestOptions(url, riskToken, clientIP) {
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'WePay NodeJS SDK',
    },
    method: 'POST',
    port: 443,
  };

  if (settings.accessToken) options.headers['Authorization'] = `Bearer ${settings.accessToken}`;
  if (settings.apiVersion) options.headers['Api-Version'] = settings.apiVersion;
  if (riskToken) options.headers['WePay-Risk-Token'] = riskToken;
  if (clientIP) options.headers['Client-IP'] = clientIP;

  options.host = settings.host;
  options.path = `/v2${url}`;

  return options;
}

/**
 * Sets the new API endpoint based on the options.useStage flag.
 */
function setHost() {
  settings.host = settings.useStage ? STAGE_API_ENDPOINT : PRODUCTION_API_ENDPOINT;
}

/**
 * Creates a new instance of the WepayClient.
 * @param {string} accessToken Token to access WePay API.
 * @param {boolean} [useStage=null] Specifies if stage endpoint should be used.
 * @param {string} [apiVersion=null] Specifies the API version to set in the Api-Version header.
 */
function WepayClient(accessToken, useStage = true, apiVersion = null) {
  settings = {
    accessToken,
    useStage,
    apiVersion,
    host: useStage ? STAGE_API_ENDPOINT : PRODUCTION_API_ENDPOINT,
  };
}

WepayClient.prototype.call = (url, params, riskToken, clientIP) => {
  return new Promise((resolve, reject) => {
    const _params = JSON.stringify(params);

    const callOptions = setRequestOptions(url, riskToken, clientIP);

    const request = http.request(callOptions, response => {
      let body = '';

      response.on('data', chunk => (body += chunk));

      response.on('end', () => resolve(JSON.parse(body.toString('utf8'))));
    });

    request.write(_params);
    request.on('error', error => reject(error.message));
    request.end();
  });
};

WepayClient.prototype.get_access_token = () => settings.accessToken;
WepayClient.prototype.get_api_version = () => settings.accessToken;
WepayClient.prototype.set_access_token = token => (settings.accessToken = token);
WepayClient.prototype.set_api_version = apiVersion => (settings.apiVersion = apiVersion);
WepayClient.prototype.use_staging = () => {
  settings.useStage = true;
  setHost();
};
WepayClient.prototype.use_production = () => {
  settings.useStage = false;
  setHost();
};

module.exports = WepayClient;
