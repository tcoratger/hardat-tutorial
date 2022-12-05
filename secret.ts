import "dotenv/config";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "";

export { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY };