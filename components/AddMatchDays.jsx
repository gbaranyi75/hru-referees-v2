"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddMatchDaysItem from "./AddMatchDaysItem";
import Spinner from "./common/Spinner";
import useCalendars from "@/hooks/useCalendars";

const AddMatchDays = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  //const [calendars, setCalendars] = useState([]);
  const { calendars, loading } = useCalendars();
  //const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(0);
  const [displayName, setDisplayName] = useState("");

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

/*   useEffect(() => {
    const fetchMatchDays = async () => {
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

    fetchMatchDays();
  }, []); */

  useEffect(() => {
    const fetchUserData = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/users/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setDisplayName(data.displayName);
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserData(userId);
    }
  }, [session]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="md:px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {calendars.length === 0 ? (
          <p>Nem találtam táblázatot!</p>
        ) : (
          <div className="">
            {calendars.map((calendar, index) => (
              <AddMatchDaysItem
                session={session}
                key={calendar._id}
                calendar={calendar}
                isOpen={isOpen === index}
                toggle={toggleOpen(index)}
                displayName={displayName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddMatchDays;
