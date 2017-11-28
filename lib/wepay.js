var http = require('https');

exports.version = '0.0.9';

exports.WEPAY = function(settings)
{
    for (key in settings) {
        if (!settings[key])
            settings[key] = null;
    }

    var _in_production = false,
        options = {
            headers : {
                'Content-Type': 'application/json',
                'User-Agent': 'WePay NodeJS SDK'
            },
            method  : 'POST',
            port    : 443,
        };

    var get_domain = function()
    {
        if (_in_production) {
            host = 'wepayapi.com';
        } else {
            host = 'stage.wepayapi.com';
        }
        options.host = host;
        return host;
    }

    return {
        use_production: function()
        {
            _in_production = true;
            get_domain();
            return this;
        },

        use_staging: function()
        {
            _in_production = false;
            get_domain();
            return this;
        },

        call: function(url, params, callbackFunction, riskToken, clientIP) {
            options.path = '/v2' + url;
            var _params = JSON.stringify(params);

            // set API Version
            if (settings.api_version){
                options.headers['Api-Version'] = settings.api_version;
            }

            if (settings.access_token) {
                options.headers['Authorization'] = 'Bearer ' + settings.access_token;
            }

            // set risk tokens
            if (riskToken) {
                options.headers['WePay-Risk-Token'] = riskToken;
            }
            if (clientIP) {
                options.headers['Client-IP'] = clientIP;
            }
            
            var request = http.request(options, function(response) {
                // setup a variable to hold all of the response info.
                // it's possible that the response is too larger for NodeJS to handle in a single request
                // this will appropriately chunk the incoming response so that we receive all of the info 
                var body = "";
                response.on('data', function(chunk) {
                    body += chunk;
                });
                response.on("end", function() {
                    // check the callbackFunction and return the data we received
                    if (callbackFunction && typeof callbackFunction === 'function') {
                        // encode the chunked body and perform the callback
                        callbackFunction(JSON.parse(body.toString('utf8')));
                    }
                });
            });
            
            request.write(_params);

            request.on('error', function(e) {
                throw new Error(e.message);
            });

            request.end();
        },

        get_access_token: function()
        {
            return settings.access_token;
        },

        get_api_version: function()
        {
            return settings.api_version;
        },

        get_client_id: function()
        {
            return settings.client_id;
        },

        get_client_secret: function()
        {
            return settings.client_secret;
        },

        set_access_token: function(access_token)
        {
            settings.access_token = access_token;
        },

        set_api_version: function(api_version)
        {
            settings.api_version = api_version;
        },

        set_client_id: function(client_id)
        {
            settings.client_id = client_id;
        },

        set_client_secret: function(client_secret)
        {
            settings.client_secret = client_secret;
        }
    }
};
