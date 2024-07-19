"use client";
import { useState, useEffect } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { updateCalendarData } from "@/utils/requests";
import OutlinedButton from "@/components/common/OutlinedButton";

const AddMatchDaysItem = ({
  session,
  calendar,
  isOpen,
  toggle,
  displayName,
}) => {
  const userID = session?.user?.id;
  const eventName = calendar.name;
  const currentUserSelections = calendar.userSelections;
  const [myCurrentDates, setMyCurrentDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState(
    myCurrentDates,
    ...calendar.days,
  );

  const calendarId = calendar._id;

  const setMyDays = () => {
    let days = [];
    currentUserSelections.map((current) => {
      if (!current.userId || current.userId === userID) {
        days.push(current.selectedDays);
        setSelectedDates(current.selectedDays);
      }
      setMyCurrentDates(days);
    });
  };

  const handleOpenCalendar = (e) => {
    e.preventDefault();
    toggle();
  };

  const clearAndCloseCard = (e) => {
    e.preventDefault();
    toggle();
  };

  const handleDateSelect = async (date) => {
    let selectedDays = [...selectedDates];

    if (!selectedDays.includes(date)) {
      selectedDays = [...selectedDates, date];
    } else {
      selectedDays.splice(selectedDates.indexOf(date), 1);
    }
    setSelectedDates(selectedDays);

    const element = currentUserSelections.find((e) => e.userId === userID);

    if (element) {
      element.selectedDays = selectedDays;
      element.userName = displayName;
    } else {
      currentUserSelections.push({
        selectedDays: selectedDays,
        userName: displayName,
        userId: userID,
      });
    }

    await updateCalendarData(calendarId, {
      userSelections: currentUserSelections,
    });
  };

  useEffect(() => {
    setMyDays();
  }, [session]);

  return (
    <div className="flex flex-col border-b md:mx-6 mt-5 bg-white text-gray-600  drop-shadow-md hover:drop-shadow-xl text-center justify-center z-0">
      <div className="flex md:mx-36 py-6 bg-white text-center justify-center">
        <span>
          <h2 className="text-lg mr-1 font-semibold">{eventName}</h2>
        </span>
        <span className="my-auto cursor-pointer" onClick={handleOpenCalendar}>
          {!isOpen ? (
            <MdOutlineExpandMore size={24} />
          ) : (
            <MdOutlineExpandLess size={24} />
          )}
        </span>
      </div>
      {isOpen && (
        <>
          <div className="md:max-w-4xl flex md:flex-row flex-col flex-wrap md:justify-center md:mx-auto my-4">
            {calendar.days.map((day, idx) => {
              return (
                <div className="flex my-2 mx-auto md:mx-0" key={idx}>
                  <span
                    id={
                      !selectedDates.includes(day)
                        ? "badge-dark"
                        : "badge-green"
                    }
                    className={
                      !selectedDates.includes(day)
                        ? "inline-flex items-center px-3 py-1 me-2 text-sm text-gray-600 bg-gray-300 rounded-full"
                        : "inline-flex items-center px-3 py-1 me-2 text-sm rounded-full bg-green-900 text-green-300"
                    }
                  >
                    {day}
                    <button
                      type="button"
                      className={
                        !selectedDates.includes(day)
                          ? "inline-flex items-center p-1 ms-2 text-sm text-gray-600 bg-transparent rounded-sm hover:bg-gray-400 hover:text-gray-50"
                          : "inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-800 hover:text-green-100"
                      }
                      data-dismiss-target="#badge-dismiss-dark"
                      aria-label="Remove"
                      onClick={() => {
                        handleDateSelect(day);
                      }}
                    >
                      {!selectedDates.includes(day) ? (
                        <>
                          <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                          <span className="sr-only">Not selected</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-2 h-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>

                          <span className="sr-only">Selected</span>
                        </>
                      )}
                    </button>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex mx-auto mb-4 px-4 py-3 text-center sm:px-6">
            <OutlinedButton
              text={"Vissza"}
              type={"button"}
              onClick={clearAndCloseCard}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default AddMatchDaysItem;
