"use client";

import { useStytchSession, useStytchUser } from "@stytch/nextjs";

const UserProfile = () => {
  const stytch = useStytchSession();
  const user = useStytchUser();

  return (
    <div className="bg-white shadow-lg text-black p-5 rounded-md">
      <div className="mb-3">
        <label className="block font-bold">Name:</label>
        {user.user?.name.first_name} {user.user?.name.last_name}
      </div>

      <div>
        <label className="block font-bold">Email:</label>
        {user.user?.emails[0].email}
      </div>
    </div>
  );
};

export default UserProfile;
