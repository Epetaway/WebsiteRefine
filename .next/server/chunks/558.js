exports.id=558,exports.ids=[558],exports.modules={5942:(e,t,r)=>{Promise.resolve().then(r.bind(r,8143))},229:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},7933:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(326),i=r(7577);function s({children:e,fallback:t=null}){let[r,s]=(0,i.useState)(!1);return r?n.jsx(n.Fragment,{children:e}):n.jsx(n.Fragment,{children:t})}},8143:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var n=r(326),i=r(2852),s=r(4976),a=r(7577);function o({children:e}){let[t]=(0,a.useState)(()=>new i.S({defaultOptions:{queries:{staleTime:6e4}}}));return n.jsx(s.aH,{client:t,children:e})}},9366:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(326),i=r(7311);function s({post:e,featured:t=!1}){let r={bjj:"text-purple-600 hover:text-purple-700",development:"text-blue-600 hover:text-blue-700",general:"text-gray-600 hover:text-gray-700"};return t&&e.featured?(0,n.jsxs)("article",{className:`${{bjj:"bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200",development:"bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",general:"bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"}[e.category]} rounded-2xl p-6 border`,children:[(0,n.jsxs)("div",{className:"inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4",children:[n.jsx("i",{className:"fas fa-star mr-1"}),"NEW POST"]}),n.jsx("h3",{className:"text-xl font-bold mb-3",children:n.jsx(i.rU,{href:`/articles/${e.slug}`,className:`hover:${r[e.category]} transition-colors`,"data-testid":`link-${e.id}`,children:e.title})}),n.jsx("p",{className:"text-gray-600 mb-4 text-sm","data-testid":`excerpt-${e.id}`,children:e.excerpt}),(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-xs text-gray-500","data-testid":`date-${e.id}`,children:e.publishedAt}),n.jsx(i.rU,{href:`/articles/${e.slug}`,className:`${r[e.category]} font-medium text-sm transition-colors`,"data-testid":`read-more-${e.id}`,children:"Read More →"})]})]}):(0,n.jsxs)("article",{className:"bg-gray-50 rounded-2xl p-6",children:[n.jsx("div",{className:`inline-flex items-center px-2 py-1 rounded-full ${{bjj:"bg-purple-100 text-purple-700",development:"bg-blue-100 text-blue-700",general:"bg-gray-100 text-gray-700"}[e.category]} text-xs font-medium mb-3`,children:e.category.toUpperCase()}),n.jsx("h3",{className:"text-lg font-bold mb-3",children:n.jsx(i.rU,{href:`/articles/${e.slug}`,className:"hover:text-primary-500 transition-colors","data-testid":`link-${e.id}`,children:e.title})}),n.jsx("p",{className:"text-gray-600 mb-4 text-sm","data-testid":`excerpt-${e.id}`,children:e.excerpt}),(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-xs text-gray-500","data-testid":`date-${e.id}`,children:e.publishedAt}),(0,n.jsxs)("div",{className:"flex items-center gap-4",children:[(0,n.jsxs)("span",{className:"text-xs text-gray-500","data-testid":`read-time-${e.id}`,children:[e.readTime," min read"]}),n.jsx(i.rU,{href:`/articles/${e.slug}`,className:"text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors","data-testid":`read-more-${e.id}`,children:"Read More →"})]})]})]})}},2961:(e,t,r)=>{"use strict";r.d(t,{z:()=>d});var n=r(326),i=r(7577),s=r(4214),a=r(9360),o=r(7678);let l=(0,a.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=i.forwardRef(({className:e,variant:t,size:r,asChild:i=!1,...a},d)=>{let c=i?s.g7:"button";return n.jsx(c,{className:(0,o.cn)(l({variant:t,size:r,className:e})),ref:d,...a})});d.displayName="Button"},108:(e,t,r)=>{"use strict";r.d(t,{n:()=>n});let n=[{id:"white-to-black-belt-journey",title:"From White to Black: How Jiu-Jitsu Rewired My Life and Career",slug:"white-to-black-belt-life-career",excerpt:"Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between white, blue, purple, brown, and black—and why these lessons shape how I write code, lead projects, and show up for people.",content:`
# From White to Black: How Jiu-Jitsu Rewired My Life and Career

Earning my black belt is the most meaningful milestone of my life outside becoming a father. Here's what changed between white, blue, purple, brown, and black—and why these lessons shape how I write code, lead projects, and show up for people.

## White → Blue: Self-Discovery

I learned I could do hard things consistently. On the mat that meant showing up; at work it meant taking on unfamiliar stacks and shipping anyway.

The white belt phase taught me that progress isn't always visible. Just like debugging a complex issue, sometimes you're making progress even when it doesn't feel like it. Every tap, every failed technique, every moment of confusion was building something deeper.

## Purple: Boundaries & Control

I stopped muscling through problems. I built systems, respected pace, and focused on position over submission—the engineering version is architecture over hacks.

This is where I learned that technique beats strength, just like clean code beats clever hacks. In both BJJ and development, taking time to build proper foundations saves you from having to force solutions later.

## Brown: Service & Leadership

Teaching others made me sharper. I learned to give clear feedback, protect learning time, and create calm in chaos.

As a brown belt, I started coaching others, which directly translated to mentoring junior engineers. Breaking down complex techniques for beginners taught me how to explain technical concepts clearly and create psychological safety for learning.

## Black: Quiet Confidence

Mastery isn't magic—it's repetition. My job now is to make the hard feel simple: in guard, in code, in teams.

The black belt represents not an end, but a new beginning. It's about making the complex look effortless and helping others find their own path to mastery.

## The Developer Connection

Every principle I learned on the mat has made me a better engineer:

- **Breathing under pressure**: When production is down, staying calm leads to better solutions
- **Systems thinking**: Like guard retention, good architecture is about maintaining advantageous positions
- **Continuous learning**: Every roll teaches something new, just like every code review or project retrospective
- **Ego management**: Being willing to tap out (admit when you're wrong) prevents bigger problems

The journey from white to black belt mirrors the progression from junior to senior engineer. It's not about raw talent—it's about showing up consistently, learning from failures, and developing the judgment to know when to push and when to yield.

---

*Want to start your own BJJ journey? Check out my private lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju).*
    `,publishedAt:"2024-01-15",category:"bjj",featured:!0,tags:["Brazilian Jiu-Jitsu","Career Development","Personal Growth","Leadership"],readTime:6},{id:"bjj-habits-better-engineer",title:"Five BJJ Habits That Make Me a Better Front-End Engineer",slug:"bjj-habits-better-engineer",excerpt:"From breathing under pressure to drilling fundamentals, Brazilian Jiu-Jitsu has taught me invaluable lessons that directly translate to better code, cleaner architecture, and more effective teamwork.",content:`
# Five BJJ Habits That Make Me a Better Front-End Engineer

From breathing under pressure to drilling fundamentals, Brazilian Jiu-Jitsu has taught me invaluable lessons that directly translate to better code, cleaner architecture, and more effective teamwork.

## 1. Breathe First, Then Pass

**On the mat**: When someone has you in a tight position, your first instinct is to panic and muscle out. But experienced grapplers know: breathe first, then find your escape.

**In code**: When faced with a critical bug or tight deadline, I pause and breathe before diving in. This prevents hasty decisions that create technical debt. I write the smallest useful PR instead of trying to fix everything at once.

Instead of rushing into panic-driven solutions that break multiple things, I focus on targeted fixes that solve one problem well.

## 2. Position Before Submission

**On the mat**: In BJJ, you secure a dominant position before attempting a submission. Going for the finish too early often leads to losing everything you've worked for.

**In code**: I prioritize solid architecture before adding features. Building accessible components before visual flourish. Getting the foundation right before optimizing.

## 3. Drill to Kill

**On the mat**: Repetition builds muscle memory. We drill basic movements thousands of times so they become automatic under pressure.

**In code**: I repeat patterns until they become second nature - form validation, API error states, focus management. This consistency reduces bugs and improves team velocity.

## 4. Roll With Everyone

**On the mat**: Training with different body types, skill levels, and styles makes you adaptable. Each partner teaches you something new.

**In code**: I pair with designers, QA, backend engineers. Each perspective improves the final product and diversifies my feedback sources.

## 5. Tap, Reset, Improve

**On the mat**: When caught in a submission, tap early, reset, and try again. No ego, just learning.

**In code**: Post-mortems without blame, iterative improvements, calm problem-solving. Every bug is a learning opportunity, not a failure.

---

*Want to experience these principles firsthand? Check out my private BJJ lesson offerings at [Earl the Kaiju Private Lessons](/earldkaiju) or read more development insights in my blog.*
    `,publishedAt:"2024-02-01",category:"bjj",featured:!0,tags:["Brazilian Jiu-Jitsu","Career Development","Engineering","Best Practices"],readTime:4}]},7678:(e,t,r)=>{"use strict";r.d(t,{cn:()=>s});var n=r(1135),i=r(1009);function s(...e){return(0,i.m6)((0,n.W)(e))}},9856:(e,t,r)=>{"use strict";var n=r(7577),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=n.useState,a=n.useEffect,o=n.useLayoutEffect,l=n.useDebugValue;function d(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var c="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=s({inst:{value:r,getSnapshot:t}}),i=n[0].inst,c=n[1];return o(function(){i.value=r,i.getSnapshot=t,d(i)&&c({inst:i})},[e,r,t]),a(function(){return d(i)&&c({inst:i}),e(function(){d(i)&&c({inst:i})})},[e]),l(r),r};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:c},4095:(e,t,r)=>{"use strict";e.exports=r(9856)},4752:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>o});var n=r(9510),i=r(5384),s=r.n(i);r(9097);let a=(0,r(8570).createProxy)(String.raw`/home/runner/workspace/app/providers.tsx#default`),o={title:"Earl Hickson Jr - Front-End Engineer & BJJ Black Belt",description:"Professional portfolio of Earl Hickson Jr, Senior Front-End Engineer specializing in React, TypeScript, and modern web development. Also offering Brazilian Jiu-Jitsu training in Morris County, NJ.",keywords:"Front-End Engineer, React Developer, TypeScript, JavaScript, Brazilian Jiu-Jitsu, BJJ, Web Development, Morris County NJ",authors:[{name:"Earl Hickson Jr"}],openGraph:{title:"Earl Hickson Jr - Front-End Engineer & BJJ Black Belt",description:"Professional portfolio and BJJ training services",url:"https://ehicksonjr.com",siteName:"Earl Hickson Jr Portfolio",type:"website"}};function l({children:e}){return(0,n.jsxs)("html",{lang:"en",children:[n.jsx("head",{children:n.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"})}),n.jsx("body",{className:s().className,children:n.jsx(a,{children:e})})]})}},9097:()=>{},7311:(e,t,r)=>{"use strict";r.d(t,{rU:()=>N});var n=r(7577),i=r.t(n,2),s=r(4095);let a=i.useInsertionEffect,o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?n.useLayoutEffect:n.useEffect,l=a||o,d=e=>{let t=n.useRef([e,(...e)=>t[0](...e)]).current;return l(()=>{t[0]=e}),t[1]},c="pushState",u="replaceState",h=["popstate",c,u,"hashchange"],m=e=>{for(let t of h)addEventListener(t,e);return()=>{for(let t of h)removeEventListener(t,e)}},p=(e,t)=>(0,s.useSyncExternalStore)(m,e,t),g=()=>location.search,f=()=>location.pathname,b=({ssrPath:e}={})=>p(f,e?()=>e:f),v=(e,{replace:t=!1,state:r=null}={})=>history[t?u:c](r,"",e),y=Symbol.for("wouter_v3");if("undefined"!=typeof history&&void 0===window[y]){for(let e of[c,u]){let t=history[e];history[e]=function(){let r=t.apply(this,arguments),n=new Event(e);return n.arguments=arguments,dispatchEvent(n),r}}Object.defineProperty(window,y,{value:!0})}let x=(e,t)=>t.toLowerCase().indexOf(e.toLowerCase())?"~"+t:t.slice(e.length)||"/",w=(e="")=>"/"===e?"":e,j=(e,t)=>"~"===e[0]?e.slice(1):w(t)+e,k=(e="",t)=>x(E(w(e)),E(t)),E=e=>{try{return decodeURI(e)}catch(t){return e}},J=(0,n.createContext)({hook:(e={})=>[b(e),v],searchHook:({ssrSearch:e=""}={})=>p(g,()=>e),parser:function(e,t){if(e instanceof RegExp)return{keys:!1,pattern:e};var r,n,i,s,a=[],o="",l=e.split("/");for(l[0]||l.shift();i=l.shift();)"*"===(r=i[0])?(a.push(r),o+="?"===i[1]?"(?:/(.*))?":"/(.*)"):":"===r?(n=i.indexOf("?",1),s=i.indexOf(".",1),a.push(i.substring(1,~n?n:~s?s:i.length)),o+=~n&&!~s?"(?:/([^/]+?))?":"/([^/]+?)",~s&&(o+=(~n?"?":"")+"\\"+i.substring(s))):o+="/"+i;return{keys:a,pattern:RegExp("^"+o+(t?"(?=$|/)":"/?$"),"i")}},base:"",ssrPath:void 0,ssrSearch:void 0,hrefs:e=>e}),B=()=>(0,n.useContext)(J);(0,n.createContext)({});let I=e=>{let[t,r]=e.hook(e);return[k(e.base,t),d((t,n)=>r(j(t,e.base),n))]},N=(0,n.forwardRef)((e,t)=>{let r=B(),[i,s]=I(r),{to:a="",href:o=a,onClick:l,asChild:c,children:u,className:h,replace:m,state:p,...g}=e,f=d(t=>{t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||0!==t.button||(l?.(t),t.defaultPrevented||(t.preventDefault(),s(o,e)))}),b=r.hrefs("~"===o[0]?o.slice(1):r.base+o,r);return c&&(0,n.isValidElement)(u)?(0,n.cloneElement)(u,{onClick:f,href:b}):(0,n.createElement)("a",{...g,onClick:f,href:b,className:h?.call?h(i===o):h,children:u,ref:t})})}};