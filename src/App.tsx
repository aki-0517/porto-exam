import './App.css'
import { BuyNow } from './components/BuyNow'
import { ConnectWithPermissions } from './components/ConnectWithPermissions'
import { SendTip } from './components/SendTip'
import { SignInOut } from './components/SignInOut'

function App() {
  return (
    <div className="App">
      <h1>Porto MVP Demo</h1>

      {/* アカウント接続/サインイン・サインアウト */}
      <section style={{ marginBottom: 32 }}>
        <h2>1. アカウント接続 / サインイン・サインアウト</h2>
        <p style={{ color: '#555', fontSize: 14 }}>
          <b>通常のウォレット接続</b>です。<br />
          ユーザーが自分のアカウント（ウォレット）をアプリに接続し、サインイン・サインアウトできます。<br />
          これは「このアプリを使う」ための基本的な接続です。
        </p>
        <SignInOut />
      </section>

      {/* パーミッション付き接続 */}
      <section style={{ marginBottom: 32 }}>
        <h2>2. パーミッション付き接続</h2>
        <p style={{ color: '#555', fontSize: 14 }}>
          <b>パーミッション付き接続</b>は、
          「このアプリにどんな操作を許可するか」を細かく指定して接続する機能です。<br />
          例：特定のコントラクトへの呼び出しや、1時間あたり10EXPまでの送金など、<br />
          利用範囲を限定した「安全な接続」ができます。
        </p>
        <ConnectWithPermissions />
      </section>

      {/* 決済（NFT購入例） */}
      <section style={{ marginBottom: 32 }}>
        <h2>3. 決済（NFT購入例）</h2>
        <p style={{ color: '#555', fontSize: 14 }}>
          <b>決済フローの例</b>です。<br />
          EXPトークンを使ってNFT（スニーカー）を購入する一連の流れを体験できます。
        </p>
        <BuyNow />
      </section>

      {/* パーミッションを利用したチップ送信 */}
      <section style={{ marginBottom: 32 }}>
        <h2>4. チップ送信（パーミッション利用）</h2>
        <p style={{ color: '#555', fontSize: 14 }}>
          <b>パーミッション機能を活用した送金例</b>です。<br />
          事前に許可した範囲内で、クリエイターにEXPトークンをチップとして送ることができます。
        </p>
        <SendTip />
      </section>
    </div>
  )
}

export default App
