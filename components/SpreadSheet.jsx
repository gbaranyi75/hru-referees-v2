"use client";
import { useState } from "react";
import SpreadSheetItem from "./SpreadSheetItem";
import Spinner from "./common/Spinner";
import useCalendars from "@/hooks/useCalendars";

const SpreadSheet = () => {
  const { calendars, loading } = useCalendars();
  const [isOpen, setIsOpen] = useState(0);

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  if (loading) return <Spinner />;

  return (
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
