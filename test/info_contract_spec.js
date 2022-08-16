const InfoContractSpec = artifacts.require("InfoContractSpec");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("InfoContractSpec", function (/* accounts */) {
  it("should assert true", async function () {
    await InfoContractSpec.deployed();
    return assert.isTrue(true);
  });
});
