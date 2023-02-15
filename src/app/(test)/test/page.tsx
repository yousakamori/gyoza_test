import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function TestPage() {
  const session = await getServerSession(authOptions)
  //   return <pre>{JSON.stringify(session, null, 2)}</pre>
  if (!session) {
    return <p>not logged in</p>
  }

  return (
    <div>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </div>
  )
}
