# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```


## Challenges Faced

### Misquoted API burst limit rate 

- Problem: Documented as 30, in reality it's circa 5
- Solution: 
  - Staggered API calls to fetch multiple Stops by date (trade-off is it increases fetch time)
  - Back off exponentially i.e. retries with the base (attempt) raised to the power of 2 up to the max retries     


## Performance Improvements

- More code splitting: Done for the table street map using Next.JS' <dynamic> component but there is a case for charts to reduce client component size per route