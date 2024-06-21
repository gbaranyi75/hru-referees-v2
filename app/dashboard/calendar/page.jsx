import Link from "next/link";
import CardLayout from "@/components/CardLayout";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlinedButton from "@/components/common/OutlinedButton";

const Calendar = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-50">
      <div className="w-full">
        <CardLayout>
          <Link href="/dashboard/calendar/new" className="my-6">
            <OutlinedButton
              text={"Új létrehozása"}
            />
          </Link>
        </CardLayout>
        <CardLayout>
          <Link href="/dashboard/calendar/edit" className="my-6">
            <OutlinedButton
              text={"Szerkesztés"}
            />
          </Link>
        </CardLayout>
        <div></div>
      </div>
    </div>
  );
};

export default Calendar;
