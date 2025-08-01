const os = require("os");
const fs = require("fs");
const path = require("path");

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1"; // fallback ke localhost jika tidak ada IP yang ditemukan
}

function getProjectRoot() {
  const currentDir = process.cwd();
  // Jika dijalankan dari folder client, naik satu level
  if (currentDir.endsWith('client')) {
    return path.join(currentDir, '..');
  }
  return currentDir;
}

const localIP = getLocalIP();
const projectRoot = getProjectRoot();
const ports = [5173, 3002];
console.log(`\n🌐 IP Network Aktif: ${localIP}`);

// Update server.js
const serverPath = path.join(projectRoot, "server", "server.js");
try {
  let serverContent = fs.readFileSync(serverPath, "utf8");
  
  // Update allowedOrigins dengan IP baru
  const allowedOriginsNew = `const allowedOrigins = [
  "http://${localIP}:5173",
  "http://localhost:5173",
  "http://${localIP}:3002",
  "capacitor://localhost",
  "http://localhost",
];`;

  // Mencari dan mengganti bagian allowedOrigins
  const allowedOriginsRegex = /const allowedOrigins = \[([\s\S]*?)\];/;
  serverContent = serverContent.replace(allowedOriginsRegex, allowedOriginsNew);
  
  fs.writeFileSync(serverPath, serverContent);
  console.log(`✅ server.js berhasil diupdate dengan IP: ${localIP}`);
} catch (error) {
  console.error("❌ Gagal mengupdate server.js:", error.message);
}

// Update .env di client
const possibleClientPaths = [
  path.join(projectRoot, "client", ".env"),
  path.join(projectRoot, ".env"),
  ".env" // jika dijalankan dari dalam folder client
];

let clientEnvPath = null;
// Cari file .env di possible paths
for (const testPath of possibleClientPaths) {
  if (fs.existsSync(path.dirname(testPath))) {
    clientEnvPath = testPath;
    break;
  }
}

if (!clientEnvPath) {
  console.error("❌ Tidak dapat menemukan folder client");
  process.exit(1);
}

try {
  let envContent = "";
  const newApiUrl = `http://${localIP}:3002`;

  if (fs.existsSync(clientEnvPath)) {
    envContent = fs.readFileSync(clientEnvPath, "utf8");
    
    if (envContent.includes("VITE_API_URL=")) {
      // Update VITE_API_URL yang sudah ada
      envContent = envContent.replace(/VITE_API_URL=.*/g, `VITE_API_URL=${newApiUrl}`);
    } else {
      // Tambahkan VITE_API_URL baru
      envContent += `\nVITE_API_URL=${newApiUrl}`;
    }
  } else {
    // Buat file .env baru
    envContent = `VITE_API_URL=${newApiUrl}`;
  }

  fs.writeFileSync(clientEnvPath, envContent);
  console.log(`✅ .env client berhasil diupdate di: ${clientEnvPath}`);
  console.log(`   dengan VITE_API_URL=${newApiUrl}`);
} catch (error) {
  console.error("❌ Gagal mengupdate .env client:", error.message);
}

console.log("\n🔄 Konfigurasi yang diupdate:");
console.log(`1. server.js - allowedOrigins:`);
console.log(`   - http://${localIP}:5173`);
console.log(`   - http://${localIP}:3002`);
console.log(`2. .env client di: ${clientEnvPath}`);
console.log(`   VITE_API_URL=http://${localIP}:3002`);

// Hanya tampilkan pesan restart jika tidak dijalankan sebagai bagian dari npm script
if (!process.env.npm_lifecycle_event) {
  console.log("\n⚠️  Langkah selanjutnya:");
  console.log("1. Restart server");
  console.log("2. Di folder client:");
  console.log("   - Hapus folder node_modules/.vite (jika ada)");
  console.log("   - Restart development server (npm run dev)");
}

console.log("\n✨ Selesai!\n"); 