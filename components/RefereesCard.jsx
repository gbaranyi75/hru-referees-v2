import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";

const RefereesCard = ({ referee }) => {
  return (
    <div className="rounded-xl shadow-md hover:shadow-xl relative">
      <div className="flex justify-center">
        <Image
          src={referee.image || profileDefault}
          alt="User"
          height={0}
          width={0}
          sizes="100vw"
          className="h-24 w-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0"
        />
      </div>
      <div className="px-6 pt-8">
        <div className="text-center lg:text-left mb-6">
          <div className="text-gray-600 text-base">Név:</div>
          <h3 className="text-md md:text-xl font-bold">
            {referee.displayName}
          </h3>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-center lg:text-left mb-6">
          <div className="text-gray-600 text-base">Email:</div>
          <h3 className="text-sm font-bold">{referee.email}</h3>
        </div>
      </div>
    </div>
  );
};
export default RefereesCard;
