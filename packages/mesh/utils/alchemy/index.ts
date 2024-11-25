import type { AlchemyGasManagerConfig } from '@alchemy/aa-alchemy'
import type { SupportedAccountTypes } from '@alchemy/aa-alchemy/config'
import { cookieStorage, createConfig } from '@alchemy/aa-alchemy/config'
import type { SmartAccountClientOptsSchema } from '@alchemy/aa-core'
import type { z } from 'zod'

import { PAYMENT_CHAIN } from '@/constants/config'
import { ALCHEMY_ADDRESS } from '@/constants/config'

export const chain = PAYMENT_CHAIN
export const alchemyConfig = () =>
  createConfig({
    rpcUrl: '/api/rpc/chain/' + chain.id,
    signerConnection: {
      rpcUrl: '/api/rpc/',
    },
    chain,
    ssr: true,
    storage: cookieStorage,
  })

export const accountType: SupportedAccountTypes = 'LightAccount'
export const gasManagerConfig: AlchemyGasManagerConfig = {
  policyId: ALCHEMY_ADDRESS.policyId,
}

type SmartAccountClientOptions = z.infer<typeof SmartAccountClientOptsSchema>
export const accountClientOptions: Partial<SmartAccountClientOptions> = {
  txMaxRetries: 20,
}
