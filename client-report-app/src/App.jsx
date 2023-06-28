
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientReportApp from './components/clientReportsApp';
import './App.css';

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientReportApp />} />
      </Routes>
    </BrowserRouter>

  );
}
