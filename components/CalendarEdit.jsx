"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CalendarItem from "./CalendarItem";
import OutlinedButton from "@/components/common/OutlinedButton";
import Spinner from "./common/Spinner";

const CalendarEdit = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const exitEditMode = () => {
    router.push("/dashboard/calendar");
  };

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
