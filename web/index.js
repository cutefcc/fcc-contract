// 私钥，以后肯定不能这么写，这里为了测试
const privateKey =
  "f76ba05b9256abf7c6661c6604546b05a5ffe3b3d99e3e93fd400bf6c445c1e4";

// 通过 参数 privateKey 私钥创建一个钱包实例
const wallet = new ethers.Wallet(privateKey);

//连接 Ganache 本地测试网络
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
// 返回连接到新的 Provider 的钱包实例
const activeWallet = wallet.connect(provider);

console.log("activeWallet: ", activeWallet);

$("#address").html(activeWallet.address);
activeWallet
  .getBalance("pending")
  .then((balance) => {
    console.log("balance: ", balance);
    $("#money").html(ethers.utils.formatEther(balance));
  })
  .catch((error) => {
    console.log(error);
  });

$("#btn1").click(function () {
  $.getJSON("/build/contracts/InfoContract.json", async function (data) {
    const address = data.networks["5777"].address;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, data.abi, signer);
    await contract.setInfo("fcc", parseInt(Math.random() * 20));
    console.log("contract调度成功");
  });
});

$("#btn2").click(function () {
  $.getJSON("/build/contracts/InfoContract.json", async function (data) {
    // const provider = ethers.getDefaultProvider();
    const address = data.networks["5777"].address;
    const contract = new ethers.Contract(address, data.abi, provider);
    contract.on("Instructor", (author, oldValue, newValue, event) => {
      // 在值变化的时候被调用
      console.log(author);
      console.log("oldValue", oldValue);
      // "Hello World"
      console.log("newValue", newValue);
      const [name, age] = newValue.args;
      $("#name").html(name);
      $("#age").html(age.toString());
    });
    try {
      const [name, age] = await contract.getInfo();
      $("#name").html(name);
      $("#age").html(age.toString());
    } catch (e) {
      console.log(e);
    }
  });
});

// $(document).on("click", "#ok", function () {
//   swap();
// });
