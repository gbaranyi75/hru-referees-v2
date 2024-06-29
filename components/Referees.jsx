"use client";

import RefereesCard from "./RefereesCard";
import Spinner from "./common/Spinner";
import useUsers from "@/hooks/useUsers";

const Referees = () => {
  const { users, loading } = useUsers();

  if (loading) return <Spinner />;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <RefereesCard key={user._id} referee={user} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Referees;
