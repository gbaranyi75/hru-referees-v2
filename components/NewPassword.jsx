"use client";
import { useState } from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import { toast } from "react-toastify";
import { updatePassword } from "@/actions/updatePassword";

const NewPassword = ({ params }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //console.log(params.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(password);
    if (newPassword !== confirmPassword) {
      toast.error("A jelszavaknak meg kell egyezniük");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("A jelszó legalább 8 karakter legyen");
      return;
    }
    await updatePassword({ newPassword, token: params.token });
  };

  return (
    <figure className="flex">
      <div className="w-full max-w-md mx-4 md:mx-auto mt-16 bg-white rounded-lg border border-primaryBorder shadow-default pt-10 pb-5 px-1">
        <div className="text-primary mx-6">
          <form onSubmit={handleSubmit}>
            <label className="flex flex-col text-sm mb-1 text-left">
              Új jelszó:
              <input
                name="password"
                type="password"
                autoComplete="true"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(prev => e.target.value)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
            </label>
            <label className="flex flex-col text-sm mb-1 text-left">
              Új jelszó mégegyszer:
              <input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(prev => e.target.value)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
            </label>
            <div className="flex items-center mt-3 mb-3 justify-center">
              <PrimaryButton type={"submit"} text={"Küldés"} />
            </div>
          </form>
        </div>
      </div>
    </figure>
  );
};
export default NewPassword;
