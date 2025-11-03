// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import MainPage from "./pages/MainPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
