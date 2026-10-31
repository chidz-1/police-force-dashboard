## Problem Domain

This application aims to provide a dashboard that visualizes publicly available police force stop and search data. The data is sourced from a public API and the stop and search data is limited to one UK police force.

## Users

- The general public: anyone wanting to observe stop and search data visualizations
- Police force employees: those looking to act on the data visualizations

## Features

- Pages that display data visualizations in various forms i.e. charts & tables
- Categorized pages based the resources defined in the public API
- Navigation between the aforementioned pages
- Pagination, filters and sorting UI elements where relevant on each page
- Ability to toggle between light and dark themes 

## Data Schema

Read @context/schemas/data-schema.md

## Tech Stack

- Next.JS: serve the frontend application and provide backend API Routes & Server Actions
- Zod: to validate data from the API and to infer types from it

### Frontend

- Shadcn/UI: The base design system and sole provider of components for the data visualizations
- Tailwind: As the utility first styling library
- Tanstack Query: Client Component data fetching

### Backend

- External API: data.police.uk - see data.police.uk/docs to determine the data schema

## UI/UX

- Wireframes & prototype designs - see @context/screenshots
- Color theme
  - defined within the project Shadcn/UI configuration i.e. @components.json
  - **ALWAYS** apply thematic according to what is defined within @components.json
  - **NEVER** apply thematic changes outside what is defined in @components.json

## Documents

- data.police.uk/docs