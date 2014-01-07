![wepay logo](https://www.wepay.com/files/logo_regular.png)

  Official WePay NodeJS SDK [wepay](https://www.wepay.com).

```js
// load in your modules
var wepay = require('wepay').WEPAY;                       // if wepay.js is installed globally/locally
// var wepay = require('./wepay').WEPAY;                        // if wepay.js is in the same directory as your script

// local variables
var wepay_settings = {
	'client_id'     : '127580',
	'client_secret' : '6180c3de46',
	'access_token'  : 'a9ff4ce866893119097e0c29ee1f7886b3891e76b4599ab589c232b4f2f6ddcd', // used for oAuth2
	// 'api_version': 'API_VERSION'
}

var wp = new wepay(wepay_settings);
wp.use_staging(); // use staging environment (payments are not charged)
wp.call('/checkout/create',
	{
		'account_id': 1723052,
		'short_description': 'Selling 42 Pens',
		'type': 'GOODS',
		'amount': 50
	},
	function(response) {
		console.log('%s', response);
	}
);
```

## Installation

 Local installation:

    $ npm install wepay

 Global installation:

    $ npm install -g wepay

 Note:

    When installing with global settings, you'll need to set your NODE_PATH environment variable.

 Install dependencies:

    $ npm install

## Endpoints

  You can specify in the SDK which endpoint (stage or prod) you wish to use. See, [endpoints](https://stage.wepay.com/developer/reference/endpoints).

  To use staging endpoint:
    
    wp.use_staging();

  To use production endpoint:
    
    wp.use_production();

## More Information

  * [WePay API](https://www.wepay.com/developer) for documentation
  * [API Support](https://support.wepay.com) for API questions

## License 

(The MIT License)

Copyright (c) 2009-2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
