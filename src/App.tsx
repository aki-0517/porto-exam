import './App.css'
import { BuyNow } from './components/BuyNow'
import { ConnectWithPermissions } from './components/ConnectWithPermissions'
import { SendTip } from './components/SendTip'
import { SignInOut } from './components/SignInOut'
import { useAccount, useDisconnect, useChainId } from 'wagmi'
import { useState } from 'react'

const idOrigin = 'https://id.porto.sh' // 必要に応じて環境変数で切り替え

function AccountInfo() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  if (!address) return null
  return (
    <div style={{ margin: '32px 0', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 16 }}>
      <a
        href={idOrigin}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'linear-gradient(90deg, #e0e7ef 0%, #c7d2fe 100%)',
          color: '#2a3a5e',
          fontWeight: 600,
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: 12,
          padding: '14px 32px',
          textDecoration: 'none',
          boxShadow: '0 2px 8px 0 rgba(60, 80, 120, 0.08)',
          transition: 'background 0.2s',
        }}
      >
        Porto ID
      </a>
      <button onClick={() => disconnect()} style={{ fontSize: '1.1rem', padding: '14px 40px', borderRadius: 12 }}>Sign out</button>
    </div>
  )
}

function App() {
  const [tab, setTab] = useState<'normal' | 'permission'>('normal')
  const { address } = useAccount()

  return (
    <div className="App">
      <h1>Porto MVP Demo</h1>

      {/* サインインしていない場合：ログインUIのみ表示 */}
      {!address && (
        <section className="login-section" style={{ marginBottom: 40, padding: 32 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            <button
              className={tab === 'normal' ? 'tab-active' : 'tab-inactive'}
              style={{ flex: 1, borderRadius: '8px 0 0 8px' }}
              onClick={() => setTab('normal')}
            >
              1. アカウント接続 / サインイン・サインアウト
            </button>
            <button
              className={tab === 'permission' ? 'tab-active' : 'tab-inactive'}
              style={{ flex: 1, borderRadius: '0 8px 8px 0' }}
              onClick={() => setTab('permission')}
            >
              2. パーミッション付き接続
            </button>
          </div>
          <div style={{ marginTop: 24 }}>
            {tab === 'normal' && (
              <>
                <h2 style={{ textAlign: 'center' }}>アカウント接続 / サインイン・サインアウト</h2>
                <p style={{ color: '#555', fontSize: 14, textAlign: 'center' }}>
                  <b>通常のウォレット接続</b>です。<br />
                  ユーザーが自分のアカウント（ウォレット）をアプリに接続し、サインイン・サインアウトできます。<br />
                  これは「このアプリを使う」ための基本的な接続です。
                </p>
                <SignInOut />
              </>
            )}
            {tab === 'permission' && (
              <>
                <h2 style={{ textAlign: 'center' }}>パーミッション付き接続</h2>
                <p style={{ color: '#555', fontSize: 14, textAlign: 'center' }}>
                  <b>パーミッション付き接続</b>は、
                  「このアプリにどんな操作を許可するか」を細かく指定して接続する機能です。<br />
                  例：特定のコントラクトへの呼び出しや、1時間あたり10EXPまでの送金など、<br />
                  利用範囲を限定した「安全な接続」ができます。
                </p>
                <ConnectWithPermissions />
              </>
            )}
          </div>
        </section>
      )}

      {/* サインイン済みの場合：決済・チップ送信のみ表示＋サインアウトボタン */}
      {address && (
        <>
          <AccountInfo />
          <div className="card-row">
            <section className="card-col">
              <h2>3. 決済（NFT購入例）</h2>
              <p style={{ color: '#555', fontSize: 14 }}>
                <b>決済フローの例</b>です。<br />
                EXPトークンを使ってNFT（スニーカー）を購入する一連の流れを体験できます。
              </p>
              <BuyNow />
            </section>
            <section className="card-col">
              <h2>4. チップ送信（パーミッション利用）</h2>
              <p style={{ color: '#555', fontSize: 14 }}>
                <b>パーミッション機能を活用した送金例</b>です。<br />
                事前に許可した範囲内で、クリエイターにEXPトークンをチップとして送ることができます。
              </p>
              <SendTip />
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default App
