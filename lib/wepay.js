var http = require('https');

exports.version = '0.0.3';

exports.WEPAY = function(settings)
{
    for (key in settings) {
        if (!settings[key])
            settings[key] = null;
    }

    var _in_production = false,
        options = {
            headers : {
                'Authorization': 'Bearer ' + settings.access_token,
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

        call: function(url, params, callbackFunction) {
            options.path = '/v2' + url;
            var _params = JSON.stringify(params);

            // adjust the content length
            options.headers['Content-Length'] = _params.length;

            // set API Version
            if (settings.api_version){
                options.headers['Api-Version'] = settings.api_version;
            }

            var request = http.request(options, function(response) {
                response.on('data', function(chunk) {
                    // get the last argument
                    if (callbackFunction && typeof callbackFunction === 'function') {
                        callbackFunction(JSON.parse(chunk.toString('utf8')));
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

        set_access_token: function(access_token)
        {
            settings.access_token = access_token;
        },

        set_api_version: function(api_version)
        {
            settings.api_version = api_version;
        }
    }
};
