import SignupForm from "@/components/SignupForm";
import PageLayout from "@/components/common/PageLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2 md:mb-10">Regisztráció</h1>
      <SignupForm />
    </PageLayout>
  );
};
export default SignUpPage;
