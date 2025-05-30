import * as React from 'react'
import { useAccount, useSendCalls, useWaitForCallsStatus, useReadContract, useWatchBlockNumber } from 'wagmi'
import { parseEther, formatUnits } from 'viem'
import { exp1Config } from './abi'
import type { Address } from 'viem'

const format = (num: bigint | number | undefined, units = 18) => {
  if (!num) return '0'
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 4,
  }).format(typeof num === 'bigint' ? Number(formatUnits(num, units)) : num)
}

export function SendTip(props: { address?: Address | undefined }) {
  const { address = props.address, status } = useAccount()
  const creatorAddress = '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e' as Address

  const { data: exp1Balance, refetch: expBalanceRefetch } = useReadContract({
    abi: exp1Config.abi,
    address: exp1Config.address,
    args: [creatorAddress],
    functionName: 'balanceOf',
  })

  useWatchBlockNumber({
    enabled: true,
    onBlockNumber: (_) => expBalanceRefetch(),
  })

  const { data, isPending, sendCalls } = useSendCalls()
  const { error, isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForCallsStatus({ id: data?.id })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const shared = {
      abi: exp1Config.abi,
      to: exp1Config.address,
    } as const
    const amount = parseEther('1')
    sendCalls({
      calls: [
        {
          ...shared,
          args: [address!, amount],
          functionName: 'approve',
        },
        {
          ...shared,
          args: [address!, creatorAddress, amount],
          functionName: 'transferFrom',
        },
      ],
    })
  }

  return (
    <section
      style={{ opacity: status === 'disconnected' ? 0.5 : 1 }}
      title={status === 'disconnected' ? 'Connect your wallet to send a tip' : ''}
    >
      <h2>Tip Creator</h2>
      <img alt="Creator Avatar" src="../../public/creator.png" style={{ height: '120px', width: '120px' }} />
      <div>
        <p>Received - {format(exp1Balance ?? 0)} EXP1</p>
      </div>
      <form onSubmit={submit}>
        <button disabled={isPending} type="submit">
          {isPending ? 'Tipping creator…' : 'Send a tip'}
        </button>
      </form>
      {data?.id && <div>Transaction Hash: {data.id}</div>}
      {isConfirming && 'Waiting for confirmation…'}
      {isConfirmed && 'Tip sent!'}
      {error && <div>Error: {error.message}</div>}
    </section>
  )
} 