# Content
1. [Introduction](#introduction)
2. [SSG, SSR & CSR](#ssg-ssr--csr)
3. [Server Action](#server-action)
4. [useActionState Hook](#useactionstate-hook)

# Introduction
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
# Rendering in Next js

### Pre-rendering
Next.js generates the HTML for each page before sending it to the browser, instead of building the page entirely with JavaScript on the client.

### Static Site Generation
Generate all pages as static HTML during the build step (before the site is deployed)

### Partial Pre-rendering
Next.js pre-renders the static parts of a page and lets the dynamic parts load later on the client side using JavaScript.

its like combining Pre-rendering or Static Site Generation with  Client Side Rendering

### Client Side Rendering
Generate all HTML pages at clients browser

**Note: you'll learn more about this in [SSG, SSR & CSR](#ssg-ssr--csr) topic** 


[Go To Top](#content)

---
# SSG, SSR & CSR
- When a user visits your website, they need HTML. 
- In Next.js, there are three main ways you can give the user this HTML:
  1. Generate it before the user visits →  SSG
  2. Generate it when the user visits →  SSR
  3. Load a blank page and fetch data in the browser →  CSR

###   1.  SSG – Static Site Generation
- Next.js builds your page into static HTML files at build time (during deployment). That HTML is saved and served to users when they visit the site.

- **Think of it like:**\
You're printing a page from a document and keeping it ready to hand out. When someone asks for it, you just give them the printed copy.

- **Advantages**

| Advantage                 | Explanation                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| ⚡ **Very Fast Loading**   | Since pages are pre-rendered at build time, they load almost instantly. |
| 🌐 **SEO Friendly**       | HTML is ready at page load, so search engines can easily index it.      |
| 📦 **Low Server Load**    | No server computation is needed per request, so it's scalable.          |
| 🧪 **Better Performance** | Users get a fast and responsive experience.                             |

- **Disadvantages**

| Disadvantage                      | Explanation                                                              |
| --------------------------------- | ------------------------------------------------------------------------ |
| ❌ **Data is not always fresh**    | If the content changes, you need to rebuild the site to update the page. |
| ❌ **Long build time**             | If your site has 1000s of pages, building them all can take a while.     |
| ❌ **No personalization per user** | Static pages can't show user-specific data like "Hello John".            |



### 2. SSR – Server-Side Rendering
- Next.js builds the page on the server for every user request. That means it’s always fresh, using the latest data.

- **Think of it like:**\
A restaurant chef cooking the dish after you order it, so it’s always fresh and hot.

- **Advantages**

| Advantage                      | Explanation                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------- |
| 🔄 **Fresh Data Every Time**   | Page is generated at request time, so users always get the latest info.      |
| 🌐 **SEO Friendly**            | HTML is fully generated on the server and sent to browser (good for Google). |
| 🎯 **Can use request context** | You can show data based on user location, session, etc.                      |

- **Disadvantages**

| Disadvantage                   | Explanation                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| 🐢 **Slower load times**       | Page must be generated on every request, which takes time.  |
| 💰 **Higher server cost**      | Every page visit needs server work, which can be expensive. |
| ⚠️ **Risk of server overload** | Too many requests can slow down or crash your server.       |



### 3.  CSR – Client-Side Rendering
- The page is loaded first (usually blank or with a loader), and then JavaScript fetches the data on the client/browser.

- **Think of it like:**\
You open an empty box and wait for the contents to be delivered later.

- **Advantages**

| Advantage                      | Explanation                                                |
| ------------------------------ | ---------------------------------------------------------- |
| 🧠 **Great for dynamic apps**  | Good for dashboards, where data is fetched after login.    |
| 🧩 **Less server processing**  | Only minimal HTML is sent; browser does the heavy lifting. |
| 🕹️ **Smooth user experience** | Once loaded, the app feels fast and interactive.           |


- **Disadvantages** 

| Disadvantage             | Explanation                                                  |
| ------------------------ | ------------------------------------------------------------ |
| 🐌 **Slow initial load** | User sees a blank page or loader before data appears.        |
| ❌ **Bad for SEO**        | Search engines can’t index JavaScript-loaded content well.   |
| 📱 **Needs JavaScript**  | Won’t work properly on very old devices or with JS disabled. |



### Final summary
| Feature            | SSG                   | SSR             | CSR                         |
| ------------------ | --------------------- | --------------- | --------------------------- |
| Render Time        | During build time     | On each request | In the browser              |
| Speed (first load) | ⚡ Very fast           | 🐢 Slower       | 🐌 Slowest (initially)      |
| SEO Friendly       | ✅ Yes                 | ✅ Yes           | ❌ No                        |
| Fresh Data         | ❌ No (unless rebuilt) | ✅ Always        | ✅ Always                    |
| Use Cases          | Blogs, docs           | News, profiles  | Dashboards, logged-in pages |


### Which one should you use?
| If your page...                     | Use   |
| ----------------------------------- | ----- |
| Doesn’t change often                | ✅ SSG |
| Needs fresh data on every visit     | ✅ SSR |
| Is behind login or doesn't need SEO | ✅ CSR |



[Go To Top](#content)

---
# Server Action
- In Next.js, a Server Action is a way to write functions that run only on the server, even though they're called from the client-side (like from a form or button click). This makes it easy to securely update databases, handle form submissions, or do backend logic without creating separate API routes.

- **Simple Definition:**\
Server Actions are server-side functions that can be triggered from the client, directly inside your components — without needing a separate API route.

In traditional web apps, you often:
1. Submit a form →
2. Send a request to an API route (like `/api/contact`) →
3. The API does backend stuff (e.g., DB insert) →
4. You get a response.

With Server Actions, you skip the API route.\
You write the server-side logic directly inside your component file, and Next.js will run that code on the server only.

### How to do
1. create the Server Component ( Component that runs only on the server) by writing `"use server"` at the top. 
2. inside this component write the code for server action
3. whenever you want to use this server action at client side just import this action into that file and use it however you want 


### Example
**Step 1: Server Action Function**
```js
// app/actions/saveName.js

'use server'; // 👈 Tells Next.js this function runs only on the server

export async function saveName(formData) {
  const name = formData.get('name');

  // Imagine saving to a database here
  console.log('Saving name on the server:', name);

  // You could also return a result if needed
  return { message: `Saved ${name}` };
}
```
**Step 2: Create a Form That Uses This Action**
```jsx
// app/page.jsx or app/page.tsx

import { saveName } from './actions/saveName';

export default function Page() {
  return (
    <form action={saveName}>
      <input type="text" name="name" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```
**What's Happening?**
- When you submit the form, the `saveName` function is called on the server.

- No API route is used — Next.js automatically serializes the data and handles the call.

**Note: If you want to trigger a Server Action without a form, it's a bit more complex (needs React Server Components and Client Component interaction), but possible.**

### Advantages
| **Advantage**                     | **Explanation**                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------- |
| 🔐 **Secure by default**          | Code runs only on the server and is never exposed to the client/browser.        |
| 🚫 **No API routes needed**       | You don’t need to create separate `/api/` endpoints — logic is embedded nearby. |
| 🧼 **Simplifies form handling**   | Native HTML forms can directly call server actions — no need for `fetch()`.     |
| 🧹 **Cleaner codebase**           | Server-side logic stays close to UI components, reducing file switching.        |
| 🛡️ **Type-safe with TypeScript** | Shared types between frontend and backend become easier to manage.              |
| ⚡ **Optimized by Next.js**        | Server Actions are built-in and optimized by the framework for performance.     |
| ✂️ **No manual fetch/axios**      | You don’t need to manually write fetch calls — the form does it for you.        |
| 📦 **Minimal client JS needed**   | Works even with JavaScript disabled — good for SEO and initial load speed.      |

### Disadvantages
| **Disadvantage**                     | **Explanation**                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| ⚠️ **Still experimental**            | The feature may change or break as it's not fully stable in all versions yet.    |
| 🗂️ **Only in App Router**           | Works only with the `/app` directory; not compatible with the older `/pages`.    |
| 🔁 **Causes full page reload**       | Without JavaScript enhancement, form submissions reload the entire page.         |
| 🧠 **Can be confusing**              | Mixing server and client logic in one file can confuse beginners.                |
| 🔘 **Hard to trigger without forms** | Not simple to call on button clicks or client-side actions without setup.        |
| 🌐 **Limited hosting support**       | Requires modern backend support (e.g., Vercel or Edge-compatible platforms).     |
| 🌍 **Not usable as API**             | Can’t be accessed by external apps like mobile clients — no external API access. |
| 📴 **Limited real-time feedback**    | Without client JS, it's hard to show spinners or success messages dynamically.   |


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
- **`saveUser`**:  action that to be perform on form submission, from the code snippet we can see that its a function that save the user info, and after successful completion of this code it will send a result object that contains the message 
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
- **`data`**: output of `saveUser` function, if we print the data you'll get output as
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
**in above code snippet the submit action is:**
```jsx
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
Here:

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