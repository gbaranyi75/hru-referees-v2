import Image from "next/image";

const RefereesCard = ({ referee }) => {
  return (
      <div className="rounded-xl shadow-md relative">
        <div className="flex justify-center">

        <Image
          src={referee.image}
          alt="User"
          height={0}
          width={0}
          sizes="100vw"
          className='h-24 w-24 md:w-32 md:h-32 rounded-full mx-auto md:mx-0'
          />
          </div>
        <div className="px-6 pt-8">
          <div className="text-left md:text-center lg:text-left mb-6">
          <div className='text-gray-600'>Név:</div>
            <h3 className="text-xl font-bold">{referee.displayName}</h3>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-left md:text-center lg:text-left mb-6">
          <div className='text-gray-600'>Email:</div>
            <h3 className="text-base font-bold">{referee.email}</h3>
          </div>
        </div>
      </div>
  );
};
export default RefereesCard;
