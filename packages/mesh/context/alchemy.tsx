'use client'

import type { AlchemyAccountsConfig } from '@alchemy/aa-alchemy/config'
import {
  type AlchemyAccountsProviderProps,
  AlchemyAccountProvider,
} from '@alchemy/aa-alchemy/react'
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { type PropsWithChildren, Suspense, useRef } from 'react'

import { alchemyConfig } from '@/utils/alchemy'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}
let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export const AlchemyProviders = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps['initialState']
}>) => {
  const ref = useRef<AlchemyAccountsConfig>()
  if (!ref.current) {
    ref.current = alchemyConfig()
  }
  const queryClient = getQueryClient()

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider
          config={ref.current}
          queryClient={queryClient}
          initialState={initialState}
        >
          {children}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </Suspense>
  )
}
