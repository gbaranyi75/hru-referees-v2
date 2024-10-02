"use client";
import { useState } from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import { mailAction } from "@/actions/mailAction";
import Spinner from "./common/Spinner";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  //console.log(domain)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await mailAction({ email, domain });
    //console.log(res);
    if (res) {
      setEmailSent(true);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  if (loading) return <Spinner />;

  return (
    <figure className="flex">
      <div className="w-full max-w-md mx-4 md:mx-auto mt-16 bg-white rounded-lg border border-primaryBorder shadow-default pt-10 pb-5 px-1">
        <div className="text-primary mx-6">
          {!emailSent && (
            <form onSubmit={handleSubmit}>
              <label className="flex flex-col text-sm mb-1 text-left">
                Email:
                <input
                  name="email"
                  type="email"
                  autoComplete="true"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                />
              </label>
              {error && (
                <p className="text-red-500 text-sm">
                  Ezt az email címet nem találjuk. Kérlek, add meg újra!
                </p>
              )}

              <div className="flex items-center mt-3 mb-3 justify-center">
                <PrimaryButton type={"submit"} text={"Küldés"} />
              </div>
            </form>
          )}
          {emailSent && (
            <div className="pb-5 px-5">
              <p className="text-sm">
                A jelszó helyreállításához szükséges linket elküldtük a megadott
                email címre.
              </p>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
};
export default ResetPassword;
