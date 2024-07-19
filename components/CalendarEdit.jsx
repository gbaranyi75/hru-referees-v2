"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarItem from "./CalendarItem";
import OutlinedButton from "@/components/common/OutlinedButton";
import Spinner from "./common/Spinner";
import useCalendars from "@/hooks/useCalendars";

const CalendarEdit = () => {
  const { calendars, loading } = useCalendars();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const exitEditMode = () => {
    router.push("/dashboard/calendar");
  };

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  if (loading) return <Spinner />;

  return (
    <section>
      <div className="w-full mb-5">
        {calendars &&
          calendars.map((data, index) => (
            <CalendarItem
              key={index}
              calendar={data}
              isOpen={isOpen === index}
              toggle={toggleOpen(index)}
            />
          ))}
        <div className="px-4 py-3 my-8 text-center sm:px-6">
          <OutlinedButton
            text={"Vissza"}
            type={"button"}
            onClick={exitEditMode}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarEdit;
