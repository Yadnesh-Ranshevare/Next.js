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
       
export async function getData() {
    const res = await fetch('http://localhost:3000/api/getdata')
    // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
  return data
}