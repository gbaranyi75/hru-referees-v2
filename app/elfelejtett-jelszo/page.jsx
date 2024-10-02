import ResetPassword from "@/components/ResetPassword";
import PageLayout from "@/components/common/PageLayout";

const ResetPasswordPage = () => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2 md:mb-10">Elfelejtett jelszó</h1>
      <ResetPassword />
    </PageLayout>
  );
};
export default ResetPasswordPage;
