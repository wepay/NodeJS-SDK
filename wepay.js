var http = require('https'),
	querystring = require('querystring');

exports.version = '0.0.1';

exports.WEPAY = function(settings)
{
	var _client_id     = settings.client_id     ? settings.client_id     : null,
		_client_secret = settings.client_secret ? settings.client_secret : null,
		_access_token  = settings.access_token  ? settings.access_token  : null
		_in_production = false,
		options = {
			port    : 443,
			method  : 'POST',
			headers : {
				'Content-Length': 0,
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'WePay NodeJS SDK',
				'Authorization': 'Bearer ' + _access_token,
			},
		};
	
	var get_domain = function()
	{
		if (_in_production) {
			host = 'https://www.wepayapi.com';
		} else {
			host = 'stage.wepayapi.com';
		}
		options.host = host;
		return host;
	}
	
	var set_params = function(params)
	{
		var _params = querystring.stringify(params);
		options.headers['Content-Length'] = _params.length;
		return _params;
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
			var _params = set_params(params),
				_arguments = arguments;
			
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
		
		set_access_token: function(access_token)
		{
			_access_token = access_token;
		}
	}
};