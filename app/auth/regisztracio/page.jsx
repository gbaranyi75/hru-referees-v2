"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, getProviders } from "next-auth/react";
import PageLayout from "@/components/common/PageLayout";
import PrimaryButton from "@/components/common/PrimaryButton";
import { toast } from "react-toastify";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = formFields.displayName;
    const email = formFields.email;
    const password = formFields.password;

    try {
      if (password !== confirmPassword) {
        toast.error("A jelszavaknak meg kell egyezniük");
        return;
      }
      if (password.length < 8) {
        toast.error("A jelszó legalább 8 karakter legyen");
        return;
      }
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        const signInData = await signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/",
          redirect: false,
        });
        toast.success("Sikeres regisztráció");
        if (signInData?.error) {
          console.error(signInData.error);
        } else {
          router.refresh();
          router.push("/");
        }
      }
    } catch (err) {
      setErr(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <PageLayout>
      <figure className="flex">
        <div className="w-full max-w-md mx-auto mt-16 md:mt-36 bg-white rounded-lg border border-primaryBorder shadow-default pt-10 pb-5 px-1">
          <div className="text-primary mx-6">
            <form onSubmit={handleSubmit}>
              <label className="flex text-sm mb-1 ml-1 text-left">Név:</label>
              <input
                name="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
              <label className="flex text-sm mb-1 ml-1 text-left">Email:</label>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
              <label className="flex text-sm mb-1 ml-1 text-left">
                Jelszó:
              </label>
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
              <label className="flex text-sm mb-1 ml-1 text-left">
                Jelszó újra:
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
              <div className="flex items-center mt-3 mb-3 justify-center">
                <PrimaryButton type={"submit"} text={"Regisztráció"} />
              </div>
            </form>
            {err && "Something went wrong!"}
          </div>
        </div>
      </figure>
    </PageLayout>
  );
};

export default RegisterPage;
