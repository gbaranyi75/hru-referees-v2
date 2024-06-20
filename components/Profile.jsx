"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "./common/Spinner";
import DisabledButton from "./common/DisabledButton";
import OutlinedButton from "./common/OutlinedButton";
import PrimaryButton from "./common/PrimaryButton";
import { updateUserData } from "@/utils/requests";

const Profile = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileEmail = session?.user?.email;
  const userId = session?.user?.id;

  const [userData, setUserData] = useState();
  const [displayName, setDisplayName] = useState({ displayName: "" });
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/users/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setUserData(data);
          setDisplayName(data.displayName);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserData(userId);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    try {
      const res = await updateUserData(userId, { name: displayName });

      if (res.status === 200) {
        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  const handleChange = (e) => {
    setDisplayName(e.target.value);
    if (e.target.value !== "") {
      setEdited(true);
    }
  };

  const handleCancel = () => {
    setDisplayName(userData.displayName);
    setEdited(false);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="bg-white px-10 py-12 mt-6 md:mt-10 shadow-md rounded-md border">
      <div className="flex flex-col md:flex-row">
        <div className="w-1/3 mx-auto justify-center">
          <div className="flex mb-4 justify-center">
            <Image
              className="h-32 w-32 xl:h-48 xl:w-48 rounded-full mx-auto"
              src={profileImage || profileDefault}
              width={150}
              height={150}
              alt="User"
            />
          </div>
          <h2 className="text-base mb-4">
            <span className="font-bold block">Név: </span>{" "}
            {userData.displayName}
          </h2>
          <h2 className="text-base">
            <span className="font-bold block">Email: </span> {profileEmail}
          </h2>
        </div>

        <div className="w-full mt-5 md:mx-12 xl:mx-32 md:mt-0 bg-white md:text-left">
          <form onSubmit={handleSubmit}>
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
                {edited ? (
                  <PrimaryButton type={"submit"} text={"Mentés"} />
                ) : (
                  <DisabledButton text={"Mentés"} />
                )}
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
      </div>
    </div>
  );
};
export default Profile;
