"use client";
import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/b2b";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const stytch = useStytchB2BClient();
  const { member: user } = useStytchMember();

  const logout = () => {
    stytch.session.revoke().then((res) => router.push("/admin"));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-black">
      <div className="mb-10">Dashboard</div>

      <button className="" onClick={logout}>
        Sign Out
      </button>

      <div className="mt-5 mb-2">Your roles:</div>

      <code className="bg-gray-900 p-3 text-white">
        {user?.roles.map((r) => (
          <div key={r.role_id}>{r.role_id}</div>
        ))}
      </code>
    </div>
  );
};

export default Dashboard;
