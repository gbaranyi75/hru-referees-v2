import Link from "next/link";

import SideMenu from "@/components/SideMenu";
import CardLayout from "@/components/CardLayout";
import PrimaryButton from "@/components/common/PrimaryButton";

const Dashboard = ({children}) => {
  return (
    <div className="container m-auto max-w-7xl py-5 bg-blue-50">
      <section className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="flex basis-3/4">
          {children}
          {/* <CardLayout>
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
          <div></div> */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
