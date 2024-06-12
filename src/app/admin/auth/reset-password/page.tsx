"use client";

import { StytchB2B } from "@stytch/nextjs/b2b";
import {
  AuthFlowType,
  B2BProducts,
  StyleConfig,
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
const styles: StyleConfig = {
  inputs: {
    borderRadius: "0.375rem",
    borderColor: "#dedede",
    textColor: "#333333",
  },
  buttons: {
    primary: {
      backgroundColor: "#6379df",
      borderColor: "rgb(255, 255, 255)",
      borderRadius: "0.375rem",
      textColor: "#fff",
    },
  },
  colors: {
    primary: "rgb(25, 25, 25)",
  },
  container: {
    borderColor: "rgb(255,255,255)",
  },
  logo: {
    logoImageUrl: "/chunky-monkey-logo.png",
  },
};

const ResetPassword = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <StytchB2B
          config={config}
          styles={styles}
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
