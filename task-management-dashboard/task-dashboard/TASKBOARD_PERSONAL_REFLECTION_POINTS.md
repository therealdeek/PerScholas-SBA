# Project Reflection

## What I Built

For this SBA I built a task management dashboard — a single-page app where you can add tasks, track their status, filter and sort them, and have everything persist across page refreshes. I wanted it to feel like something you'd actually use, not just a checkbox exercise, so I put real thought into the layout and user experience.

---

## What Went Well

Getting the TypeScript types right from the start made the rest of the project a lot smoother than I expected. Once `Task`, `Status`, `Priority`, and `FilterOptions` were defined in one place, VS Code's autocomplete basically guided me through every component. Any time I made a typo or passed the wrong prop type, TypeScript caught it immediately instead of letting it blow up at runtime.

The `useEffect` and `useState` hooks clicked for me during this project in a way they hadn't before. The distinction between state that needs to be lifted up versus state that should stay local became really clear once I was working with real components that needed to communicate with each other. For example, the sort and search inside `TaskList` only matter to `TaskList` — nothing else needs to know about them. But the task array itself is needed everywhere, so it lives in `Dashboard`.

---

## What Was Challenging

The localStorage persistence gave me more trouble than I anticipated. My first approach was a `useEffect` to load from localStorage on mount and a second `useEffect` to save whenever tasks changed. That worked on the surface but had a subtle bug — the save effect was firing immediately on mount with an empty array, wiping out whatever was stored before the load effect had a chance to run. The fix was switching to a lazy initializer in `useState`, which runs once synchronously before the first render. That was a genuinely useful thing to learn.

Tailwind v4 was also a surprise. I had used Tailwind v3 before and went looking for `tailwind.config.js` to set up class-based dark mode, only to find out v4 removed that entirely in favor of configuring everything in CSS. The `@custom-variant` directive was new to me and took some reading to get right — I also had a typo in it (`custome` instead of `custom`) that had me staring at the dark mode toggle not working for longer than I'd like to admit.

---

## What I Would Do Differently

If I were starting over I'd set up the TypeScript types and utility functions first before touching any components. I did end up building them early, but I made a couple of mistakes with the `Status` type values (`"pending"` and `"completed"` instead of `"to-do"`, `"in-progress"`, and `"done"`) that caused red lines to cascade across multiple files at once. Having the types fully locked in before writing any component code would have prevented that.

I'd also spend more time planning which state goes where before writing any code. I had a clear picture of it conceptually, but there were a few moments mid-build where I realized a piece of state was in the wrong place and had to refactor. A quick diagram upfront would have saved that time.

---

## What I Learned

This project taught me that TypeScript's strictness is genuinely helpful and not just bureaucratic overhead. Every time it flagged an error it was pointing at a real problem — a wrong status value, a missing prop, an unused import that signaled dead code. I came away trusting the type checker a lot more than I did going in.

I also got a lot more comfortable with React's unidirectional data flow. Knowing where to put state, when to lift it up, and when to keep it local is one of those things that sounds simple in theory but only really makes sense once you've built something non-trivial with it.