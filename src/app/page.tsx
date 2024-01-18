import * as actions from '@/actions'
import {Button} from '@nextui-org/react'

export default function Home() {
  return (
    <main className='flex justify-center items-center'>
      <form action={actions.signIn}>
        <Button type='submit' color='primary' variant='bordered'>Sign In</Button>
      </form>
    </main>
  )
}
