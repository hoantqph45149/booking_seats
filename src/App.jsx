import "./App.css";
import SendNotification from "./pages/SendNotification";
import { Route, Routes } from "react-router-dom";
import { GetNotification } from "./pages/GetNotification";
import Layouts from "./Layouts";
import TheaterSeating from "./pages/TheaterSeating";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/send" element={<SendNotification />} />
          <Route path="/get" element={<GetNotification />} />
          <Route path="/seats" element={<TheaterSeating />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
