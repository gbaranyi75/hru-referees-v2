"use client";
import { useState, useEffect } from "react";
import RefereesCard from "./RefereesCard";
import Spinner from "./common/Spinner";

const Referees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/users");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return loading ? (
    <Spinner loading={loading}/>
  ) : (
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
