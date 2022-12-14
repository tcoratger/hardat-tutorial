require("@nomicfoundation/hardhat-chai-matchers")
require("@nomicfoundation/hardhat-toolbox");

import { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY } from "./secret";

module.exports = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
