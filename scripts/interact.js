const HelloWorld = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const { API_PROVIDER, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// Provider
const alchemyProvider = new ethers.AlchemyProvider("sepolia", API_PROVIDER);
// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  HelloWorld.abi,
  signer
);

async function main() {
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("this is the new message");
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log("The new message is: " + newMessage);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
