var http = require('https');

exports.version = '0.0.3';

exports.WEPAY = function(settings)
{
	var _client_id     = settings.client_id     ? settings.client_id     : null,
		_api_version   = settings.api_version   ? settings.api_version   : null,
		_client_secret = settings.client_secret ? settings.client_secret : null,
		_access_token  = settings.access_token  ? settings.access_token  : null,
		_in_production = false,
		options = {
			port    : 443,
			method  : 'POST',
			headers : {
				'Content-Type': 'application/json',
				'User-Agent': 'WePay NodeJS SDK',
				'Authorization': 'Bearer ' + _access_token
			},
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
		
		call: function(url, params, callback) {
			options.path = '/v2' + url;
			var _params = JSON.stringify(params),
				_arguments = arguments;
			
			// adjust the content length
			options.headers['Content-Length'] = _params.length;

			// set API Version
			if (_api_version){
				options.headers['Api-Version'] = _api_version;
			}
			
			var request = http.request(options, function(response) {
				response.on('data', function(chunk) {
					// get the last argument
					var last = _arguments[_arguments.length - 1];
					if (last && typeof last == 'function') {
						last(chunk);
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
			return _access_token;
		},
		
		get_api_version: function()
		{
			return _api_version;
		},
		
		set_access_token: function(access_token)
		{
			_access_token = access_token;
		},

		set_api_version: function(api_version)
		{
			_api_version = api_version;
		}
	}
};
