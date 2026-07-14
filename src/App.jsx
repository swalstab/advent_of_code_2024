import { BrowserRouter, Routes, Route } from "react-router";

import Homepage from "./pages/Homepage";
import DayPageRoute from "./pages/DayPageRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="day/:day" element={<DayPageRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
