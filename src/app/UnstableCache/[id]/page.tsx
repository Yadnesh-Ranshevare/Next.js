import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import React from 'react'
type dataType = {
  id: number,
  name: string
}
async function cachedata(id:number){
    const fun = unstable_cache(async()=>{
        const res = await fetch(`http://localhost:4000/api/getuser/${id}`)
        const data = await res.json()
        return data
    },[`${id}`])
    return await fun()
}
export default async function page({params}:{params:Promise<{id:number}>}) {
    const id = (await params).id
  const data = await getData(id)
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

const getData = unstable_cache(async(id:number)=>{
    const res = await fetch(`http://localhost:4000/api/getuser/${id}`)
    const data = await res.json()
    return data
})


