// load in your modules
const WepayClient = require('./lib/wepayClient');

const WEPAY_ACCESS_TOKEN = 'a9asdaff4cb866893119097e0c29ee1f7886b3891e76b4599cb589c232b4f8f6ddcd';

async function callWepay() {
  const client = new WepayClient(
    WEPAY_ACCESS_TOKEN
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