"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import checkedImage from "@/assets/images/checked.png";
import unCheckedImage from "@/assets/images/unchecked.png";

const SpreadSheetItem = ({ calendar, isOpen, toggle }) => {
  const [currentDates, setCurrentDates] = useState(calendar.days);
  const [userSelections, setUserSelection] = useState(calendar.userSelections);

  const handleOpenSpreadSheet = (e) => {
    e.preventDefault();
    toggle();
  };

  return (
    <div className="flex flex-col border-b mx-6 mt-5 bg-white text-gray-600 text-center drop-shadow-md hover:drop-shadow-xl justify-center z-0">
      <div className="flex md:mx-36 py-6 bg-white text-center justify-center">
        <span>
          <h2 className="text-lg mr-1 font-semibold">{calendar.name}</h2>
        </span>
        <span
          className="my-auto cursor-pointer"
          onClick={handleOpenSpreadSheet}
        >
          {!isOpen ? (
            <MdOutlineExpandMore size={24} />
          ) : (
            <MdOutlineExpandLess size={24} />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-5 mb-10 md:justify-center overflow-x-auto relative z-1">
          <table className="max-w-5xl shadow-md sm:rounded-lg text-sm text-center text-gray-500 mx-auto border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="py-2 px-6 text-center">
                  Név
                </th>
                {currentDates.map((date) => (
                  <th scope="col" className="py-3 px-2 text-center" key={date}>
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userSelections.map((user, idx) => (
                <tr key={idx} className="bg-white border-b border-gray-300">
                  <th className="p-2 text-center">{user.userName}</th>
                  {currentDates.map((date) => (
                    <td key={date} className="px-1 text-center">
                      <div className="flex justify-center">
                        {user.selectedDays.includes(date) ? (
                          <Image
                            className="h-4 w-4"
                            src={checkedImage}
                            alt="logo"
                            width={10}
                            height={10}
                            priority
                          />
                        ) : (
                          <Image
                            className="h-4 w-4"
                            src={unCheckedImage}
                            alt="logo"
                            width={10}
                            height={10}
                            priority
                          />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default SpreadSheetItem;
