import React, { useEffect, useState } from "react";
import Dialog from "../components/common/dialog";

const validateMaxSeats = (selectedSeats) => {
  const selectedCount = selectedSeats.reduce((count, seat) => {
    return count + (seat.type_seat_id === 3 ? 2 : 1);
  }, 0);
  return selectedCount <= 8;
};

// kiểm tra các ghế ở ngoài cùng
const checkAdjacentEdgeSeats = (seatsByRow) => {
  console.log("check edge seatsByRow ", seatsByRow);
  let edgeSeatsMessage = "";
  let isEdgeSeatIssue = false;

  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    if (seatsInRow.length >= 2) {
      const firstSeat = seatsInRow[0];
      const secondSeat = seatsInRow[1];
      const lastSeat = seatsInRow[seatsInRow.length - 1];
      const beforeLastSeat = seatsInRow[seatsInRow.length - 2];

      if (
        !firstSeat.selected &&
        secondSeat.selected &&
        firstSeat.type_seat_id !== 3 &&
        !firstSeat.sold &&
        !firstSeat.hold &&
        !firstSeat.seat_is_active
      ) {
        isEdgeSeatIssue = true;
        edgeSeatsMessage += `${firstSeat.coordinates_x}${firstSeat.coordinates_y} `;
      }

      if (
        !lastSeat.selected &&
        beforeLastSeat.selected &&
        lastSeat.type_seat_id !== 3 &&
        !lastSeat.sold &&
        !lastSeat.hold &&
        !lastSeat.seat_is_active
      ) {
        isEdgeSeatIssue = true;
        edgeSeatsMessage += `${lastSeat.coordinates_x}${lastSeat.coordinates_y} `;
      }
    }
  });

  return {
    isEdgeSeatIssue,
    edgeSeatsMessage,
  };
};

// kiểm tra ghế so le nhau

const checkSoleSeats = (seatsByRow) => {
  console.log("check sole seatsByRow ", seatsByRow);
  let soleSeatsMessage = "";
  let isSoleSeatIssue = false;

  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    const selectedIndexes = seatsInRow
      .map((seat, index) => (seat.selected ? index : null))
      .filter((index) => index !== null);
    for (let i = 0; i < selectedIndexes.length - 1; i++) {
      const gap = selectedIndexes[i + 1] - selectedIndexes[i];
      if (gap === 2) {
        const emptySeatIndex = selectedIndexes[i] + 1;
        const emptySeat = seatsInRow[emptySeatIndex];

        if (
          emptySeat &&
          !emptySeat.sold &&
          !emptySeat.hold &&
          !emptySeat.seat_is_active
        ) {
          isSoleSeatIssue = true;
          soleSeatsMessage += `${emptySeat.coordinates_x}${emptySeat.coordinates_y} `;
        }
      }
    }
  });

  return {
    isSoleSeatIssue,
    soleSeatsMessage,
  };
};

const SeatMap = ({ seats }) => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const rows = Array.from({ length: 12 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const seatsByRow = rows.map((row) => ({
    row,
    seats: seats.filter((seat) => seat.coordinates_y === row),
  }));

  const toggleSeatSelection = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    const updatedSeats = isSelected
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];

    if (!validateMaxSeats(updatedSeats)) {
      setDialog({
        isOpen: true,
        type: "warning",
        title: "Warning",
        message: "Bạn chỉ được đặt tối đa 8 ghế.",
      });
      return;
    }

    const { isEdgeSeatIssue, edgeSeatsMessage } = checkAdjacentEdgeSeats(
      seatsByRow.map((rowData) => ({
        ...rowData,
        seats: rowData.seats.map((s) =>
          updatedSeats.includes(s) ? { ...s, selected: true } : s
        ),
      }))
    );

    if (isEdgeSeatIssue) {
      setDialog({
        isOpen: true,
        type: "warning",
        title: "Hãy chọn lại ghế!",
        message: `Không được để trống ghế : ${edgeSeatsMessage}`,
      });
      return;
    }

    const { isSoleSeatIssue, soleSeatsMessage } = checkSoleSeats(
      seatsByRow.map((rowData) => ({
        ...rowData,
        seats: rowData.seats.map((s) =>
          updatedSeats.includes(s) ? { ...s, selected: true } : s
        ),
      }))
    );

    if (isSoleSeatIssue) {
      // alert(`The following seats are sole (not allowed): ${soleSeatsMessage}`);
      setDialog({
        isOpen: true,
        type: "warning",
        title: "Hãy chọn lại ghế!",
        message: `Không được để trống ghế: ${soleSeatsMessage}`,
      });
      return;
    }

    setSelectedSeats(updatedSeats);
  };

  useEffect(() => {
    const totalAmount = selectedSeats.reduce((amount, s) => {
      return (
        amount +
        (s.type_seat_id === 3 ? 160000 : s.type_seat_id === 2 ? 80000 : 50000)
      );
    }, 0);

    setTotalAmount(totalAmount);
  }, [selectedSeats]);

  // console.log(" seatsByRow ", seatsByRow);

  return (
    <div className="w-[1000px] mx-auto">
      <div className="flex justify-center">
        <span>
          Đã chọn những ghế :{" "}
          {selectedSeats.map((seat, index) =>
            seat.type_seat_id === 3 ? (
              <strong key={index}>
                {seat.coordinates_x}
                {seat.coordinates_y} - {Number(seat.coordinates_x) + 1}
                {seat.coordinates_y},{" "}
              </strong>
            ) : (
              <strong key={index}>
                {seat.coordinates_x}
                {seat.coordinates_y},{" "}
              </strong>
            )
          )}
        </span>
      </div>
      <div className="flex justify-center mt-4">
        <span className="font-bold">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN") + " VND"}
        </span>
      </div>

      <table border="1" cellPadding="5" cellSpacing="0" className="w-full">
        <thead>
          <tr>
            <th className="text-center">Row</th>
            {Array.from({ length: 11 }, (_, i) => i + 1).map((x) => (
              <th key={x} className="text-center">
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seatsByRow.map((rowData) => {
            let hideNextSeat = false;
            return (
              <tr key={rowData.row}>
                <td className="text-center">{rowData.row}</td>
                {Array.from({ length: 11 }, (_, i) => i + 1).map((x) => {
                  const seat = rowData.seats.find(
                    (seat) => seat.coordinates_x === String(x)
                  );

                  if (hideNextSeat) {
                    hideNextSeat = false;
                    return null;
                  }

                  if (seat?.type_seat_id === 3) {
                    hideNextSeat = true;
                  }

                  const isSelected = selectedSeats.includes(seat);

                  return seat?.type_seat_id === 3 ? (
                    <td
                      onClick={() => toggleSeatSelection(seat)}
                      colSpan={2}
                      key={x}
                      className={`text-center cursor-pointer ${
                        isSelected ? "bg-blue-950 text-white font-semibold" : ""
                      }`}
                    >
                      {seat
                        ? `${seat.coordinates_x}${seat.coordinates_y}, ${
                            Number(seat.coordinates_x) + 1
                          }${seat.coordinates_y}`
                        : ""}
                    </td>
                  ) : (
                    <td
                      onClick={() => toggleSeatSelection(seat)}
                      key={x}
                      className={`text-center cursor-pointer ${
                        isSelected ? "bg-blue-950 text-white font-semibold" : ""
                      }`}
                    >
                      {seat ? `${seat.coordinates_x}${seat.coordinates_y}` : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {dialog.isOpen && (
        <Dialog
          type={dialog.type}
          title={dialog.title}
          message={dialog.message}
          onClose={() => setDialog({ isOpen: false })}
        />
      )}
    </div>
  );
};

export default SeatMap;
