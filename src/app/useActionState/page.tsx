"use client"
import React,{useActionState} from 'react'

export default function Homepage() {
    const [data, action, isPending] = useActionState(saveUser,undefined);
    
    return (
      <form action={action}>
        <input 
        defaultValue={data?.data?.name}
        type="text" 
        name='name' />
        <button disabled={isPending}>submit</button>
      </form>
    )
}

async function saveUser(prevState: unknown, fromData: FormData) {
    const name = fromData.get('name') as string
    await wait(1000)

    return{
      message: "success",
      data:{
        name
      }
    }
}

// function to replicate the db call
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

