import Profile from "@/components/Profile";
import PageLayout from "@/components/common/PageLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2">Profilom</h1>
      <Profile />
    </PageLayout>
  );
};
export default ProfilePage;
