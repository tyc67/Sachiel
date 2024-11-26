import { useUser } from '@/context/user'
import { useMemo } from 'react'

export default function useUserPayload() {
  const { user } = useUser()
  const memberId = user.memberId
  const email = user.email
  const firebaseId = user.firebaseId

  return useMemo(() => {
    return {
      memberType: memberId ? 'logged-in' : 'none-logged-in',
      email,
      firebaseId,
    }
  }, [memberId, email, firebaseId])
}
