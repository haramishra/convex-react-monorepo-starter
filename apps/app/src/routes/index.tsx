import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthActions } from '@convex-dev/auth/react'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@repo/ui/components/input'
import { Button } from '@repo/ui/components/button'
import { useForm } from '@tanstack/react-form'
// import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from 'react'
// import { Route as OnboardingUsernameRoute } from "@/routes/_app/_auth/onboarding/_layout.username";
// import { Route as DashboardRoute } from "@/routes/_app/_auth/dashboard/_layout.index";
import { useQuery } from '@tanstack/react-query'
import { convexQuery, useConvexAuth } from '@convex-dev/react-query'
import { api } from '@cvx/_generated/api'
import LoginLayout from '@/components/loginContainer'
import { Trans, useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

function LoginPage() {
  const { isAuthenticated, isLoading } = useConvexAuth()

  const navigate = useNavigate()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated) {
      // Once we determine redirection is needed, set a flag.
      setRedirecting(true)
      if (!isAuthenticated) return

      navigate({ to: '/protected' })
    }
  }, [isAuthenticated])

  // If we are loading or already redirecting, show a loading indicator.
  if (isLoading || redirecting) {
    return <div>Loading...</div>
  }

  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  )
}

function Login() {
  const [step, setStep] = useState<'signIn' | { email: string }>('signIn')

  if (step === 'signIn') {
    return <LoginForm onSubmit={(email) => setStep({ email })} />
  }
  return <VerifyForm email={step.email} />
}

const zodEmailSchema = z.object({
  email: z.string().email('Invalid email'),
})

function LoginForm({ onSubmit }: { onSubmit: (email: string) => void }) {
  const { signIn } = useAuthActions()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      await signIn('EmailProvider', value)
      onSubmit(value.email)
      setIsSubmitting(false)
    },
    validators: {
      onChange: zodEmailSchema,
    },
  })
  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <h3 className="text-center text-2xl font-medium text-primary">
          {t('auth.title')}
        </h3>
        <p className="text-center text-base font-normal text-primary/60">
          {t('auth.description')}
        </p>
      </div>
      <form
        className="flex w-full flex-col items-start gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="email" className="sr-only">
            {t('auth.email')}
          </label>
          <form.Field
            name="email"
            validators={{ onChangeAsyncDebounceMs: 500 }}
            children={(field) => (
              <Input
                placeholder={t('auth.email')}
                type="email"
                autoComplete="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
                  'border-destructive focus-visible:ring-destructive'
                }`}
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          {form.state.fieldMeta.email?.errors.length > 0 && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {form.state.fieldMeta.email?.errors.length > 0 &&
                t('auth.invalidEmail')}
            </span>
          )}
          {/*           
          {!authEmail && authError && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {authError.message}
            </span>
          )}
          */}
        </div>

        <Button type="submit" className="w-full">
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>{t('auth.getStartWithEmail')}</span>
          )}
        </Button>
      </form>

      <div className="relative flex w-full items-center justify-center">
        <span className="absolute w-full border-b border-border" />
        <span className="z-10 bg-card px-2 text-xs font-medium uppercase text-primary/60">
          {t('auth.or')}
        </span>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent"
          onClick={() => signIn('google', { redirectTo: '/team' })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary/80 group-hover:text-primary"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49"
            />
          </svg>

          {t('auth.loginWithGoogle')}
        </Button>
      </div>

      <p className="px-12 text-center text-sm font-normal leading-normal text-primary/60">
        {t('auth.termsStart')}{' '}
        <a
          href="https://lucidforms.co/legal/terms-of-service/"
          className="hover:text-primary underline"
          target="_blank"
        >
          {t('auth.termsOfService')}
        </a>{' '}
        {t('auth.and')}{' '}
        <a
          href="https://lucidforms.co/legal/privacy-policy/"
          className="hover:text-primary underline"
          target="_blank"
        >
          {t('auth.privacyPolicy')}
        </a>
        {t('auth.termsEnd')}
      </p>
    </div>
  )
}

const zodOTPSchema = z.object({
  code: z.string().min(6, 'Code must be at least 6 characters.'),
})

function VerifyForm({ email }: { email: string }) {
  const { signIn } = useAuthActions()
  const { t } = useTranslation()
  const form = useForm({
    validators: {
      // DEMO: You can switch between schemas seamlessly
      onChange: zodOTPSchema,
      // onChange: ValibotSchema,
      // onChange: ArkTypeSchema,
      // onChange: EffectSchema,
    },
    defaultValues: {
      code: '',
    },
    onSubmit: async ({ value }) => {
      await signIn('EmailProvider', { email, code: value.code })
    },
  })
  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-center text-2xl text-primary">{t('otp.title')}</p>
        <p className="text-center text-base font-normal text-primary/60">
          {t('otp.subtitle')}
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="code" className="sr-only">
            {t('otp.codeLabel')}
          </label>
          <form.Field
            name="code"
            validators={{ onChangeAsyncDebounceMs: 500 }}
            children={(field) => {
              return (
                <Input
                  placeholder={t('otp.codePlaceholder')}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`bg-transparent ${
                    field.state.meta?.errors.length > 0 &&
                    'border-destructive focus-visible:ring-destructive'
                  }`}
                />
              )
            }}
          />
        </div>

        <div className="flex flex-col">
          {form.state.fieldMeta.code?.errors.length > 0 && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {form.state.fieldMeta.code?.errors.join(' ')}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full">
          {t('otp.continue')}
        </Button>
      </form>

      <div className="flex w-full flex-col">
        <p className="text-center text-sm font-normal text-primary/60">
          {t('otp.noCode')}
        </p>
        <Button
          onClick={() => signIn('EmailProvider', { email })}
          variant="ghost"
          className="w-full hover:bg-transparent"
        >
          {t('otp.requestNewCode')}
        </Button>
      </div>
    </div>
  )
}
