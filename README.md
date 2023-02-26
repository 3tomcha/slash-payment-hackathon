# Back Slash

Back Slashはリファラルプログラムを実現するSlash Extensionです。  

`紹介者のWalletAddress`、`報酬率`、`キャッシュバック率`を設定することで、紹介者への報酬の支払いと紹介で購入者した人へのキャッシュバックが実現できます。  

購入者にリファラルコードを入力してもらい、バックエンドでリファラルコードを検証することによって各種設定を切り替えることができます。  
リファラルコードを使用しない場合や、キャッシュバックしない設定、紹介報酬なしの設定なども可能です。


## テストサイト
https://back-slash.vercel.app/

テストサイトでは以下の設定をしています。

コントラクトオーナー : `0xD214146C6E6051eeDF4de733Aa1d62F089D5928A`
https://blockscout.com/astar/tx/0x6a7caa458e4d59d8e82f735a7e881ff8078de6b3582dcc86206870b5682b33e5

| リファラルコード | 紹介報酬振り込みwallet | 報酬率 | 購入者へのキャッシュバック率 | 実行tx例
| ------------- | ------------- | ------------- | ------------- |  ------------- | 
| なし  | - | - | - | [Link](https://blockscout.com/astar/tx/0x6a7caa458e4d59d8e82f735a7e881ff8078de6b3582dcc86206870b5682b33e5) |
| test1 | `0xdfe3DDBcB66cbC3a88816C0f876F76b2B60884fe` | 1% | 2% |　[Link](https://blockscout.com/astar/tx/0x2675efce01c2b55edb1b364070f451be282cbd0d1d2b47282fa4fbe41b09a088) |
| test2 | `0xDeBeA7Bf019285Cd3ddAd69A6aC1c6E5260d1083` | 3% | 0% | [Link](https://blockscout.com/astar/tx/)　|
| test3 | - | 0% | 5% | [Link](https://blockscout.com/astar/tx/) |

## コントラクト

| ネットワーク | コントラクトアドレス | エクスプローラー | 
| ------------- | ------------- | ------------- | 
| Astar  | `0x2233AE1e9835636843cc445cA2817c732874AaF3` | [Link](https://blockscout.com/astar/address/0x2233AE1e9835636843cc445cA2817c732874AaF3)  | 
