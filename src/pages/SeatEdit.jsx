import React, { useState, useCallback } from "react";

const seatData = {
  row_regular: 4,
  row_vip: 6,
  row_double: 2,
};

const seatTypeId = {
  regular: 1,
  vip: 2,
  double: 3,
};

const SeatSelector = () => {
  const [seats, setSeats] = useState(() => generateInitialSeats(seatData));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const col = 11;

  // Hàm tạo ghế ban đầu
  function generateInitialSeats(data) {
    const result = [];
    const seatTypes = ["regular", "vip", "double"];
    let rowIndex = 0;

    seatTypes.forEach((type) => {
      for (let row = 0; row < data[`row_${type}`]; row++) {
        const rowLabel = String.fromCharCode(65 + rowIndex++);
        const seatRow = Array(11)
          .fill(null)
          .map((_, col) => ({
            type,
            rowLabel,
            col: col + 1,
            selected: false,
            colspan: 1,
            hidden: false,
          }));
        result.push({ type, row: rowLabel, seats: seatRow });
      }
    });

    return result;
  }

  const handleSeatClick = useCallback(
    (rowIndex, colIndex) => {
      const seat = seats[rowIndex].seats[colIndex];

      const updateSeats = (seat, action) => {
        setSeats((prevSeats) =>
          prevSeats.map((row, rIdx) =>
            rIdx === rowIndex
              ? {
                  ...row,
                  seats: row.seats.map((s, cIdx) =>
                    cIdx === colIndex ? { ...s, ...action } : s
                  ),
                }
              : row
          )
        );
      };

      if (seat.selected) {
        if (seat.type === "double") {
          const nextSeat = seats[rowIndex].seats[colIndex + 1];
          nextSeat.hidden = false;
          nextSeat.selected = false;
          seat.colspan = 1;
        }
        removeSeatFromSelected(seat.rowLabel, seat.col);
        updateSeats(seat, { selected: false });
      } else {
        if (seat.type === "double") {
          const nextSeat = seats[rowIndex].seats[colIndex + 1];
          const prevSeat = seats[rowIndex].seats[colIndex - 1];

          if (
            colIndex < seats[rowIndex].seats.length - 1 &&
            !nextSeat.selected
          ) {
            nextSeat.hidden = true;
            seat.colspan = 2;
            nextSeat.selected = true;
            addSeatToSelected(seat.type, seat.rowLabel, seat.col);
            updateSeats(seat, { selected: true });
          } else if (colIndex > 0 && !prevSeat.selected) {
            seat.hidden = true;
            prevSeat.colspan = 2;
            prevSeat.selected = true;
            addSeatToSelected(prevSeat.type, prevSeat.rowLabel, prevSeat.col);
            updateSeats(prevSeat, { selected: true });
          } else if (nextSeat?.selected && prevSeat?.selected) {
            alert("You can only select adjacent seats.");
            return;
          }
        } else {
          addSeatToSelected(seat.type, seat.rowLabel, seat.col);
          updateSeats(seat, { selected: true });
        }
      }
    },
    [seats]
  );

  const handleSelectAll = useCallback(
    (rowIndex) => {
      handleDeselectAll(rowIndex); // First, deselect all seats in the row

      setSeats((prevSeats) =>
        prevSeats.map((row, rIdx) =>
          rIdx === rowIndex
            ? {
                ...row,
                seats: row.seats.map((seat, i) => {
                  if (
                    seat.type === "double" &&
                    i % 2 === 0 &&
                    i < row.seats.length - 1
                  ) {
                    const nextSeat = row.seats[i + 1];
                    nextSeat.selected = true;
                    nextSeat.hidden = true;
                    seat.selected = true;
                    seat.colspan = 2;
                    addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                  } else if (seat.type !== "double") {
                    seat.selected = true;
                    addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                  }
                  return seat;
                }),
              }
            : row
        )
      );
    },
    [seats]
  );

  const handleDeselectAll = useCallback((rowIndex) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              seats: row.seats.map((seat) => {
                if (seat.selected) {
                  removeSeatFromSelected(seat.rowLabel, seat.col);
                }
                return { ...seat, selected: false, hidden: false, colspan: 1 };
              }),
            }
          : row
      )
    );
  }, []);

  const addSeatToSelected = (type, rowLabel, col) => {
    setSelectedSeats((prev) => [
      ...prev,
      {
        coordinates_x: col.toString(),
        coordinates_y: rowLabel,
        type_seat_id: seatTypeId[type],
      },
    ]);
  };

  const removeSeatFromSelected = (rowLabel, col) => {
    setSelectedSeats((prev) =>
      prev.filter(
        (seat) =>
          !(
            seat.coordinates_x === col.toString() &&
            seat.coordinates_y === rowLabel
          )
      )
    );
  };

  const handleSubmit = () => {
    const data = selectedSeats.sort((a, b) => {
      // Sắp xếp theo coordinates_y theo thứ tự bảng chữ cái
      if (a.coordinates_y > b.coordinates_y) {
        return 1;
      }
      if (a.coordinates_y < b.coordinates_y) {
        return -1;
      }

      // Nếu coordinates_y bằng nhau, sắp xếp theo coordinates_x (theo thứ tự số)
      return parseInt(a.coordinates_x) - parseInt(b.coordinates_x);
    });

    console.log("Selected Seats:", JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">Sơ đồ ghế</h2>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Row</th>
                {[...Array(11)].map((_, col) => (
                  <th key={col} className="border p-2">
                    {col + 1}
                  </th>
                ))}
                <th className="border p-2" colSpan={2}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {seats.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{row.row}</td>
                  {row.seats.map((seat, i) => (
                    <td
                      id={`seat-${seat.rowLabel}-${seat.col}`}
                      colSpan={seat.colspan}
                      key={i}
                      onClick={() => handleSeatClick(index, i)}
                      className={`border cursor-pointer p-2 text-center ${
                        seat.hidden && "hidden"
                      } ${
                        seat.type === "regular" && !seat.selected
                          ? "bg-yellow-200"
                          : seat.type === "vip" && !seat.selected
                          ? "bg-blue-200"
                          : seat.type === "double" && !seat.selected
                          ? "bg-green-200"
                          : "bg-white"
                      }`}
                    >
                      {seat.type === "regular" && seat.selected ? (
                        <div className="relative w-full h-full">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[url('/seat-regular.svg')] bg-auto bg-center bg-no-repeat w-10 h-10"></div>
                        </div>
                      ) : seat.type === "vip" && seat.selected ? (
                        <div className="relative w-full h-full">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[url('/seat-vip.svg')] bg-auto bg-center bg-no-repeat w-10 h-10"></div>
                        </div>
                      ) : seat.type === "double" && seat.selected ? (
                        <div className="relative w-full h-full">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[url('/seat-double.svg')] bg-auto bg-center bg-no-repeat w-10 h-10"></div>
                        </div>
                      ) : (
                        "+"
                      )}
                    </td>
                  ))}
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleSelectAll(index)}
                      className="bg-blue-500 text-white rounded px-2 py-1"
                    >
                      +
                    </button>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDeselectAll(index)}
                      className="bg-red-500 text-white rounded px-2 py-1 ml-2"
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
