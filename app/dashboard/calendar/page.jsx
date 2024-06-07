"use client";

import Link from "next/link";

import SideMenu from "@/components/Sidemenu";
import CardLayout from "@/components/CardLayout";
import PrimaryButton from "@/components/common/PrimaryButton";

const Calendar = () => {
  return (
    <div className="container m-auto max-w-7xl py-5 bg-blue-50">
      <div className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="basis-3/4">
          <CardLayout>
            <Link href="/dashboard/calendar/new" className="my-6">
              <PrimaryButton
                text={"+ Új létrehozása"}
                //onClick={handleEditMode}
              />
            </Link>
          </CardLayout>
          <CardLayout>
            <Link href="/dashboard/calendar/edit" className="my-6">
              <PrimaryButton
                text={"Szerkesztés"}
                //onClick={handleEditMode}
              />
            </Link>
          </CardLayout>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;