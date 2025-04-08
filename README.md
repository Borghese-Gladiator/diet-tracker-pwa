# Diet Tracker PWA
TODO

## Local Setup
- Install Node.js 20.13.1 (see `.nvmrc`)
- Clone the repository
- Run `npm install` 
- Run `npm run dev` to start development server
- Open http://localhost:3000

## Building this App with Cursor
- Create a new Next.js project
  ```bash
  npx create-next-app@latest diet-tracker
  ```
- Install dependencies
  ```bash
  npm install @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion react-icons
  ```
- Set up Chakra UI provider in `pages/_app.js`
- Implement MVP
  - Track Meal page
  - Meal List page
  - Graph page

App Setup (works for any PWA)
- open website at [diet-tracker-pwa.vercel.app](https://diet-tracker-pwa.vercel.app)
- click top-right three vertical dots
- click "Add to Home Screen"

App Usage
- "Track Meal"
  - weigh your food IRL
  - click weight amounts per food
  - click "Save Meal"
- "Meal History"
- "Graph"

## Troubleshooting
- Error: `SyntaxError: The requested module '@chakra-ui/react' does not provide an export named 'forwardRef'`
  - https://github.com/chakra-ui/chakra-ui/issues/7170
    - Suggested Fix: Set exact version for `@chakra-ui/icons` of `2.4.2` instead of `~2.4.2`
  - Solution: Remove library and use `react-icons`
- Error: `[Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.]`
  - https://www.reddit.com/r/nextjs/comments/1fznl56/chakra_ui_v3_introduced_so_many_breaking_changes/
  - Seems Chakra V3 introduced breaking changes, so nothing is going to work. I'm not using any fancy server components. I just want a component library, so V2 is more than enough for me. (I have no performance expectations for a qiuck SaaS app)