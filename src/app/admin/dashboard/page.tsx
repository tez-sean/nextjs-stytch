"use client";
import { useStytchB2BClient } from "@stytch/nextjs/b2b";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const stytch = useStytchB2BClient();
  const router = useRouter();

  const logout = () => {
    stytch.session.revoke();
    router.push("/admin");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-10">Dashboard</div>

      <button className="" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
