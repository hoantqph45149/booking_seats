import "./App.css";
import SendNotification from "./pages/SendNotification";
import { Route, Routes } from "react-router-dom";
import { GetNotification } from "./pages/GetNotification";
import Layouts from "./Layouts";
import TheaterSeating from "./pages/TheaterSeating";
import SeatSelector from "./pages/SeatEdit";
import SeatMap from "./pages/SeatMap";

function App() {
  const seats = [
    {
      coordinates_x: "1",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "2",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "3",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "4",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "5",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "6",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "7",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "8",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "9",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "10",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "11",
      coordinates_y: "A",
      type_seat_id: 1,
    },
    {
      coordinates_x: "1",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "2",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "3",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "4",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "5",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "6",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "7",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "8",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "9",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "10",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "11",
      coordinates_y: "B",
      type_seat_id: 1,
    },
    {
      coordinates_x: "1",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "2",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "3",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "4",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "5",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "6",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "7",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "8",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "9",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "10",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "11",
      coordinates_y: "C",
      type_seat_id: 1,
    },
    {
      coordinates_x: "1",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "2",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "3",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "4",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "5",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "6",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "7",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "8",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "9",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "10",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "11",
      coordinates_y: "D",
      type_seat_id: 1,
    },
    {
      coordinates_x: "1",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "E",
      type_seat_id: 2,
    },
    {
      coordinates_x: "1",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "F",
      type_seat_id: 2,
    },
    {
      coordinates_x: "1",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "G",
      type_seat_id: 2,
    },
    {
      coordinates_x: "1",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "H",
      type_seat_id: 2,
    },
    {
      coordinates_x: "1",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "I",
      type_seat_id: 2,
    },
    {
      coordinates_x: "1",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "3",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "4",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "5",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "6",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "7",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "8",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "9",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "10",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "11",
      coordinates_y: "J",
      type_seat_id: 2,
    },
    {
      coordinates_x: "2",
      coordinates_y: "K",
      type_seat_id: 3,
    },
    {
      coordinates_x: "5",
      coordinates_y: "K",
      type_seat_id: 3,
    },
    {
      coordinates_x: "8",
      coordinates_y: "K",
      type_seat_id: 3,
    },
    {
      coordinates_x: "1",
      coordinates_y: "L",
      type_seat_id: 3,
    },
    {
      coordinates_x: "3",
      coordinates_y: "L",
      type_seat_id: 3,
    },
    {
      coordinates_x: "5",
      coordinates_y: "L",
      type_seat_id: 3,
    },
    {
      coordinates_x: "7",
      coordinates_y: "L",
      type_seat_id: 3,
    },
    {
      coordinates_x: "9",
      coordinates_y: "L",
      type_seat_id: 3,
    },
  ];

  const updatedSeats = seats.map((seat, i) => ({
    ...seat,
    pivot_showtime_id: 23,
    pivot_seat_id: i + 1,
    pivot_status: "available",
    pivot_price: 170000,
  }));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/send" element={<SendNotification />} />
          <Route path="/get" element={<GetNotification />} />
          <Route path="/seats" element={<TheaterSeating />} />
          <Route path="/seats/edit" element={<SeatSelector />} />
          <Route path="/seatmap" element={<SeatMap seats={updatedSeats} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
