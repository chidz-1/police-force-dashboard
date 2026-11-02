// scripts/test-rate.ts — run with: npx tsx scripts/test-rate.ts
const months = [
  "2026-08",
  "2026-07",
  "2026-06",
  "2026-05",
  "2026-04",
  // "2026-03",
  // "2026-02",
  // "2026-01",
  // "2025-12",
  // "2025-11",
  // "2025-10",
  // "2025-09",
];

const start = Date.now();

const results = await Promise.all(
  months.map(async (date) => {
    const r = await fetch(
      `https://data.police.uk/api/stops-force?force=leicestershire&date=${date}`
    );
    return `${date} ${r.status} retry-after=${r.headers.get("retry-after")} t=${Date.now() - start}ms`;
  })
);

console.log(results.join("\n"));

// scripts/test-rate.ts — run with: npx tsx scripts/test-rate.ts
// import pLimit from "p-limit";

// const limit = pLimit(3);

// const months = [
//   "2026-08",
//   "2026-07",
//   "2026-06",
//   "2026-05",
//   "2026-04",
//   "2026-03",
//   "2026-02",
//   "2026-01",
//   "2025-12",
//   "2025-11",
//   "2025-10",
//   "2025-09",
// ];

// const start = Date.now();

// const results = await Promise.all(
//   months.map((date) =>
//     limit(async () => {
//       const r = await fetch(
//         `https://data.police.uk/api/stops-force?force=leicestershire&date=${date}`
//       );
//       return `${date} ${r.status} retry-after=${r.headers.get("retry-after")} t=${Date.now() - start}ms`;
//     })
//   )
// );

// console.log(results.join("\n"));

// scripts/test-rate.ts — run with: npx tsx scripts/test-rate.ts
// const DELAY_MS = 500; // try 500, then 1000 if 429s persist

// const months = [
//   "2026-08",
//   "2026-07",
//   "2026-06",
//   "2026-05",
//   "2026-04",
//   "2026-03",
//   "2026-02",
//   "2026-01",
//   "2025-12",
//   "2025-11",
//   "2025-10",
//   "2025-09",
// ];

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
// const start = Date.now();

// const results = await Promise.all(
//   months.map(async (date, i) => {
//     await sleep(i * DELAY_MS); // stagger request starts
//     const r = await fetch(
//       `https://data.police.uk/api/stops-force?force=leicestershire&date=${date}`
//     );
//     return `${date} ${r.status} retry-after=${r.headers.get("retry-after")} t=${Date.now() - start}ms`;
//   })
// );

// console.log(results.join("\n"));

export {};
