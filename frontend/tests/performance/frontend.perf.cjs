const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const BASE_URL = process.env.PERF_FRONTEND_URL || "http://127.0.0.1:4173";

const pages = [
  {
    name: "home",
    path: "/",
  },
];

const REQUEST_COUNT = 10;
const MAX_AVERAGE_RESPONSE_TIME = 1000;
const MAX_P95_RESPONSE_TIME = 1500;
const MAX_JS_BUNDLE_SIZE_KB = 700;
const MAX_CSS_BUNDLE_SIZE_KB = 300;

async function measurePage(page) {
  const url = `${BASE_URL}${page.path}`;
  const times = [];
  let errors = 0;

  console.log("\n====================================");
  console.log(`Performance Test Frontend: ${page.name}`);
  console.log(`URL: ${url}`);
  console.log(`Jumlah request: ${REQUEST_COUNT}`);
  console.log("====================================");

  for (let i = 1; i <= REQUEST_COUNT; i++) {
    const start = performance.now();

    try {
      const response = await fetch(url);
      const html = await response.text();
      const end = performance.now();

      if (!response.ok) {
        errors++;
        console.log(`Request ${i}: ERROR status ${response.status}`);
        continue;
      }

      if (!html.includes("<!doctype html") && !html.includes("<!DOCTYPE html")) {
        errors++;
        console.log(`Request ${i}: ERROR response bukan HTML`);
        continue;
      }

      const duration = Math.round(end - start);
      times.push(duration);

      console.log(`Request ${i}: ${duration} ms`);
    } catch (error) {
      errors++;
      console.log(`Request ${i}: ERROR ${error.message}`);
    }
  }

  if (times.length === 0) {
    throw new Error(`Semua request gagal untuk halaman ${page.name}`);
  }

  const sortedTimes = [...times].sort((a, b) => a - b);
  const total = times.reduce((sum, time) => sum + time, 0);
  const average = Math.round(total / times.length);
  const min = sortedTimes[0];
  const max = sortedTimes[sortedTimes.length - 1];
  const p95Index = Math.ceil(0.95 * sortedTimes.length) - 1;
  const p95 = sortedTimes[p95Index];

  console.log("\nHASIL RESPONSE TIME");
  console.log("====================================");
  console.log(`Halaman        : ${page.name}`);
  console.log(`Average time   : ${average} ms`);
  console.log(`Min time       : ${min} ms`);
  console.log(`Max time       : ${max} ms`);
  console.log(`P95 time       : ${p95} ms`);
  console.log(`Errors         : ${errors}`);
  console.log("====================================");

  if (errors > 0) {
    throw new Error(`Terdapat ${errors} error pada halaman ${page.name}`);
  }

  if (average > MAX_AVERAGE_RESPONSE_TIME) {
    throw new Error(
      `Average response time terlalu lambat: ${average} ms. Maksimal ${MAX_AVERAGE_RESPONSE_TIME} ms`
    );
  }

  if (p95 > MAX_P95_RESPONSE_TIME) {
    throw new Error(
      `P95 response time terlalu lambat: ${p95} ms. Maksimal ${MAX_P95_RESPONSE_TIME} ms`
    );
  }

  return {
    page: page.name,
    average,
    min,
    max,
    p95,
    errors,
  };
}

function getFileSizeKb(filePath) {
  const stats = fs.statSync(filePath);
  return Number((stats.size / 1024).toFixed(2));
}

function checkBundleSize() {
  const assetsDir = path.join(process.cwd(), "dist", "assets");

  if (!fs.existsSync(assetsDir)) {
    throw new Error("Folder dist/assets tidak ditemukan. Jalankan npm run build dulu.");
  }

  const files = fs.readdirSync(assetsDir);

  const jsFiles = files.filter((file) => file.endsWith(".js"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));

  const jsTotalKb = jsFiles.reduce((total, file) => {
    return total + getFileSizeKb(path.join(assetsDir, file));
  }, 0);

  const cssTotalKb = cssFiles.reduce((total, file) => {
    return total + getFileSizeKb(path.join(assetsDir, file));
  }, 0);

  const jsTotal = Number(jsTotalKb.toFixed(2));
  const cssTotal = Number(cssTotalKb.toFixed(2));

  console.log("\nHASIL BUNDLE SIZE");
  console.log("====================================");
  console.log(`Total JS size   : ${jsTotal} KB`);
  console.log(`Total CSS size  : ${cssTotal} KB`);
  console.log(`JS files        : ${jsFiles.join(", ") || "-"}`);
  console.log(`CSS files       : ${cssFiles.join(", ") || "-"}`);
  console.log("====================================");

  if (jsTotal > MAX_JS_BUNDLE_SIZE_KB) {
    throw new Error(
      `Ukuran JS terlalu besar: ${jsTotal} KB. Maksimal ${MAX_JS_BUNDLE_SIZE_KB} KB`
    );
  }

  if (cssTotal > MAX_CSS_BUNDLE_SIZE_KB) {
    throw new Error(
      `Ukuran CSS terlalu besar: ${cssTotal} KB. Maksimal ${MAX_CSS_BUNDLE_SIZE_KB} KB`
    );
  }

  return {
    jsTotal,
    cssTotal,
  };
}

async function main() {
  console.log("Frontend Performance Testing Foodora");
  console.log(`Base URL: ${BASE_URL}`);

  const pageResults = [];

  for (const page of pages) {
    const result = await measurePage(page);
    pageResults.push(result);
  }

  const bundleResult = checkBundleSize();

  console.log("\nRINGKASAN PERFORMANCE TEST FRONTEND");
  console.log("====================================");

  pageResults.forEach((result) => {
    console.log(
      `${result.page}: average ${result.average} ms, p95 ${result.p95} ms, errors ${result.errors}`
    );
  });

  console.log(`JS Bundle : ${bundleResult.jsTotal} KB`);
  console.log(`CSS Bundle: ${bundleResult.cssTotal} KB`);
  console.log("====================================");
  console.log("Semua performance test frontend berhasil.");
}

main().catch((error) => {
  console.error("\nPerformance test frontend gagal:");
  console.error(error.message);
  process.exit(1);
});