"use client";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useRouter } from "next/navigation";

const Location = () => {
  const stytch = useStytch();
  const router = useRouter();
  const { session, isInitialized } = useStytchSession();

  const login = () => router.push("/login");
  const logout = () => {
    stytch.session.revoke().then((res) => {
      router.push("/login");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-purple-600 h-screen">
      <h3 className="mb-5">Location</h3>

      {session && isInitialized && (
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={logout}
        >
          Sign Out
        </button>
      )}

      {!session && isInitialized && (
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={login}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Location;
