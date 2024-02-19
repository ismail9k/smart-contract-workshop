// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Get the contract factory for the HelloWorld contract
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

  // Deploy the contract with the initial message
  const helloWorld = await HelloWorld.deploy("Hello world!");

  // Wait for the contract to be deployed
  await helloWorld.waitForDeployment();

  console.log(`HelloWorld deployed to: ${helloWorld.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
