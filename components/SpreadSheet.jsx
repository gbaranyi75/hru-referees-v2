"use client";

import { useState, useEffect } from "react";
import { fetchCalendarData } from "@/utils/requests";
import SpreadSheetItem from "./SpreadSheetItem";
import Spinner from "./common/Spinner";

const SpreadSheet = async () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  const calendars = await fetchCalendarData();
  const sortedData = calendars.sort((a, b) => {
    return new Date(b.days[0]).getMonth() - new Date(a.days[0]).getMonth();
  });

  return (
    <div className="w-full mb-5">
      {/* {!sortedData && <Spinner />} */}
      {sortedData &&
        sortedData.map((data, index) => (
          <SpreadSheetItem
            key={index}
            //user={user}
            //userData={userData}
            calendar={data}
            isOpen={isOpen === index}
            toggle={toggleOpen(index)}
          />
        ))}
      {/* <div className="px-4 py-3 my-8 text-center sm:px-6">
        <OutlinedButton
          text={"Vissza"}
          type={"button"}
          onClick={exitEditMode}
        />
      </div> */}
    </div>
  );
};
export default SpreadSheet;
