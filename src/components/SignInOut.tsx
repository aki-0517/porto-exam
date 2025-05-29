import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function SignInOut() {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect } = useConnect()
  const connector = connectors.find(c => c.id === 'xyz.ithaca.porto')!

  if (account.address)
    return (
      <div>
        <div>{account.address.slice(0, 6)}...{account.address.slice(-4)}</div>
        <button onClick={() => disconnect()}>Sign out</button>
      </div>
    )

  return (
    <button onClick={() => connect({ connector })}>
      Sign in
    </button>
  )
} 