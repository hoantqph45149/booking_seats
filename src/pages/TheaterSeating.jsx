import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

const TheaterSeating = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/seats");
        const data = await res.json();
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };
    fetchSeats();
  }, []);

  const handleSeatClick = async (id) => {
    const selectedSeat = seats.find((seat) => seat.id === id);

    const isAdjacent = (seatId) => {
      if (selectedSeats.length === 0) return true;
      const prevSeat = seatId - 1;
      const nextSeat = seatId + 1;
      return (
        selectedSeats.includes(prevSeat) || selectedSeats.includes(nextSeat)
      );
    };

    if (!isAdjacent(id)) {
      alert("You can only select adjacent seats.");
      return;
    }

    try {
      await fetch(`http://127.0.0.1:8000/api/seats/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...selectedSeat, status: "selected" }),
      });

      setSelectedSeats((prev) => [...prev, id]);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === id ? { ...seat, status: "selected" } : seat
        )
      );
    } catch (error) {
      console.error("Error updating seat:", error);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("617fdc60130b53abe1f7", {
      cluster: "ap1",
      encrypted: true,
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data) => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === data.message.id ? data.message : seat
        )
      );
    });

    return () => {
      pusher.unsubscribe("my-channel");
      pusher.disconnect();
    };
  }, []);

  const seatColor = (status) =>
    ({
      available: "bg-green-500",
      occupied: "bg-gray-500",
      selected: "bg-blue-500",
    }[status]);

  const Seat = ({ id, status }) => (
    <button
      className={`w-8 h-8 rounded-t-lg ${seatColor(status)} ${
        status !== "occupied"
          ? "cursor-pointer hover:opacity-75"
          : "cursor-not-allowed"
      }`}
      onClick={() => status !== "occupied" && handleSeatClick(id)}
      disabled={status === "occupied"}
    />
  );

  const Legend = () => (
    <div className="flex justify-center space-x-4">
      {[
        { color: "green-500", label: "Available" },
        { color: "blue-500", label: "Selected" },
        { color: "gray-500", label: "Occupied" },
      ].map(({ color, label }) => (
        <div className="flex items-center" key={label}>
          <div className={`w-4 h-4 bg-${color} rounded-sm mr-2`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Movie Theater Seat Booking
        </h1>
        <div className="w-2/3 h-16 bg-gray-800 mx-auto mb-8 rounded-t-lg flex items-center justify-center">
          <span className="text-white text-lg font-semibold">Screen</span>
        </div>
        <div className="w-2/3 mx-auto grid grid-cols-10 gap-2 mb-8">
          {seats?.map(({ id, status }) => (
            <Seat key={id} id={id} status={status} />
          ))}
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default TheaterSeating;
