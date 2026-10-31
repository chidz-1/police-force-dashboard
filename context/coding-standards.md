- Write clean, maintainable, and scalable code
- Follow SOLID principles
- Prefer functional and declarative programming patterns over imperative
- Emphasize type safety and static analysis
- Practice component-driven development
    
## Planning Phase

- Begin with step-by-step planning
- Write detailed pseudocode before implementation
- Document component architecture and data flow
- Consider edge cases and error scenarios

## Code Style

- Use tabs for indentation
- Use single quotes for strings (except to avoid escaping)
- Omit semicolons (unless required for disambiguation)
- Eliminate unused variables
- Add space after keywords
- Add space before function declaration parentheses
- Always use strict equality (===) instead of loose equality (==)
- Space infix operators
- Add space after commas
- Keep else statements on the same line as closing curly braces
- Use curly braces for multi-line if statements
- Always handle error parameters in callbacks
- Limit line length to 80 characters
- Use trailing commas in multiline object/array literals

## Naming Conventions
    
### General Rules

- Use PascalCase for:
  - Components
  - Type definitions
  - Interfaces
- Use kebab-case for:
  - Directory names (e.g., components/auth-wizard)
  - File names (e.g., user-profile.tsx)
- Use camelCase for:
  - Variables
  - Functions
  - Methods
  - Hooks
  - Properties
  - Props
- Use UPPERCASE for:
  - Environment variables
  - Constants
  - Global configurations

### Specific Naming Patterns

- Prefix event handlers with 'handle': handleClick, handleSubmit
- Prefix boolean variables with verbs: isLoading, hasError, canSubmit
- Prefix custom hooks with 'use': useAuth, useForm
- Use complete words over abbreviations except for:
  - err (error)
  - req (request)
  - res (response)
  - props (properties)
  - ref (reference)

## React Best Practices
    
### Component Architecture

- Use functional components with TypeScript interfaces
- Define components using the function keyword
- Extract reusable logic into custom hooks
- Implement proper component composition
- Use React.memo() strategically for performance
- Implement proper cleanup in useEffect hooks

### React Performance Optimization

- Use useCallback for memoizing callback functions
- Implement useMemo for expensive computations
- Avoid inline function definitions in JSX
- Implement code splitting using dynamic imports
- Implement proper key props in lists (avoid using index as key)

## Next.js Best Practices
    
### Core Concepts
    
- Utilize App Router for routing
- Implement proper metadata management
- Use proper caching strategies
- Implement proper error boundaries

### Components and Features

- Use Next.js built-in components:
  - Image component for optimized images
  - Link component for client-side navigation
  - Script component for external scripts
  - Head component for metadata
- Implement proper loading states
- Use proper data fetching methods

### Server Components

- Default to Server Components
- Use URL query parameters for data fetching and server state management
- Use 'use client' directive only when necessary:
  - Event listeners
  - Browser APIs
  - State management
  - Client-side-only libraries

## TypeScript Implementation

- Enable strict mode
- Define clear interfaces for component props, state, and Redux state structure.
- Use type guards to handle potential undefined or null values safely.
- Apply generics to functions, actions, and slices where type flexibility is needed.
- Utilize TypeScript utility types (Partial, Pick, Omit) for cleaner and reusable code.
- Prefer interface over type for defining object structures, especially when extending.
- Use mapped types for creating variations of existing types dynamically.

## Git Commit Rules

- Make the head / title of the commit message brief
- Include elaborate details in the body of the commit message
- Always follow the conventional commit message format
- Add two newlines after the commit message title
- **NEVER** commit directly to *main* branch, always create a feature branch first
- Use the following naming convention when creating branches:
  - feature branches: feature/feature-name
  - fix branches: feature/fix-name
  - test branches: feature/test-name

## Code Organisation

### Definitions

The following are definitions in relation to folder structuring and the placement of code:

Component:

- The folder to host globally reusable components
- Shadcn/ui components are also hosted within this folder
- Folder location: @components

Features:

- The folder to host a specific feature of the application
- Globally reusable components that help build the feature may imported here
- Folder location: @features

### Folder Structure Diagrams

The project root will include the following:

```
project root
  ├── components/      # Global React components (Shadcn/UI components are in the ui/ subdirectory)
  ├── features/        # Specific application features
  ├── utils/           # Global utility functions 
  ├── constants/       # Global constants 
  ├── types/           # Global type related files
  ├── actions/         # Global Next.js server actions 
  │   └── {verb}{resource}.ts # e.g. addUser.ts | deleteVehicle.ts
  └── hooks/           # Global React Hooks
```

#### Features

**ALWAYS** respect the following folder structure when implementing a feature:

```
features/feature-name/
  ├── components/      # Feature specific components
  ├── utils/           # Feature specific utility functions 
  ├── constants/       # Feature specific constants 
  ├── types/           # Feature specific type related files
  ├── actions/         # Feature specific Next.js server actions 
  │   └── {verb}{resource}.ts # e.g. addUser.ts | deleteVehicle.ts
  └── hooks/           # Feature specific React Hooks
```

## Design Patterns

- **ALWAYS** develop with a preference for SOLID principles and the following design patterns
- **ALWAYS** explicitly state which design pattern you are selecting prior to implementation
- If you are explicitly told which design pattern to use **ALWAYS** follow it

### Creation

-  Builder
-  Factory
-  Singleton

### Structural

- Decorator
- Façade

### Behavioural

- State
- Observer
- Context Provider (React)