"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import DisabledButton from "./common/DisabledButton";
import OutlinedButton from "./common/OutlinedButton";
import PrimaryButton from "./common/PrimaryButton";
import { toast } from "react-toastify";
import Spinner from "./common/Spinner";
import useCurrentUser from "@/hooks/useCurrentUser";

const Profile = () => {
  const { user, loading } = useCurrentUser();
  const userId = user?.id;

  const [userData, setUserData] = useState({});
  const [displayName, setDisplayName] = useState();

  useEffect(() => {
    setUserData(user);
    setDisplayName(user?.displayName);
  }, [user]);

  const updateDisplayName = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          displayName: displayName,
        }),
      });

      if (res.status === 200) {
        toast.success("Sikeres mentés");
      } else {
        toast.error("Sikertelen mentés");
      }
    } catch (error) {
      console.error(error);
      toast.error("Valami hiba történt");
    }
  };

  const handleChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleCancel = () => {
    setDisplayName(userData.displayName);
  };

  if (loading) return <Spinner />;

  return (
    <div className="bg-white px-10 py-12 mt-6 md:mt-10 shadow-md rounded-md border">
      <div className="flex flex-col md:flex-row">
        <>
          <div className="w-2/3 md:w-1/3 mx-auto justify-center text-center">
            <div className="flex mb-4 justify-center">
              <Image
                className="h-20 w-20 md:w-32 md:h-32 xl:h-48 xl:w-48 rounded-full mx-auto"
                src={userData?.image || profileDefault}
                width={150}
                height={150}
                alt="User"
                priority={true}
              />
            </div>
            <h2 className="text-base mb-4">
              <span className="font-bold block">Név: </span> {displayName}
            </h2>
            <h2 className="text-base">
              <span className="font-bold block">Email: </span> {userData?.email}
            </h2>
          </div>
          <div className="w-full mt-5 md:mx-12 xl:mx-32 md:mt-0 bg-white md:text-left">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium ml-1 mb-2"
                      >
                        Név módosítása:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={displayName}
                        id="name"
                        autoComplete="name"
                        required
                        className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border border-indigo-50 rounded-md"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-10 px-4 py-3 text-center sm:px-6">
                  <PrimaryButton
                    type={"button"}
                    text={"Mentés"}
                    onClick={() => updateDisplayName(userData?._id)}
                  />
                </div>
                <div className="mb-5 md:mb-10 px-4 py-3 text-center sm:px-6">
                  <OutlinedButton
                    type={"button"}
                    text={"Mégsem"}
                    onClick={handleCancel}
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};
export default Profile;
