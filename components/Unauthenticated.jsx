"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/common/PrimaryButton";

const Unauthenticated = () => {
  const router = useRouter();

  return (
    <>
      <h1 className="text-red-500 text-xl my-16 font-semibold">
        Az oldal megtekintéséhez be kell jelentkezned!
      </h1>
      <PrimaryButton
        onClick={() => router.push("/")}
        className="w-full mt-2"
        text={"Vissza a főoldalra"}
      />
    </>
  );
};

export default Unauthenticated;
