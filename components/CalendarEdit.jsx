"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CalendarItem from "./CalendarItem";
import OutlinedButton from "@/components/common/OutlinedButton";
import { fetchCalendarData } from "@/utils/requests";
import Spinner from "./common/Spinner";

const CalendarEdit = async () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const exitEditMode = () => {
    router.push("/dashboard/calendar");
  };

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  const calendars = await fetchCalendarData();
  const sortedData = calendars.sort((a, b) => {
    return new Date(b.days[0]).getMonth() - new Date(a.days[0]).getMonth();
  });

  return (
    <div className="w-full mb-5">
      {!sortedData && <Spinner />}
      {sortedData &&
        sortedData.map((data, index) => (
          <CalendarItem
            key={index}
            //user={user}
            //userData={userData}
            calendar={data}
            //isAdmin={isAdmin}
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
  );
};

export default CalendarEdit;
