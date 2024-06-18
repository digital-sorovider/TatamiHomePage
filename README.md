# TatamiHomePage
畳サーバー公式ホームページのリポジトリです。
## プロジェクトのセットアップ
### 1. リポジトリのクローン
次のコマンドを使用してリポジトリをクローン出来ます。
> [!WARNING]
> Gitのインストールが必要です。インストールされていない場合は下記のURLからアプリケーションをダウンロードしてインストールしてください。  
> https://git-scm.com/downloads
```sh
git clone https://github.com/Tatami-Server/TatamiHomePage.git
```
### 2. Node.jsのセットアップ
Windowsの場合は次のコマンドを使用してNode.jsの最新版をインストールできます。  
また、後述するパッケージ「nvm」を用いて別バージョンのNode.jsをセットアップすることもできます。
```sh
winget install nodejs
```
インストール完了後、Code上のターミナルあるいはCode自体の再起動が必要です。
`node -v` を実行し、Node.jsのバージョンが表示されたらセットアップは成功です。
> [!TIP]
> Powershellを使用している場合はセキュリティポリシーによりnpmが実行できない可能性があります。その場合はスタートからPowershellを**管理者権限**で起動し次のコマンドを実行してください。
> ```
> PowerShell Set-ExecutionPolicy RemoteSigned
> ```
> これで実行できるようになります。このコマンドが実行できない場合はPowershellからWindows コマンドプロンプトへの移行を行ってください。

### 3. プロジェクトのセットアップ
Node.jsパッケージは`node_modules`フォルダに格納されますがサイズが大きいためGithub上にはアップしていません。そこで、同梱されているpackage.jsonを使って必要なパッケージをインストールすることができます。
クローンしたリポジトリのフォルダを開き、ターミナルで次のコマンドを実行してください。
```sh
npm i
```
これにより自動的に必要なパッケージがインストールされます。
> [!TIP]
> インストール中に次のエラーでインストールが失敗することがあります。
> ```
> npm ERR! sha512-k3Da+QreMb9waaGCHNAHox5QqxnZEYlQmvIVYwQibrI6OpIRyIIyFGgDV5dXRLr1AJ32JLqEh0VxQEq20dFskw== integrity checksum failed when using sha512: wanted sha512-k3Da+QreMb9waaGCHNAHox5QqxnZEYlQmvIVYwQibrI6OpIRyIIyFGgDV5dXRLr1AJ32JLqEh0VxQEq20dFskw== but got sha512-r/UcFj7JS3lRjv9cgYjgpDNbAsGUdqU64n6ZUOgSF7s1UFBbGu7pUDwKEjHu9NBCy6j2AmmjNW4rijR4De65eA==. (2809 bytes)
> ```
> このエラーが発生した場合はフォルダ内にある`package-lock.json`というファイルを削除し、再度`npm i`を行ってください。

**プロジェクトのセットアップは以上で終わりです。**

### nvmによるNode.jsバージョン管理
次のアプリケーションを使用することでNode.jsをコマンドによるバージョン切り替えができるようになります。
https://github.com/coreybutler/nvm-windows  
Windowsの場合は次のリンクからインストーラをダウンロードし、インストールしてください。  
https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe  
インストール後、コマンドプロンプトで`nvm list`で、**現在インストールされているNode.jsのバージョン**が表示されます。  
`nvm install 18.18.0` でv18.18.0のNode.jsが自動的にインストールされます。バージョン一覧は次のリンクから確認できます。  
https://github.com/nodejs/node/tags  
セットアップが終わったら一番下に`nvm use ...`というテキストが表示されるのでそれをコピーして実行すれば自動的にそのバージョンに設定されます。
**ただし、Code、Code内のターミナルの再起動が必要です**
