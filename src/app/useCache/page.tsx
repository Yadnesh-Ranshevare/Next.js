import { revalidateTag } from 'next/cache'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import React from 'react'
type dataType = {
  id: number,
  name: string
}
export default async function page() {
  const data = await getData()
    console.log(data)

    async function refresh(){
        "use server"
        revalidateTag('users')
        // revalidatePath('/')
    }
    
  return (
    <form onSubmit={refresh}>
      {
        data.map((user:dataType) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))
      }
      <button>ref</button>
      
    </form>
  )
}
      

const getData = async()=>{
    "use cache"
    cacheTag("users")
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
}



