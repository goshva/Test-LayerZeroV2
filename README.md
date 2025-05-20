# SimpleOFT Cross-Chain Token Bridge

## Overview
A fullstack application demonstrating a LayerZero V2 omnichain token (OFT) with cross-chain transfers, a subgraph for event indexing, a backend API, and a React frontend.

## Setup

### Prerequisites
- Node.js v16+
- Hardhat
- MetaMask
- Local Graph Node (optional for subgraph)

### Installation
1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd simple-oft
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Smart Contract**
   - Update `hardhat.config.js` with Sepolia and Base Goerli network configs.
   - Deploy contracts:
     ```bash
     npx hardhat run scripts/deploy.js --network sepolia
     npx hardhat run scripts/deploy.js --network baseGoerli
     ```

4. **Subgraph**
   - Update `subgraph.yaml` with contract address and start block.
   - Deploy to local Graph Node:
     ```bash
     graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001
     ```

5. **Backend**
   - Start server:
     ```bash
     node server.js
     ```

6. **Frontend**
   - Start Vite dev server:
     ```bash
     npm run dev
     ```

## Deployment
- Deploy `SimpleOFT.sol` to Sepolia (chainId: 10121) and Base Goerli (chainId: 10160).
- Configure LayerZero endpoint addresses in deployment scripts.
- Update frontend `contractAddress` and `abi`.

## Testing
Run tests with:
```bash
npx hardhat test
```

## Usage
1. Connect MetaMask to Sepolia or Base Goerli.
2. Mint tokens (owner only).
3. Input amount and destination chain, then click "Bridge".
4. View transfer history in the table.

## Notes
- Replace placeholder addresses in `server.js` and `index.html`.
- Ensure sufficient testnet ETH for gas fees.
