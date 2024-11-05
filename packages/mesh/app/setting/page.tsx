import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'

import MobileAccountActions from './_components/mobile-account-actions'
import NonMobileAccountActions from './_components/non-mobile-account-actions'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <main className="sm:flex sm:justify-center sm:px-5 sm:pb-[167px] sm:pt-5 xl:pb-[43px]">
      <MobileAccountActions />
      <NonMobileAccountActions />
    </main>
  )
}
