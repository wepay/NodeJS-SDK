// load in your modules
var wepay = require('./lib/wepay.js').WEPAY;

const WepayClient = require('./lib/wepayClient');

var wepay_settings = {
  access_token: 'a9asdaff4cb866893119097e0c29ee1f7886b3891e76b4599cb589c232b4f8f6ddcd', // used for oAuth2
  client_id: '17742123120',
  client_secret: '6280c3asdaceb6',
};

async function callWepay() {
  const client = new WepayClient(
    'a9asdaff4cb866893119097e0c29ee1f7886b3891e76b4599cb589c232b4f8f6ddcd'
  );

  try {
    const response = await client.call('/checkout/create', {
      account_id: 1513122,
      amount: 50,
      currency: 'USD',
      short_description: 'Selling 42 Pens',
      type: 'goods',
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

callWepay();