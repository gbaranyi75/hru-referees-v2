import SideMenu from "@/components/Sidemenu";
import CardLayout from "@/components/CardLayout";
import CalendarEdit from "@/components/CalendarEdit";
import { fetchCalendarData } from "@/utils/requests";

const EditCalendar = async () => {
  const calendars = await fetchCalendarData();

  return (
    <div className="container m-auto max-w-7xl py-5 bg-blue-50">
      <div className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="basis-3/4">
          <CalendarEdit calendars={calendars} />
        </div>
      </div>
    </div>
  );
};
export default EditCalendar;
