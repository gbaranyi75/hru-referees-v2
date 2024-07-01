"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCurrentUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session) return;
        if (status === "unauthenticated") router.push("/unauthenticated");
        const id = session?.user?.id;
        const res = await fetch(`api/users/${id}`);
        if (res.status === 500) {
          router.push("/error");
        }
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);
  return { user, loading, status };
};
export default useCurrentUser;
