const provider = new ethers.providers.Web3Provider(window.ethereum);

let signer = "";
document.getElementById("wallet").addEventListener("click", async () => {
  // 链接钱包
  await provider.send("eth_requestAccounts", []);
  // 获取签名
  signer = provider.getSigner();
  // 获取钱包地址
  const address = await signer.getAddress();
  console.log("address", address);
  $("#address").html(address);
  // 获取钱包余额
  let pendingBal = await provider.getBalance(address, "pending");
  // 获取完整余额
  const balance = ethers.utils.formatEther(pendingBal);
  console.log("balance", balance);
});
