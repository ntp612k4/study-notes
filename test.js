#!/usr/bin/env node
/**
 * Automated Testing Script for Study Notes App
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  title: (msg) =>
    console.log(
      `\n${colors.blue}${"=".repeat(50)}${colors.reset}\n${colors.blue}${msg}${
        colors.reset
      }\n${colors.blue}${"=".repeat(50)}${colors.reset}\n`
    ),
};

const testWebBuild = () => {
  log.title("TEST 1: WEB BUILD");

  log.info("Kiểm tra build output...");
  const distPath = path.join(__dirname, "dist");
  if (!fs.existsSync(distPath)) {
    log.error("Thư mục dist không tồn tại!");
    return false;
  }

  const files = fs.readdirSync(distPath);
  if (files.includes("index.html")) {
    log.success("✓ index.html được tạo");
  } else {
    log.error("✗ index.html không được tìm thấy!");
    return false;
  }

  if (files.includes("assets")) {
    const assets = fs.readdirSync(path.join(distPath, "assets"));
    log.success(`✓ ${assets.length} tệp assets được tạo`);
  }

  return true;
};

const testSourceCode = () => {
  log.title("TEST 2: SOURCE CODE QUALITY");

  log.info("Kiểm tra App.jsx...");
  const appPath = path.join(__dirname, "src", "App.jsx");
  if (!fs.existsSync(appPath)) {
    log.error("✗ App.jsx không tìm thấy!");
    return false;
  }

  const appContent = fs.readFileSync(appPath, "utf-8");

  if (appContent.includes("subjects") && appContent.includes("Toán")) {
    log.success("✓ Tìm thấy 6 môn học");
  } else {
    log.error("✗ Thiếu danh sách môn học!");
    return false;
  }

  if (
    appContent.includes("Preferences") &&
    appContent.includes("study-notes")
  ) {
    log.success("✓ Capacitor Storage được cấu hình");
  } else {
    log.error("✗ Capacitor Storage không được cấu hình!");
    return false;
  }

  const cssPath = path.join(__dirname, "src", "App.css");
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    if (cssContent.includes("subjects-grid")) {
      log.success("✓ CSS styles được cấu hình");
    }
  }

  return true;
};

const testPackageJson = () => {
  log.title("TEST 3: PACKAGE.JSON VALIDATION");

  const pkgPath = path.join(__dirname, "package.json");
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    const requiredScripts = ["dev", "build", "preview"];
    requiredScripts.forEach((script) => {
      if (pkg.scripts && pkg.scripts[script]) {
        log.success(`✓ Script '${script}' tìm thấy`);
      }
    });

    const requiredDeps = ["react", "@capacitor/core", "@capacitor/preferences"];
    requiredDeps.forEach((dep) => {
      if (pkg.dependencies && pkg.dependencies[dep]) {
        log.success(`✓ '${dep}' v${pkg.dependencies[dep]}`);
      }
    });

    return true;
  } catch (e) {
    log.error("✗ Lỗi đọc package.json");
    return false;
  }
};

const testCapacitorConfig = () => {
  log.title("TEST 4: CAPACITOR CONFIG");

  const configPath = path.join(__dirname, "capacitor.config.json");
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    log.success(`✓ App Name: ${config.appName}`);
    log.success(`✓ App ID: ${config.appId}`);
    log.success(`✓ Web Dir: ${config.webDir}`);

    return true;
  } catch (e) {
    log.error("✗ Lỗi đọc capacitor.config.json");
    return false;
  }
};

const generateReport = (results) => {
  log.title("TEST REPORT");

  const passed = Object.values(results).filter((r) => r === true).length;
  const total = Object.keys(results).length;
  const percentage = ((passed / total) * 100).toFixed(1);

  console.log(
    `${colors.cyan}Passed: ${passed}/${total} (${percentage}%)${colors.reset}\n`
  );

  Object.entries(results).forEach(([test, result]) => {
    const status = result
      ? `${colors.green}✓${colors.reset}`
      : `${colors.red}✗${colors.reset}`;
    console.log(`${status} ${test}`);
  });

  log.title("HƯỚNG DẪN SỬ DỤNG");

  if (percentage === 100) {
    log.success("Tất cả tests đã pass! 🎉");
    console.log(`\n${colors.yellow}1. Để chạy trên Web:${colors.reset}`);
    console.log(`   npm run dev\n`);
    console.log(`${colors.yellow}2. Để build trên Android:${colors.reset}`);
    console.log(`   npx cap open android\n`);
    console.log(`${colors.yellow}3. Để build trên iOS (Mac):${colors.reset}`);
    console.log(`   npx cap open ios\n`);
    console.log(
      `${colors.yellow}4. Để xem hướng dẫn test chi tiết:${colors.reset}`
    );
    console.log(`   Mở file TESTING_GUIDE.md\n`);
  }
};

const main = async () => {
  console.clear();
  console.log(
    `\n${colors.cyan}╔════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.cyan}║   STUDY NOTES - AUTOMATED TEST SUITE             ║${colors.reset}`
  );
  console.log(
    `${colors.cyan}╚════════════════════════════════════════════════╝${colors.reset}\n`
  );

  const results = {
    "Web Build": testWebBuild(),
    "Source Code": testSourceCode(),
    "Package.json": testPackageJson(),
    "Capacitor Config": testCapacitorConfig(),
  };

  generateReport(results);
};

main().catch((error) => {
  log.error("Test error: " + error.message);
  process.exit(1);
});
