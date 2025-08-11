import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginKaryawan from "./pages/PERTAMA/LoginKaryawan";
import LoginSuccess from "./pages/PERTAMA/LoginSuccess";
import Absensi from "./pages/ABSEN/AbsenAwal";
import BerandaTeknisi from "./pages/BERANDA/BerandaTeknisi";
import AbsenAkhir from "./pages/ABSEN/AbsenAkhir";

import IzinSuccess from "./pages/PERTAMA/IzinSuccess";
import Dashboard from "./pages/ADMIN/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/berandateknisi" element={<BerandaTeknisi />} />
        <Route path="/" element={<LoginKaryawan />} />
        <Route path="/loginSuccess" element={<LoginSuccess />} />
        <Route path="/absensi" element={<Absensi />} />
        <Route path="/berandateknisi" element={<BerandaTeknisi />} />
        <Route path="/absenakhir" element={<AbsenAkhir />} />
        <Route path="/izin-success" element={<IzinSuccess />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
