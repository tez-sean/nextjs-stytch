"use client";

import { StytchB2B } from "@stytch/nextjs/b2b";
import {
  AuthFlowType,
  B2BProducts,
  StytchB2BUIConfig,
  StytchEventType,
} from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";

const config: StytchB2BUIConfig = {
  authFlowType: AuthFlowType.PasswordReset,
  products: [B2BProducts.passwords],
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
};

const ResetPassword = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <StytchB2B
          config={config}
          callbacks={{
            onEvent: async ({ type, data }) => {
              if (type === StytchEventType.B2BPasswordResetByEmail)
                router.push("/admin/dashboard");
            },
          }}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
