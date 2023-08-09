const express = require('express');
const app = express();
const bitcoinRpc = require('bitcoin-rpc');
require('dotenv').config();

const BTC_STARTER_ADDRESS = process.env.BTC_STARTER_ADDRESS;
const BTC_HOTWALLET = process.env.BTC_HOTWALLET;
const CURRENT_BTC_PRICE = parseFloat(process.env.CURRENT_BTC_PRICE);

const rpcConfig = {
  protocol: 'http',
  user: 'rpc_username', // Replace with your Bitcoin RPC username
  pass: 'rpc_password', // Replace with your Bitcoin RPC password
  host: 'bitcoin-node', // The service name in docker-compose.yml
  port: '8332',
};

const client = new bitcoinRpc.Client(rpcConfig);

app.get('/balances', async (req, res) => {
  try {
    const starterBalance = await client.getBalance(BTC_STARTER_ADDRESS);
    const hotwalletBalance = await client.getBalance(BTC_HOTWALLET);
    res.json({ starterBalance, hotwalletBalance });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balances' });
  }
});

// More routes for price feeds and other functionalities

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
