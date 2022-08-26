// private key，以后肯定不能这么写，这里为了测试
const privateKey =
  "9df47d444a20043e3fd40604dc0f2825f42b92346d842609c17f3e8daa4c6b48";

// create a wallet instance with the private key
const wallet = new ethers.Wallet(privateKey);

// connect Ganache (local test network)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
// return a new wallet instance of connected new Provider
const activeWallet = wallet.connect(provider);

console.log("activeWallet: ", activeWallet);

// get wallet address of Ganache
$("#address").html(activeWallet.address);

// get balance of Ganache
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
    // get 签名
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
    // 会把历史操作都获取出来
    contract.on("Instructor", (author, oldValue, newValue, event) => {
      // 在值变化的时候被调用
      console.log("author", author);
      console.log("oldValue", oldValue);
      // "Hello World"
      console.log("newValue", newValue);
      const [name, age] = newValue.args;
      $("#name").html(name);
      $("#age").html(age.toString());
    });
    // try {
    //   const [name, age] = await contract.getInfo();
    //   $("#name").html(name);
    //   $("#age").html(age.toString());
    // } catch (e) {
    //   console.log(e);
    // }
  });
});

// $(document).on("click", "#ok", function () {
//   swap();
// });
