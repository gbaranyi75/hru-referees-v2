"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, getProviders } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Spinner from "@/components/common/Spinner";
import PrimaryButton from "@/components/common/PrimaryButton";
import LinkButton from "@/components/common/LinkButton";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "react-toastify";

const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [providers, setProviders] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { email, password } = formFields;

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formFields.email;
    const password = formFields.password;

    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
    if (signInData?.error) {
      console.error(signInData.error);
      toast.error(signInData.error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const signInData = await signIn("google", {
      callbackUrl: "/",
    });
    if (signInData?.error) {
      console.error(signInData.error);
      toast.error(signInData.error);
    }
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (session) router.push("/");

  return (
    <figure className="flex">
      <div className="w-full max-w-md mx-4 md:mx-auto mt-16 bg-white rounded-lg border border-primaryBorder shadow-default pt-10 pb-5 px-1">
        <div className="text-primary mx-6">
          <form onSubmit={handleSubmit}>
            <label className="flex flex-col text-sm mb-1 text-left">
              Email:
              <input
                name="email"
                type="email"
                autoComplete="true"
                required
                value={email}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
            </label>
            <label className="flex flex-col text-sm mb-1 text-left">
              Jelszó:
              <input
                name="password"
                type="password"
                autoComplete="true"
                required
                value={password}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
            </label>
            <div className="flex items-center mt-3 mb-3 justify-center">
              <PrimaryButton type={"submit"} text={"Belépés email címmel"} />
            </div>
          </form>
          <div className="flex items-center mt-3 mb-5 text-sm justify-center">
            <LinkButton
              link={"/auth/regisztracio"}
              text={"Nincs még fiókod? Készítsd el!"}
            />
          </div>
          <hr />
          <div className="flex items-center mt-5 justify-center">
            {!providers && (
              <LoadingComponent
                text={"Betöltés..."}
                textColor={"text-gray-400"}
              />
            )}
            {providers && (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center py-2 px-4 border text-md border-blue-200 text-blue-400 hover:border-blue-300 hover:text-blue-500 shadow-sm font-medium rounded-md"
              >
                <FaGoogle className="text-blue-500 mr-3" />
                <span>Belépés Google fiókkal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default LoginForm;
