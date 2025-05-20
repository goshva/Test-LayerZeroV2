const express = require('express');
const { request } = require('graphql-request');
const app = express();
const port = 3001;

const SUBGRAPH_URL = 'http://localhost:8000/subgraphs/name/simple-oft';

app.get('/bridge-history', async (req, res) => {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Address required' });

  const query = `
    query($user: Bytes!) {
      bridgeTransfers(where: { user: $user }) {
        amount
        dstChainId
        timestamp
      }
    }
  `;
  try {
    const data = await request(SUBGRAPH_URL, query, { user: address.toLowerCase() });
    res.json(data.bridgeTransfers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));