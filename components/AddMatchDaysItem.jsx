"use client";
import { useState, useEffect } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import DisabledButton from "@/components/common/DisabledButton";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlinedButton from "@/components/common/OutlinedButton";

const myDates = ["2024. 09. 22.", "2024. 04. 13."];

const AddMatchDaysItem = ({ calendar, isOpen, toggle }) => {
  const currentDates = calendar.days;
  const [dates, setDates] = useState(currentDates);
  const [eventName, setEventName] = useState(calendar.name);
  const [selectedDates, setSelectedDates] = useState(myDates, ...dates);
  const [edited, setEdited] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [updateCalendar, setUpdateCalendar] = useState({
    name: eventName,
    days: dates,
  });
  const days = dates;
  const calendarId = calendar._id;

  const handleOpenCalendar = (e) => {
    e.preventDefault();
    toggle();
  };

  const handleDateSelect = (date) => {
    let selectedDays = [...selectedDates];

    if (!selectedDays.includes(date)) {
      selectedDays = [...selectedDates, date];
      setIsChecked(true);
    } else {
      selectedDays.splice(selectedDates.indexOf(date), 1);
      setIsChecked(false);
    }
    selectedDays.length > 0 ? setEdited(true) : setEdited(false);
    console.log("selected", selectedDays);
    setSelectedDates(selectedDays);
  };

  const clearAndCloseCard = () => {
    setSelectedDates(myDates);
    toggle();
  };

  return (
    <div className="flex flex-col border-b mx-6 mt-6 bg-white text-gray-600 text-center justify-center z-0">
      <div className="flex md:mx-36 py-5 bg-white text-center justify-center">
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
            {dates.map((day, idx) => {
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
                        ? "inline-flex items-center px-2 py-1 me-2 text-sm text-gray-500 bg-gray-100 rounded dark:bg-gray-200 dark:text-gray-500"
                        : "inline-flex items-center px-2 py-1 me-2 text-sm text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300"
                    }
                  >
                    {day}
                    <button
                      type="button"
                      className={
                        !selectedDates.includes(day)
                          ? "inline-flex items-center p-1 ms-2 text-sm text-gray-500 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-400 dark:hover:text-gray-100"
                          : "inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                      }
                      data-dismiss-target="#badge-dismiss-dark"
                      aria-label="Remove"
                      onClick={() => {
                        console.log("clicked", day);
                        handleDateSelect(day);
                        //setIsChecked((prevState) => !prevState);
                        /* const modifiedArray = dates.filter(
                        (day) => dates.indexOf(day) !== idx
                      );
                      setDates(modifiedArray);
                      setUpdateCalendar((prevState) => ({
                        ...prevState,
                        days: modifiedArray,
                      }));
                      setEdited(true); */
                      }}
                    >
                      {!selectedDates.includes(day) ? (
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
                          <span className="sr-only">Not selected</span>
                        </>
                      ) : (
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
                          <span className="sr-only">Selected</span>
                        </>
                      )}
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row-reverse justify-around mt-5">
            <div className="px-4 py-3 text-center sm:px-6">
              {edited ? (
                <PrimaryButton type={"submit"} text={"Mentés"} />
              ) : (
                <DisabledButton text={"Mentés"} />
              )}
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
              <OutlinedButton
                text={"Vissza"}
                type={"button"}
                onClick={clearAndCloseCard}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AddMatchDaysItem;
