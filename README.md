# Content
1. [Introduction](#introduction)
2. [useActionState Hook](#useactionstate-hook)

# Introduction
ChatGPT said:
Next.js is a React-based web development framework used to build fast and user-friendly websites and web apps. It simplifies and adds extra power to React by providing features like:

### Key Features of Next.js:
| Feature                               | What It Means                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| **File-based routing**                | Create pages just by adding files to the `pages/` folder.                                 |
| **SSR & SSG**                         | Supports Server-Side Rendering and Static Site Generation for better SEO and performance. |
| **API Routes**                        | Create backend API endpoints inside the app itself.                                       |
| **Built-in CSS & Image Optimization** | Helps with faster load times.                                                             |
| **Typescript Support**                | Comes ready to use with TypeScript.                                                       |
| **Fast Refresh**                      | Instant feedback when editing code (like hot reload).                                     |

### How to Create a New Next.js App
```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

### Why Use Next.js over Plain React?
| React (alone)                    | Next.js                   |
| -------------------------------- | ------------------------- |
| Needs manual routing             | Auto-routing via `pages/` |
| Only CSR (Client-Side Rendering) | SSR, SSG, CSR options     |
| Needs config for SEO             | SEO-friendly by default   |
| No backend support               | Built-in API routes       |

[Go To Top](#content)

---
# useActionState Hook

**useActionState is a React hook used in Next.js to handle form submissions**

### Syntax:
```jsx
const [state, formAction, isPending] = useActionState(handleSubmit, initialState)
```

Here:
- **`handleSubmit`**: action to be form after from submission or in simple terms you can say that function to be executed after from submit

- **`initialState`**: it store the initial state of result of the `handleSubmit` function

- **`formAction`**: use to connect the form with `handleSubmit` function
- **`state`**: the result return from the handleSubmit

- **`isPending`**: boolean flag which is true while the form is submitting

### Example
**NOTE: the code snippet provided below is an incorrect(incomplete) way to use the useActionHook and will through an error. We are using this snippet only to understand the syntax of declaring useActionState hook**
```jsx
"use client"
import React,{useActionState} from 'react'

export default function Homepage() {

    const [data, formAction, isPending] = useActionState(saveUser,{message:''});

    return (
      <form action={formAction}>   
        <input 
        type="text" 
        name='name' />
        <button disabled={isPending}>submit</button>
      </form>
    )
}

async function saveUser() {  
    // code to save the user
    return{
      message: "user saved successfully",
    }
}
```
**in above code we can see that:**
```jsx
const [data, formAction, isPending] = useActionState(saveUser,{message:''});
```
Here:
- **`saveUser`**:  action that to be perform on form submission, from the code snippet we can see that its a function that save the user info and after successful completion of this code it will send a result object
```js
async function saveUser() {  
    // code to save the user
    return{
      message: "user saved successfully",
    }
}
```
- **`{message:''}`**: its a initial state of the result of the `saveUser` function\
from above code snippet we can see that `saveUser` is returning a object as follow
```js
{
  message: "user saved successfully",
}
```
**Note: in almost every cases we don't use this initial state value so keep this value as undefined(we can't skip this felid)** 

- **`formAction`**: it is use to connect the from with `saveUser` function
```jsx
return (
  <form action={formAction}>    {/*use formAction in this way, with action property*/}
    <input 
    type="text" 
    name='name' />
    <button disabled={isPending}>submit</button>
  </form>
)
```

- **`isPending`**: boolean flag which is set to true while the form is submitting i.e `saveUser` function is running
```jsx
return (
  <form action={formAction}>    
    <input 
    type="text" 
    name='name' />
    <button disabled={isPending}>submit</button>    {/*disabling the submit button while the form is submitting to avoid multiple clicking on submit button  */}
  </form>
)
```
- **`data`**: output of `saveUser` function, if is print the data you'll get output as
```
{
  message: "user saved successfully",
}
```
**Note: before submitting the from the data is set to undefined**

## how to cerate the submit action
**Submit Action**: action that to be perform after the form is submitted

#### Syntax
```jsx
async function handleSubmit(prevState: any, fromData: FormData) {
    // function code
}
```
Here:
- **`prevState`**: when you submit the form multiple time the output of last sublimation will be sorted in `prevState`

- **`fromData`**: its the data present in a form 

#### Example:
**Note: this is the complete version of the code presented in previous example of declaring the useActionState hook**

```jsx
"use client"
import React,{useActionState} from 'react'

export default function Homepage() {
    const [data, action, isPending] = useActionState(saveUser,{message:'', data:{name:""}});

    return (
      <form action={action}>
        <input 
        type="text" 
        name='name' />
        <button disabled={isPending}>submit</button>
      </form>
    )
}

async function saveUser(prevState: any, fromData: FormData) {
    const name = fromData.get('name') as string
    // code to save the user
    return{
      message: "success",
      data:{
        name
      }
    }
}
```
- **`prevState`**: when you submit form multiple time then `saveUser` get called multiple time therefor `prevState` holds the last output of this function\
**Note: in almost very cases we can't use prevState therefor we keep prevState as unknown**

-  **`fromData`**: its the data present in a form\
use `.get()` method to get the data with respective `name` of the that field

### How to avoid form refresh

- every time we submit the form using useActionState hook it refresh the from by removing all in filled values from the form
- to avoid the loss of data we use default value property of the input tag
- to do that we just have to make sure that we return the submitted data from fromAction
- once you return the original value back you can set that value back into its respective field using `data` variable of the useActionState hook

**Note: we cannot use `e.preventDefault()` in useActionState hook**

#### Example:
```jsx
"use client"
import React,{useActionState} from 'react'

export default function Homepage() {
    const [data, action, isPending] = useActionState(saveUser,undefined);
    
    return (
      <form action={action}>
        <input 
        defaultValue={data?.data?.name}     {/*this will set the original value back into this field*/}
        type="text" 
        name='name' />
        <button disabled={isPending}>submit</button>
      </form>
    )
}

async function saveUser(prevState: unknown, fromData: FormData) {
    const name = fromData.get('name') as string
    // code to submit the form
    return{
      message: "success",
      data:{
        name
      }
    }
}
```


[Go To Top](#content)

---