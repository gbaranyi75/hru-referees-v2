"use client";
import { useState, useEffect } from "react";

const useCalendars = () => {
  const [loading, setLoading] = useState(true);
  const [calendars, setCalendars] = useState([]);

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
            new Date(b.days[0]).getTime() - new Date(a.days[0]).getTime());
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
  return { calendars, loading };
};
export default useCalendars;
