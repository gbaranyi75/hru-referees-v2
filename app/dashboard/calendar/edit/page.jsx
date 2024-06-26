import CardLayout from "@/components/CardLayout";
import CalendarEdit from "@/components/CalendarEdit";

const EditCalendarPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-50">
      <CardLayout>
        <CalendarEdit />
      </CardLayout>
    </div>
  );
};

export default EditCalendarPage;
