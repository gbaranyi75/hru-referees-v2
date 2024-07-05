'use client'
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
    <div className="rounded-xl shadow-md hover:shadow-xl relative">
      <div className="flex justify-center">
        <Image
          src={validImgUrl|| profileDefault}
          alt="User"
          height={0}
          width={0}
          sizes="100vw"
          className="h-24 w-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0"
          priority
        />
      </div>
      <div className="px-6 pt-2 md:pt-8">
        <div className="text-center lg:text-left mb-2 md:mb-6">
          <div className="text-gray-600 text-sm">Név:</div>
          <h3 className="text-sm md:text-md md:text-xl font-bold">
            {referee.displayName}
          </h3>
        </div>
      </div>
      <div className="md:p-6 pt-0">
        <div className="text-center lg:text-left mb-6">
          <div className="text-gray-600 text-sm">Email:</div>
          <h3 className="text-sm">{referee.email}</h3>
        </div>
      </div>
    </div>
  );
};
export default RefereesCard;
