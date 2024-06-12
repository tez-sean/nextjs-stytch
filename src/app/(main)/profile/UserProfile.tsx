"use client";

import { useStytchSession, useStytchUser } from "@stytch/nextjs";

const UserProfile = () => {
  const stytch = useStytchSession();
  const user = useStytchUser();

  return (
    <div className="bg-white shadow-lg text-black p-5 rounded-md">
      <div>
        {user.user?.name.first_name} {user.user?.name.last_name}
      </div>
    </div>
  );
};

export default UserProfile;
