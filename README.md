![wepay logo](https://go.wepay.com/static/images/logo.svg)

Official WePay NodeJS SDK [wepay](https://www.wepay.com).

```js
// load in your modules
const { WepayClient } = require('wepay');

const client = new WepayClient(process.env.WEPAY_ACCESS_TOKEN);

client.use_staging();

client
  .call('/checkout/create', {
    account_id: 1723052,
    amount: 50,
    currency: 'USD',
    short_description: 'Selling 42 Pens',
    type: 'goods',
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
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

client.use_staging();

To use production endpoint:

client.use_production();

## Risk Headers

You can supply WePay with risk-related information on every API call by passing the WePay-Risk-Token and Client-IP values to the `call` function:

```js
clientwp.call(
  '/checkout/create',
  {
    account_id: 1723052,
    amount: 50,
    currency: 'USD',
    short_description: 'Selling 42 Pens',
    type: 'goods',
  },
  '123e4567-e89b-12d3-a456-426655440000',
	'100.166.99.123')
	.then(response => {
    console.log('%s', response);
	})
	.catch(error => {
		console.log(error);
	});
);
```

Detailed information regarding the Risk Headers can be found at the [WePay API Documentation](https://developer.wepay.com/reference/risk_headers).

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
