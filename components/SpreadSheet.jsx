"use client";
import { useState, useEffect } from "react";
import SpreadSheetItem from "./SpreadSheetItem";
import Spinner from "./common/Spinner";

const SpreadSheet = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [calendars, setCalendars] = useState([]);

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  useEffect(() => {
    const fetchSpreadSheets = async () => {
      try {
        const res = await fetch("/api/dashboard/calendar");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        const sortedData = data.sort((a, b) => {
          return (
            new Date(b.days[0]).getMonth() - new Date(a.days[0]).getMonth()
          );
        });
        setCalendars(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpreadSheets();
  }, []);

  return loading ? (
    <Spinner loading={loading}/>
  ) : (
    <section>
      <div className="w-full mb-5">
        {calendars.map((data, index) => (
          <SpreadSheetItem
            key={index}
            calendar={data}
            isOpen={isOpen === index}
            toggle={toggleOpen(index)}
          />
        ))}
      </div>
    </section>
  );
};
export default SpreadSheet;
