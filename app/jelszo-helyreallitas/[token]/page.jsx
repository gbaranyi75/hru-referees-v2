import PageLayout from "@/components/common/PageLayout";
import NewPassword from "@/components/NewPassword";

const ResetPasswordPage = ({params}) => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-2 md:mb-10">Új jelszó megadása</h1>
      <NewPassword params={params}/>
    </PageLayout>
  );
};
export default ResetPasswordPage;
