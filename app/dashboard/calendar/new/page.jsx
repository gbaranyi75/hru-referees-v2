import CardLayout from "@/components/CardLayout";
import CalendarNew from "@/components/CalendarNew";

const CreateCalendar = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-50">
      <CardLayout>
        <CalendarNew />
      </CardLayout>
    </div>
  );
};
export default CreateCalendar;
