// const { ethers } = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

let signer = "";
$(document).on("click", "#wallet", async () => {
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  const address = await signer.getAddress();
  $("#address").html(address);
  let pendingBal = await provider.getBalance(address, "padding");
  const balance = ethers.utils.formatEther(pendingBal);
  console.log("balance", balance);
});
