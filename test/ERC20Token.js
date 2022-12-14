// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { checkProperties } = require("ethers/lib/utils");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("ERC20");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Mint and burn", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Set total supply after mint", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      const mint = await hardhatToken.mint(100); 

      const totalSupplyAfterMint = (await hardhatToken.totalSupply()).toString();

      console.log("totalSupplyAfterMint", totalSupplyAfterMint);

    

      expect(totalSupplyAfterMint).to.equal("100");
    });


    it("Set total supply after mint and burn", async function () {
        // We use loadFixture to setup our environment, and then assert that
        // things went well
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
  
        const mint = await hardhatToken.mint(100); 
        const burn = await hardhatToken.burn(10); 
  
        const totalSupplyAfterMint = (await hardhatToken.totalSupply()).toString();
  
        console.log("totalSupplyAfterMint and burn", totalSupplyAfterMint);
  
        expect(totalSupplyAfterMint).to.equal("90");
    });

  });


  describe("Approval", function () {

    it("Set approval", async function () {

        // We use loadFixture to setup our environment, and then assert that
        // things went well
        const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);


        const approve = await hardhatToken.approve(addr1.address, 50);

        // Transfer 50 tokens from owner to addr1
        await expect(approve)
        .to.emit(hardhatToken, "Approval")
        .withArgs(owner.address, addr1.address, 50);

        console.log("allowance", await hardhatToken.allowance(owner.address, addr1.address))

        expect(await hardhatToken.allowance(owner.address, addr1.address)).to.equal(50);

    });

  });
});