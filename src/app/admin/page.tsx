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

import * as utils from "@/lib/utils";
import Link from "next/link";

const AdminHome = () => {
  const router = useRouter();
  const redirectUrl = `${utils.getDomainFromWindow()}/admin/authenticate`;

  const config: StytchB2BUIConfig = {
    authFlowType: AuthFlowType.Organization,
    products: [B2BProducts.emailMagicLinks, B2BProducts.passwords],
    emailMagicLinksOptions: {
      loginRedirectURL: redirectUrl,
      signupRedirectURL: redirectUrl,
    },
    passwordOptions: {
      loginRedirectURL: redirectUrl,
      resetPasswordRedirectURL: `${utils.getDomainFromWindow()}/admin/auth/reset-password`,
    },
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  };
  // Apply custom styles to the pre-built UI components
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

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="rou">Admin Home</div>

      <Link href="/admin/profile">Profile</Link>

      <div className="shadow-lg">
        <StytchB2B
          config={config}
          styles={styles}
          callbacks={{
            onEvent: async ({ type, data }) => {
              if (
                type === StytchEventType.B2BMagicLinkAuthenticate ||
                type === StytchEventType.B2BPasswordAuthenticate
              )
                router.push("/admin/dashboard");
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminHome;
