# Content
1. [Introduction](#introduction)
2. Rendering in Next js
    - [Basics of Rendering in Next js](#basics-of-rendering-in-next-js)
    - [SSG, SSR & CSR](#ssg-ssr--csr)
    - [What do you mean by rendering?](#what-do-you-mean-by-rendering)
    - [Hydration](#hydration)
4. [Server Action](#server-action)
5. Caching in next js
    - [Basic of Caching in next js](#basic-of-caching-in-next-js)
    - [unstable_cache](#unstable-cache)
    - [use cache](#use-cache)
    - [revalidateTag](#revalidatetag)
6. [useActionState Hook](#useactionstate-hook)

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
# Basics of Rendering in Next js

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
# What do you mean by rendering?
- Whenever you deploy your Next.js project it first create its build version
- in next js during building our application convert into two type of files a static files (html, css, etc) and js bundles (hold javascript code to render the component)
1. **Static files:**
    - These include things like HTML, CSS, images, fonts, and pre-rendered pages.
    - These files are mostly served directly by the server or CDN without extra computation.
    - For example, if you have a page that uses Static Site Generation (SSG) or getStaticProps, Next.js generates an HTML file for that page at build time.
2. **JavaScript bundles:**
    - These are the JS files that contain the React/Next.js code for your components.
    - This JS bundles get execute at server to generate the HTML, css files 
    - They are responsible for making the page interactive on the client-side (hydration).
    - For example, when the HTML loads in the browser, the JS bundle “hydrates” it, attaching event listeners and enabling dynamic behavior.
    - Next.js splits JS into chunks (per page, per shared library) to optimize loading.

- **Note:**
    - There is empty `.html` file assign with js bundles (if hold the code for rendering the component)
    - This `.html` file is send to client browser on clients request
    - Once the user open this `.html` file the js bundle associate with the `.html` file is then get downloaded to make this `.html` file interactive

### Static Site Generation(SSG)
**In Static SIte Generation rendering occur at the build time**
- when we say rendering at build time, it means our jsx/tsx covert into the static file (HTML, css, js) at the time of build
- This static file then served directly by the server or CDN
- Therefor when user made request for any page, server just send the ready made HTML 
- Since browser get already rendered html file its SEO it high 

### Server Side Rendering(SSR)
**In Server Side Rendering rendering occur on the server at each request**
- In SSR at build time our jsx/tsx convert into into js bundles and stored at server
- Whenever a user make a request for any page this **js bundles execute at server**, creating the HTML page rendered at server
- This server rendered HTML page then send to the client browser 
- Since browser get already rendered html file its SEO it high 

### Client Side Rendering(CSR)
**In Client Side Rendering rendering occur at client side**
- Similar to SSR, in CSR at build time our jsx/tsx convert into into js bundles and stored at server
- whenever user make a request for any page this **js bundles send to client browser**, that is empty `.html` file which is assign to this js bundle is sent at users browser
- Since browser get the empty html file its SEO is low
- Once the user open this `.html` file js bundle get executed rendering the page at client side






[Go To Top](#content)

---

# Hydration
**Linking the downloaded JS bundles to the pre-rendered HTML so the page becomes interactive.**

Note:
hydration does not happen in pure CSR (Client-Side Rendering). Here’s why, simply:
- The server sends almost no HTML—usually just a blank `<div id="root"></div>`.
- The browser downloads the JS bundle, which then renders the entire page on the client.
- Since there is no pre-rendered HTML, there’s nothing to “hydrate.”

**Hydration in Next.js means:**
1. When a Next.js page loads, the server sends pre-rendered HTML.
2. The page is visible immediately, but buttons and interactive elements don’t work yet.
3. Browser downloads the JS bundles for the page.
4. React attaches those JS bundles to the already loaded HTML.
5. After this, the page becomes interactive (buttons work, state updates, etc.).

**Note:**
- The HTML is already visible before hydration.
- Without hydration, the page looks fine but cannot respond to user actions.
- During hydration react constructs the virtual DOM in the browser and compares it with the existing HTML to attach interactivity.


### Hydration error
**It occur when page rendered at server doesn't match with that of page rendered at client**

Example:
```jsx
// pages/index.js
import { useState } from "react";

export default function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());  // date will also hold the time

  return <h1>{time}</h1>;
}
```
- let say this component render on server at 11:02:34:08 
- At client when react hydrate it will show 11:02:34:09
- this 0.01 second delay is because of the server and client generated different values as the server and client run the code at different times and environments
- Therefor the component rendered on server and on client(after hydration) renders the different time 
- The HTML generated on the server differs from the HTML React would generate on the client, causing a hydration mismatch.
- This will cause the hydration error 

**What happen here**

- During hydration, React constructs the virtual DOM in the browser for the existing server-rendered HTML.
- It then compares this virtual DOM with the HTML and updates only what’s different to make the page interactive without re-rendering the whole page.
- Server render:
    - The server builds HTML and sends it to the browser.
    - This is visible immediately to the user.
- Client render during hydration:
    - React downloads the JS bundle and checks the HTML against its virtual DOM.
    - If everything matches, React just attaches interactivity (buttons, state, etc.) without changing the page visually.
    - If there’s a mismatch (dynamic content, random values), React updates the HTML
    - Id does not re-render that page it's only update the page

**Why Hydration error exist**
- Hydration error does not cause the application to crash, its more like a warning.
- but in some cases hydration error may cause the flickering of the data on client side, especially if user have poor internet connection
- let say in our previous example After 1 second, the time displayed may update from 11:02:34 (server-rendered) to 11:02:35 (client-rendered).
- This mismatch is caused by React generating a new value on the client and on the server
- A slow network delays the changes becoming visible to the user, which can make the flicker more noticeable.
- this badly affect the user experience
- in most of the cases this time is usually about 0.01 second which is not visible 




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





# Basic of Caching in next js

> visit the **.next** folder to explore the cached data in Nextjs

### Static site generation
SSG is like pre-generating and caching the full page during build.

| What is Cached?                       | When is it Cached? | How Long Does It Stay Cached? |
| ------------------------------------- | ------------------ | ----------------------------- |
| The **HTML of the page**           | At **build time**  | Until you rebuild the app     |
|  The **data fetched** (via `fetch`) | Also at build time |Until you rebuild the app    |

**Example:**

```tsx
import React from 'react'

export default async function page() {
  const data = await getData()
    console.log(data)
  return (
    <div>
      {
        data.map((user:any) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))
      }
    </div>
  )
}
       
async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    return data
}
```
- here the data of user if fetch at the build time
- once it fetch it cache that data permanently until the next build
- whenever a user visit a page it get cache data which is fetch and cache at build time
- as there is no fetch request on every visit it has high performance
- as data is set permanently during build time visited page may lack a availability of updated data

**Note:**
> for default fetch request Next.js by default set cache to force-cache 

###  Incremental Static Regeneration (ISR)
Instead of regenerating the whole site during build (like SSG), ISR lets you update individual static pages in the background after deployment.

Here we use revalidate time that tells Next.js how often to regenerate a static page in the background.

**How ISR works**
1. At build time, the pag e is statically generated (like SSG).
2. When a user visits the page, if it's older than revalidate time, Next.js regenerates it in the background.
3. The new version replaces the old one, and is used for future users.

**Example:**
```js
import React from 'react'

export default async function page() {
  const data = await getData()
    console.log(data)
  return (
    <div>
      {
        data.map((user:any) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))
      }
    </div>
  )
}
       
async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users',{
        // Enable ISR: revalidate every 60 seconds
        next: { revalidate: 60 }
    })
    const data = await res.json()
    return data
} 
```
This means:\
Regenerate this page in the background at most once every 60 seconds.

**How It Works (Step-by-Step)**
1. Page is built statically and cached.

2. A user visits the page:
    - If it’s less than 60 seconds old, serve the cached page.
    - If it’s older than 60 seconds, serve the cached page and regenerate the page in the background.
3. The new version replaces the old one for the next user.

**Notes**
> This only works in Server Components. (app/ directory components are Server by default)

> ISR does not work with client-side fetch() or useEffect — that’s just client-side fetching, not static generation.

###   Server-Side Rendering (SSR)
To perform Server-Side Rendering (SSR) in the app/ directory (App Router) in Next.js, you need to:

Use fetch() with { cache: 'no-store' }
This tells Next.js: "Do not cache — re-fetch data on every request."

```tsx
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store'  // ← This enables SSR
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Server-Side Rendered Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```
 **What's Happening Here?**

- `cache: 'no-store'` tells Next.js to:

  - It disables Next.js’s default caching (`force-cache`)
  - Skip static generation
  - Re-fetch the data on every request
  - Render the HTML on the server at request time (SSR)

### Summary
| Behavior | Fetch Option                     | When is Data Fetched?      |
| -------- | -------------------------------- | -------------------------- |
| **SSG**  | Default (`cache: 'force-cache'`) | At build time              |
| **ISR**  | `next: { revalidate: N }`        | At build + every N seconds |
| **SSR**  | `cache: 'no-store'`              | On every request           |

### Note about SSG and SSR
- in case of dynamic API call if next js know about all possible API's it will cache them all

**Example:**
```js
async function getUsers({gender}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${gender}`);
  return res.json();
}
```
- let say some how next js know gender can either be a `Male` or `Female`
- Therefor all possible API's
```
"https://jsonplaceholder.typicode.com/users/Male"
```
```
"https://jsonplaceholder.typicode.com/users/Female"
```
- now next js will cache both of their response at build time and serve according to request from cache
- in simple words in dynamic API call if next js knows about the all API's it will cache them all and act as a SSG
- But if next js doesn't know about the API combinations then it will automatically shift itself into SSR

### Using Axios
for SSG and SSR we use `dynamic` directive in Nextjs app directory

it tells Nextjs hoe to render a route: whether it should be a static, dynamic or use cache

| value | MEaning|
| ---| ---|
| 'auto'(default) | Nextjs auto detect based on usage|
| 'force-static' | force static generation |
| 'force-dynamic' | force dynamic rendering (SSR - render on every request)

### 1. SSG
```tsx
import axios from "axios"

export const dynamic = "force-static"   // or just omit this line (default)


async function getUsers() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Server-Side Rendered Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```
```ts
export const dynamic = "force-static"
```
- this line will force page to be static therefor whatever response the API give will cache at build time
### 2. SSR
```tsx
import axios from "axios"

export const dynamic = "force-dynamic"   // same as no-store


async function getUsers() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Server-Side Rendered Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```
```ts
export const dynamic = "force-dynamic"
```
- this line will force page to be render on server therefor response will not be cache at build time


### ISR
for ISR we use revalidate a spacial Next.js export which tells Next.js to cache the result of the current page and regenerate it in the background after particular time has passed
```tsx
import axios from "axios"

export const revalidate = 60   // revalidate after 60 seconds


async function getUsers() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Server-Side Rendered Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

[Go To Top](#content)

---

# Unstable Cache
unstable_cache allows you to cache the result of database queries and other async functions. To use it, wrap unstable_cache around the function. For example:
```tsx
import { unstable_cache } from 'next/cache'
import React from 'react'

type dataType = {
  id: number,
  name: string
}

export default async function page() {
  const data = await getData()
    
  return (
    <form >
      {
        data.map((user:dataType) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))
      }
      
    </form>
  )
}

const getData = unstable_cache(async()=>{
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
})
```
- in above code snippet the response of getData function will get cached 

- this `unstable_cache` function accept second parameter which defines a **unique cache key**. This is use to add custom id's to cache key

```ts
const getData = unstable_cache(async(id:number)=>{
    const res = await fetch(`http://localhost:4000/api/getdata/${id}`)
    const data = await res.json()
    return data
},[id])
```

### For dynamic 
```js
const getData = unstable_cache(async(id:number)=>{
    const res = await fetch(`http://localhost:4000/api/getuser/${id}`)
    const data = await res.json()
    return data
})
```
for every value of `id` it will create the new cache entry


### The function accepts a third optional object to define how the cache should be revalidated. It accepts:
- `tags:` an array of tags used by Next.js to revalidate the cache.
- `revalidate:` the number of seconds after cache should be revalidated.
```tsx
const getData = unstable_cache(async()=>{
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
},[],{
    tags: ['users'],
    revalidate: 60  // revalidate after 60 second
})
```

### Another syntax
```tsx
async function getUser(userId: string) {
  const res = await fetch(`http://localhost:4000/api/user/${userId}`)
  return await res.json()
}


const cachedGetUser = unstable_cache(
  getUser,               // your fetch function
  [userId],              // ← unique cache key based on userId
  { tags: ['user'] }
)
```

### Example
```tsx
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import React from 'react'

type dataType = {
  id: number,
  name: string
}

async function getData(id:number){
    const fun = unstable_cache(async()=>{
        const res = await fetch(`http://localhost:4000/api/getuser/${id}`)
        const data = await res.json()
        return data
    },[`${id}`])  // it always accept string
    return await fun()
}

export default async function page({params}:{params:Promise<{id:number}>}) {
    const id = (await params).id
    const data = await getData(id)
    console.log(data)
  
    async function refresh(){
        "use server"
        revalidateTag('users')
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
```


[Go To Top](#content)

---
# use cache
> it is a experimental feature for Next.js v15

The `use cache` directive allows you to mark the route, React component, or a function as a cacheable. it can be used at the top of s file ot indicate that all exports in the file should be cached, or inline at the top of the function or component to cache the return value 

when you use `use cache` at top of layout or page, the route segment will be pre-rendered, allowing it to later be revalidate


`use cache` is currently an experimental feature. To enable it, add the `useCache` option to your `next.config.ts` file:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    useCache:true,
  }
};

export default nextConfig;
```
Then, add the `use cache` at top of the file, component or function level
### 1. file level
```tsx
"use cache"
export async function page(){
  return(
    <div>
      {/*  ...  */}
    <div/>
  )
}
```
### 2. component level
```tsx
"use cache"
export async function myComponent(){
  return(
    <div>
      {/*  ...  */}
    <div/>
  )
}
```
### 3. Function level
```tsx
"use cache"
export async function getData(){
  const res = await fetch('http://localhost:4000/api/getdata')
  const data = await res.json()
  return data
}
```

### use cacheTag to declare the tag for revalidate your data
```tsx
import { unstable_cacheTag as cacheTag } from 'next/cache'

const getData = async()=>{
    "use cache"
    cacheTag("users")   // declaring the tag
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
}
```


[Go To Top](#content)

---
# revalidateTag
revalidateTag is used to revalidate cache entries based on a tag and following an event. To use it with fetch, start by tagging the function with the next.tags option:

### 1. using basic fetch call
```tsx
export async function getUserById(id: string) {
  const data = await fetch('http://localhost:4000/api/getdata', {
    next: {
      tags: ['user'],
    },
  })
}
```
### 2. using unstable_cache
```tsx
const getData = unstable_cache(async()=>{
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
},[],{
    tags: ['users']
})
```
### 3. using use cache
```tsx
import {unstable_cacheTag as cacheTag} from 'next/cache'  // import cacheTag like time

export async function getData(){
  "use cache"
  cacheTag("user")  // declare the tag using like this
  const res = await fetch('http://localhost:4000/api/getdata')
  const data = await res.json()
  return data
}
```
Now whenever you call `revalidateTag('user)` it will revalidate the cache data
> you can call `revalidateTag()` only from server component or server action i.e, you cannot call revalidateTag from client side

```tsx
import { revalidateTag, unstable_cache } from 'next/cache'
import React from 'react'

type dataType = {
  id: number,
  name: string
}

export default async function page() {
  const data = await getData()

  async function refresh(){   // will be treated as server action
    "use server"
    revalidateTag('users')
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
      <button>refresh</button>
    </form>
  )
}
      
// you can use any type of caching mechanism you want it will not affect the above code 
const getData = unstable_cache(async()=>{
    const res = await fetch('http://localhost:4000/api/getdata')
    const data = await res.json()
    return data
},[],{
    tags: ['users'],
    revalidate: 60
})
```
Here:
- once you click the button it will trigger the refresh function which will in turns trigger the `revalidate('user')`
- once the `revalidate('user')` gets trigger, it will revalidate the cached data





[Go To Top](#content)

---

# Problem With too Much Caching
| Problem                     | Description                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 🧠 **Memory Overload**      | Caching too many dynamic variations (like different user IDs) can overload server memory (RAM).                                |
| 🐢 **Slower Performance**   | Regenerating or revalidating large numbers of cache entries can slow down server responses.                                    |
| ⚠️ **Complex Invalidation** | When everything is cached, keeping it fresh becomes hard. `revalidateTag()` or `on-demand revalidation` may become unreliable. |
| 💽 **Disk/Storage Limits**  | Hosting platforms like Vercel have limits. Caching large responses may exceed storage quotas.                                  |
| 🔁 **Stale or Wrong Data**  | Old cached data might show up instead of new/updated info if cache isn’t properly refreshed.                                   |



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