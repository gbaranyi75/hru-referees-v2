"use client";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import { useEffect, useState } from "react";

const RefereesCard = ({ referee }) => {
  const [validImgUrl, setValidImgUrl] = useState();

  useEffect(() => {
    const checkUrl = async () => {
      if (referee.image !== "") {
        const res = await fetch(referee.image);
        if (res.status === 200) setValidImgUrl(referee.image);
      }
    };
    checkUrl();
  }, [referee]);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl relative pt-4">
      <div className="flex mx-auto py-4 mb-4 justify-center w-1/3" style={{position: "unset !important"}}>
        <Image
          src={validImgUrl || profileDefault}
          alt="User"
          height={0}
          width={0}
          sizes="100vw"
          className="rounded-full mx-auto relative object-contain w-[100%] aspect-square"
          priority
        />
      </div>
      <div className="px-6 pt-2 md:pt-8">
        <div className="text-center lg:text-left mb-2 md:mb-6">
          <div className="text-gray-600 text-sm">Név:</div>
          <h3 className="text-sm md:text-base font-bold">
            {referee.displayName}
          </h3>
        </div>
      </div>
      <div className="py-4 md:p-6 md:pt-0">
        <div className="text-center lg:text-left mb-6">
          <div className="text-gray-600 text-sm">Email:</div>
          <h3 className="text-sm font-bold">{referee.email}</h3>
        </div>
      </div>
    </div>
  );
};
export default RefereesCard;
