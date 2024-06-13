"use client";

import { useState, useEffect } from "react";
import AddMatchDaysItem from "./AddMatchDaysItem";
import Spinner from "@/components/Spinner";

const AddMatchDays = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  useEffect(() => {
    const fetchMatchDays = async () => {
      try {
        const res = await fetch("/api/dashboard/calendar");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        const sortedData = data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCalendars(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDays();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {calendars.length === 0 ? (
          <p>Nem találtam táblázatot!</p>
        ) : (
          <div className="">
            {calendars.map((calendar, index) => (
              <AddMatchDaysItem
                key={calendar._id}
                calendar={calendar}
                isOpen={isOpen === index}
                toggle={toggleOpen(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddMatchDays;
