import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

import { useConvexAuth } from 'convex/react'
import { Logo } from '@repo/ui/components/logo'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { LanguageSwitcher } from './language-switcher'

const HOME_PATH = '/'

const QUOTES = [
  {
    quote: 'There is nothing impossible to they who will try.',
    author: 'Alexander the Great',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    quote:
      'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
  },
  {
    quote: 'The only thing we have to fear is fear itself.',
    author: 'Franklin D. Roosevelt',
  },
]

const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  if (isLoading && !isAuthenticated) {
    return null
  }
  return (
    <div className="flex h-screen w-full">
      <div className="absolute left-1/2 top-10 mx-auto flex -translate-x-1/2 transform lg:hidden">
        <Link
          to={HOME_PATH}
          className="z-10 flex h-10 flex-col items-center justify-center gap-2"
        >
          <Logo />
        </Link>
      </div>

      <div className="relative hidden h-full w-[50%] flex-col justify-between overflow-hidden bg-card p-10 lg:flex">
        <Link to={HOME_PATH} className="z-10 flex h-10 w-10 items-center gap-1">
          <Logo />
        </Link>

        <div className="z-10 flex flex-col items-start gap-2">
          <p className="text-base font-normal text-primary">
            {randomQuote.quote}
          </p>
          <p className="text-base font-normal text-primary/60">
            -{randomQuote.author}
          </p>
          <div>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="absolute inset-0 z-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50"></div>
      </div>

      <div className="flex h-full w-full flex-col border-l border-primary/5 bg-card lg:w-[50%]">
        <div className="relative hidden  flex-col justify-between items-end overflow-hidden bg-card p-10 lg:flex">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </div>
  )
}
