import LoginForm from "@/components/LoginForm";
import PageLayout from "@/components/common/PageLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (session?.user) redirect("/");
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2 md:mb-10">Belépés</h1>
      <LoginForm />
    </PageLayout>
  );
};
export default LoginPage;
