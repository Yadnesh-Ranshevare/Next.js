import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    
    const user = [
        {
          "id": 1,
          "first_name": "Bone",
          "email": "bjosey0@oakley.com"
        }, 
        {
          "id": 2,
          "first_name": "Zak",
          "email": "zveldstra1@over-blog.com"
        }, 
        {
          "id": 3,
          "first_name": "Percival",
          "email": "pjovis2@purevolume.com"
        }, 
        {
          "id": 4,
          "first_name": "Christine",
          "email": "cbenck3@shutterfly.com"
        }, 
        {
          "id": 5,
          "first_name": "Blondy",
          "email": "bcallander4@scientificamerican.com"
        }
    ]

    const animal = [
        {
          "id": 1,
          "name": "Boubou, southern"
        }, 
        {
          "id": 2,
          "name": "Otter, north american river"
        }, 
        {
          "id": 3,
          "name": "Screamer, crested"
        }, 
        {
          "id": 4,
          "name": "White-cheeked pintail"
        }, 
        {
          "id": 5,
          "name": "Kangaroo, eastern grey"
        }
    ]

    return NextResponse.json(animal)
    // return NextResponse.json(user)

}