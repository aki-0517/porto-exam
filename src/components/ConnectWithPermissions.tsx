import { useConnect } from 'wagmi'
import { parseEther } from 'viem'
import { exp1Config } from './abi'

// permissions関数（ドキュメント例準拠）
export const permissions = () =>
  ({
    expiry: Math.floor(Date.now() / 1_000) + 60 * 60, // 1 hour
    permissions: {
      calls: [{ to: exp1Config.address }],
      spend: [
        {
          limit: parseEther('10'),
          period: 'hour',
          token: exp1Config.address,
        },
      ],
    },
  }) as const

export function ConnectWithPermissions() {
  const { connectors, connect } = useConnect()
  const connector = connectors.find(c => c.id === 'xyz.ithaca.porto')!

  return (
    <button
      onClick={() => {
        connect({
          connector,
          capabilities: {
            grantPermissions: permissions(),
          },
        } as any)
      }}
      type="button"
    >
      Sign in (with permissions)
    </button>
  )
} 