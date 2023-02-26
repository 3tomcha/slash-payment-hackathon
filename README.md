# Back Slash

Back Slashはリファラルプログラムを実現するSlash Extensionです。  

`紹介者のWalletAddress`、`報酬率`、`キャッシュバック率`を設定することで、紹介者への報酬の支払いと紹介で購入者した人へのキャッシュバックが実現できます。  

購入者にリファラルコードを入力してもらい、バックエンドでリファラルコードを検証することによって各種設定を切り替えることができます。  
リファラルコードを使用しない場合や、キャッシュバックしない設定、紹介報酬なしの設定なども可能です。

Astar&Slashハッカソンで作成しました。  
-> [プロダクトページ](https://app.akindo.io/communities/mVE6QvgdZsNQ9NMA/products/Nmv64W7WlUdxAWQe8)


## テストサイト
https://back-slash.vercel.app/

テストサイトでは以下の設定をしています。

コントラクトオーナー : `0xD214146C6E6051eeDF4de733Aa1d62F089D5928A`

| リファラルコード | 紹介報酬振り込みwallet | 報酬率 | 購入者へのキャッシュバック率 | 実行tx例
| ------------- | ------------- | ------------- | ------------- |  ------------- | 
| なし  | - | - | - | [Link](https://blockscout.com/astar/tx/0x6a7caa458e4d59d8e82f735a7e881ff8078de6b3582dcc86206870b5682b33e5) |
| test1 | `0xdfe3DDBcB66cbC3a88816C0f876F76b2B60884fe` | 1% | 2% | [Link](https://blockscout.com/astar/tx/0x26fd96ce204d7e10fd7ef6205cab774165a069857b95f986d20fc8f9664cc84c) |　
| test2 | `0xDeBeA7Bf019285Cd3ddAd69A6aC1c6E5260d1083` | 3% | 0% | [Link](https://blockscout.com/astar/tx/0x76055ec8378720d2bfca63d5c5fdb6c592aadc8405520f265ca2da5611438316)　|
| test3 | - | 0% | 5% | [Link](https://blockscout.com/astar/tx/0x4fc0fdf4a6e8fc1f1b5f2348e446cafc2abaf15c3fc8c56a3ed8fa76b16d89b9) |

## コントラクト

| ネットワーク | コントラクトアドレス | エクスプローラー | 
| ------------- | ------------- | ------------- | 
| Astar  | `0x2233AE1e9835636843cc445cA2817c732874AaF3` | [Link](https://blockscout.com/astar/address/0x2233AE1e9835636843cc445cA2817c732874AaF3)  | 

## 使い方
①BackSlashをSlashExtensionに設定  
②報酬アドレス、報酬率、キャッシュバック率をPaymentRequestAPIの`ext_reserved`に渡す
```js
const extReserved = ethers.utils.AbiCoder.prototype.encode(
  ["address", "uint256", "uint256"],
  [rewardAddress, rewardRate, cashBackRate]
);

// call Payment Request API
const requestObj = {
  identification_token: authenticationToken,
  order_code: orderCode,
  verify_token: hashHex,
  amount: amount,
  amount_type: amountType,
  ext_reserved: extReserved,
  ext_description: referralCode ? `referral code: ${referralCode}` : "",
};
const paymentRequestUrl = process.env.SLASH_PAYMENT_REQUEST_URL ?? "";
const result = await axios
  .post(paymentRequestUrl, requestObj)
  .catch((error) => {
    return error.response;
  });
```
