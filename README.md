# StopWatch

This application aims to provide a dashboard that visualizes publicly available police force stop and search data. The data is sourced from a public API and the stop and search data is limited to one UK police force.

- Source data API =  https://data.police.uk/

## How to run the application locally 

**NOTE**: For the full list force ids - https://data.police.uk/docs/method/forces

## Run only 

- docker pull YOUR_DOCKERHUB_USERNAME/police-force-dashboard:latest
- docker run --rm -p <chosen_forwarding_port>:3000 YOUR_DOCKERHUB_USERNAME/police-force-dashboard:latest
- Open http://localhost:<chosen_forwarding_port>

## Build & Run

### Next dev/production server
- Create a .env from .env.example
- Optional: change force id, default is _leicestershire_
- Shell commands:
  - dev server: `npm run dev` for dev
  - production server `npm run build && npm run start`

### Via Docker
- To change the force id, amend the Dockerfile `ARG` value i.e. 
- `ARG NEXT_PUBLIC_SELECTED_POLICE_FORCE=leicestershire`
- Following Docker commands:

```
docker build -t police-force-dashboard .
docker images police-force-dashboard
docker run --rm -p <chosen_forwarding_port>:3000 police-force-dashboard 
Then open http://localhost:<chosen_forwarding_port>.
```

## Main Challenges Faced

### Misquoted API burst limit rate 

The data.police.uk API states:

`The current rate limit is 15 requests per second with a burst of 30. So, on average you must make fewer than 15 requests each second, but you can make up to 30 in a single second.`

This was observed to be incorrect. In reality, the bursts are circa 5 per second after which you'll receive 429 rate limit server responses. To overcome this, a two fold solution was applied:

- Staggered API calls: Where multiple months are needed in batch, individual months are fetched with a slight offset (500ms/Half a second) offset relative to the fetches' position the queue. 
- Retries on receipt of a 429 with an exponential "back off" is applied with a max limit t the number of retries that can be applied.

The trade-off is a slightly longer Next.js build time but this is mitigated with use of Next.js' _cache components_ meaning the builder workers share the cached functions that make these calls and is also utilized at runtime.

### Vague API Resource values

Example: https://data.police.uk/docs/method/stops-force/

1. There is no explicit list of possible values 
2. The nature of some values are inconsistent i.e. Nullish when stated it is guarantee

In light of this... 

- Large data samples were analysed to record a set of _known value_ values (i.e. for filter values)
- The Zod schemas mostly refrain from enums and instead 
  - Validate on primitive values
  - Assume Nullish-ness    

Zod validation occurs at the point of fetch to catch potential API drift so if that does occur it is caught at build-time. 

## Improvements / Future enhancements

- More code splitting: Done for the table street map using Next.JS' <dynamic> component but there is a case for charts to reduce client component size per route
- Testing: React Testing Library is a candidate for this and is favoured for it's accessibility. Time constraints is factor in test cases not currently being available