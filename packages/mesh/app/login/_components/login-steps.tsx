import { useRouter } from 'next/navigation'
import { createElement, useEffect } from 'react'

import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import useAuthState from '@/hooks/use-auth-state'
import useHandleSignIn from '@/hooks/use-handle-sign-in'

import LoginEmail from './login-email'
import LoginEmailConfirmation from './login-email-confirmation'
import LoginEntry from './login-entry'
import LoginSetCategory from './login-set-category'
import LoginSetFollowing from './login-set-following'
import LoginSetName from './login-set-name'
import LoginSetWallet from './login-set-wallet'
import LoginStepsTitle from './login-steps-title'

const loginStepComponents: Record<LoginStepsKey, React.FC> = {
  [LoginState.Entry]: LoginEntry,
  [LoginState.Email]: LoginEmail,
  [LoginState.EmailConfirmation]: LoginEmailConfirmation,
  [LoginState.SetName]: LoginSetName,
  [LoginState.SetCategory]: LoginSetCategory,
  [LoginState.SetFollowing]: LoginSetFollowing,
  [LoginState.SetWallet]: LoginSetWallet,
}

export default function LoginSteps() {
  const router = useRouter()
  const { step } = useLogin()
  const { isLogin } = useAuthState()
  const { handleSignIn } = useHandleSignIn()

  useEffect(() => {
    const init = async () => {
      if (isLogin) {
        router.push('/media')
      } else {
        await handleSignIn()
      }
    }
    init()
  }, [handleSignIn, isLogin, router])

  return (
    <>
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <LoginStepsTitle />
      </div>
      <div className="flex h-full w-full justify-center overflow-auto sm:items-center">
        <div className="sm:w-[480px] sm:rounded-md sm:bg-white sm:drop-shadow">
          {step !== 'entry' && (
            <div className="hidden h-15 w-full flex-row items-center border-b sm:flex">
              <LoginStepsTitle />
            </div>
          )}
          {createElement(loginStepComponents[step])}
        </div>
      </div>
    </>
  )
}