"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CalendarItem from "./CalendarItem";
import CardLayout from "@/components/CardLayout";
import Spinner from "@/components/common/Spinner";
import OutlinedButton from "@/components/common/Outlinedbutton";

const CalendarEdit = ({ calendars }) => {
  //const { user, userData } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const exitEditMode = () => {
    router.push("/dashboard/calendar");
  };

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id));

  useEffect(() => {
    setLoading(false);
  }, [calendars]);

  return (
    <div className="mb-5">
      {loading && <Spinner loading={loading} />}
      {!loading && (
        <CardLayout>
          {calendars.map((data, index) => (
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
        </CardLayout>
      )}
    </div>
  );
};

export default CalendarEdit;
