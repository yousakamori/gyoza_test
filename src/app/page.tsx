'use client'

// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from './page.module.css'
// const inter = Inter({ subsets: ['latin'] })

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  return (
    <main>
      <h1>hello</h1>
      <div className='flex items-center justify-between'>
        <button
          className='px-4 py-2 rounded-lg animate-in fade-in zoom-in bg-lime-400'
          onClick={() => signIn()}
        >
          sign in hoge fuga baz
        </button>
        <button className='px-4 py-2 rounded-lg bg-lime-400' onClick={() => signOut()}>
          sign out
        </button>
      </div>
    </main>
  )
}
