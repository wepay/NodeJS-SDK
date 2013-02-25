// load in your modules
var wepay = require('./wepay').WEPAY;

// local variables
var wepay_settings = {
	'client_id'     : '17742123120',
	'client_secret' : '6280c3asdaceb6',
	'access_token'  : 'a9asdaff4cb866893119097e0c29ee1f7886b3891e76b4599cb589c232b4f8f6ddcd', // used for oAuth2
}

var wp = new wepay(wepay_settings);
wp.use_staging(); // use staging environment (payments are not charged)

try {
	wp.call('/checkout/create',
		{
			'account_id': 1513122,
			'short_description': 'Selling 42 Pens',
			'type': 'GOODS',
			'amount': 50
		},
		function(response) {
			console.log('%s', response);
		}
	);
} catch (error) {
	console.log(error);
}