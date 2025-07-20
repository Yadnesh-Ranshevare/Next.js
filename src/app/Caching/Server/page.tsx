import React from 'react'
type dataType = {
  id: number,
  name: string
}
export default async function page() {
  const data = await getData()
    console.log(data)
  return (
    <div>
      {
        data.map((user:dataType) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))
      }
    </div>
  )
}
       
async function getData() {
    const res = await fetch('http://localhost:4000/api/getdata',{
        // Enable ISR: revalidate every 60 seconds
        cache: 'no-store' 
    })
    // const res = await fetch('https://jsonplaceholder.typicode.com/users',{
    //     // Enable ISR: revalidate every 60 seconds
    //     cache: 'no-store' 
    // })
    const data = await res.json()
  return data
}