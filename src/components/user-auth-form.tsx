'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// import { Icons } from '@/components/icons'
// import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
// import { toast } from '@/ui/toast'

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: true,
      callbackUrl: '/test',
      //   redirect: false,
      //   callbackUrl: searchParams.get('from') || '/dashboard',
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      //   return toast({
      //     title: 'Something went wrong.',
      //     message: 'Your sign in request failed. Please try again.',
      //     type: 'error',
      //   })
      alert('error')
      return
    }

    alert('success')

    // return toast({
    //   title: 'Check your email',
    //   message: 'We sent you a login link. Be sure to check your spam too.',
    //   type: 'success',
    // })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <label className='sr-only' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              placeholder='name@example.com'
              className='block w-full px-3 py-2 my-0 mb-2 text-sm border rounded-md h-9 border-slate-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              //   name='email'
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='grid gap-1'>
            <label className='sr-only' htmlFor='email'>
              Email
            </label>
            <input
              id='password'
              placeholder='input your password'
              className='block w-full px-3 py-2 my-0 mb-2 text-sm border rounded-md h-9 border-slate-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1'
              type='password'
              //   autoCapitalize='none'
              //   autoComplete='password'
              //   autoCorrect='off'
              //   name='email'
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
          </div>
          <button
            className='inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500'
            disabled={isLoading}
          >
            {/* {isLoading && <Icons.spinner className='w-4 h-4 mr-2 animate-spin' />} */}
            Sign In with Email
          </button>
        </div>
      </form>
    </div>
  )
}
