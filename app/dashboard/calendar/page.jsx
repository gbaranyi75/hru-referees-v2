//"use client";
import Link from "next/link";
import CardLayout from "@/components/CardLayout";
import PrimaryButton from "@/components/common/PrimaryButton";

const Calendar = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-50">
      <div className="w-full">
        <CardLayout>
          <Link href="/dashboard/calendar/new" className="my-6">
            <PrimaryButton
              text={"Új létrehozása"}
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
  );
};

export default Calendar;
