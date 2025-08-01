import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginKaryawan from './pages/PERTAMA/LoginKaryawan';
import LoginSuccess from './pages/PERTAMA/LoginSuccess';
import Absensi from './pages/ABSEN/AbsenAwal';
import BerandaTeknisi from './pages/BERANDA/BerandaTeknisi';
import Antrian from './pages/BERANDA/Antrian';
import KurirTransport from './pages/ABSEN/KurirTransport';
import AbsenAkhir from './pages/ABSEN/AbsenAkhir';
import BerandaKurir from './pages/BERANDA/BerandaKurir';
import BerandaKasir from './pages/BERANDA/BerandaKasir';
import PilihRole from './pages/PERTAMA/PilihRole';
import CekAbsen from './pages/ANALISIS/CekAbsen';
import CekGaji from './pages/ANALISIS/CekGaji';
import KontrolKerja from './pages/ANALISIS/KontrolKerja';
import AntrianKasir from './pages/BERANDA/AntrianKasir';
import AntrianKurir from './pages/BERANDA/AntrianKurir';
import IzinSuccess from './pages/PERTAMA/IzinSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pilih-role" element={<PilihRole />} />
        <Route path="/berandateknisi" element={<BerandaTeknisi />} />
        <Route path="/antrian/:estimasi" element={<Antrian />} />
        <Route path="/" element={<LoginKaryawan />} />
        <Route 
          path="/loginSuccess" 
          element={<LoginSuccess />} 
        />
        <Route path="/absensi" element={<Absensi />} />
        <Route path="/berandateknisi" element={<BerandaTeknisi />} />
        <Route path="/kurir/transport" element={<KurirTransport />} />
        <Route path="/absenakhir" element={<AbsenAkhir />} />
        <Route path="/berandakurir" element={<BerandaKurir />} />
        <Route path="/berandakasir" element={<BerandaKasir />} />
        <Route path="/berandakasir/antriankasir/:estimasi" element={<AntrianKasir />} />
        <Route path="/cekabsen" element={<CekAbsen/>} />
        <Route path="/cekgaji" element={<CekGaji/>} />
        <Route path="/kontrolkerja" element={<KontrolKerja/>} />
        <Route path="/kurir/:type" element={<AntrianKurir />} />
        <Route path="/izin-success" element={<IzinSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
