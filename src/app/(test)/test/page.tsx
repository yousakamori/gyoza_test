import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function TestPage() {
  const session = await getServerSession(authOptions)
  //   return <pre>{JSON.stringify(session, null, 2)}</pre>
  if (!session) {
    return <p>not logged in</p>
  }

  return <h1>{session?.user?.name}</h1>
}
