const { performance } = require("perf_hooks");

const BASE_URL = process.env.PERF_BASE_URL || "http://localhost:3001";

const scenarios = [
  {
    name: "Get Vendors",
    url: `${BASE_URL}/api/vendors`,
  },
  {
    name: "Get Menu",
    url: `${BASE_URL}/api/menu`,
  },
  {
    name: "Get Booked Dates",
    url: `${BASE_URL}/api/pesanan/booked-dates`,
  },
];

const REQUEST_COUNT = 20;
const MAX_AVERAGE_RESPONSE_TIME = 1000;
const MAX_P95_RESPONSE_TIME = 1500;

async function measureEndpoint(scenario) {
  const times = [];
  let errors = 0;

  console.log("\n====================================");
  console.log(`Performance Test Backend: ${scenario.name}`);
  console.log(`URL: ${scenario.url}`);
  console.log(`Jumlah request: ${REQUEST_COUNT}`);
  console.log("====================================");

  for (let i = 1; i <= REQUEST_COUNT; i++) {
    const start = performance.now();

    try {
      const response = await fetch(scenario.url);
      await response.text();

      const end = performance.now();
      const duration = Math.round(end - start);

      if (!response.ok) {
        errors++;
        console.log(`Request ${i}: ERROR status ${response.status}`);
        continue;
      }

      times.push(duration);
      console.log(`Request ${i}: ${duration} ms`);
    } catch (error) {
      errors++;
      console.log(`Request ${i}: ERROR ${error.message}`);
    }
  }

  if (times.length === 0) {
    throw new Error(`Semua request gagal untuk ${scenario.name}`);
  }

  const sortedTimes = [...times].sort((a, b) => a - b);
  const total = times.reduce((sum, time) => sum + time, 0);

  const average = Math.round(total / times.length);
  const min = sortedTimes[0];
  const max = sortedTimes[sortedTimes.length - 1];
  const p95Index = Math.ceil(0.95 * sortedTimes.length) - 1;
  const p95 = sortedTimes[p95Index];

  console.log("\nHASIL PERFORMANCE TEST");
  console.log("====================================");
  console.log(`Scenario       : ${scenario.name}`);
  console.log(`Average time   : ${average} ms`);
  console.log(`Min time       : ${min} ms`);
  console.log(`Max time       : ${max} ms`);
  console.log(`P95 time       : ${p95} ms`);
  console.log(`Errors         : ${errors}`);
  console.log("====================================");

  if (errors > 0) {
    throw new Error(`${scenario.name} gagal karena ada ${errors} error.`);
  }

  if (average > MAX_AVERAGE_RESPONSE_TIME) {
    throw new Error(
      `${scenario.name} terlalu lambat. Average: ${average} ms`
    );
  }

  if (p95 > MAX_P95_RESPONSE_TIME) {
    throw new Error(`${scenario.name} terlalu lambat. P95: ${p95} ms`);
  }

  return {
    name: scenario.name,
    average,
    min,
    max,
    p95,
    errors,
  };
}

async function main() {
  console.log("Backend Performance Testing Foodora API");
  console.log(`Base URL: ${BASE_URL}`);

  const results = [];

  for (const scenario of scenarios) {
    const result = await measureEndpoint(scenario);
    results.push(result);
  }

  console.log("\nRINGKASAN PERFORMANCE TEST BACKEND");
  console.log("====================================");

  results.forEach((result) => {
    console.log(
      `${result.name}: average ${result.average} ms, p95 ${result.p95} ms, errors ${result.errors}`
    );
  });

  console.log("====================================");
  console.log("Semua performance test backend berhasil.");
}

main().catch((error) => {
  console.error("\nPerformance test backend gagal:");
  console.error(error.message);
  process.exit(1);
});