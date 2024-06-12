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

const AdminHome = () => {
  const router = useRouter();
  const redirectUrl = `${utils.getDomainFromWindow()}/admin/auth/callback`;
  // Hack to show logo (setting in Org doesn't seem to do anything)
  const org = utils.getSubdomainFromWindow() ?? "chunky-monkey";

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
      logoImageUrl: `/logos/${org}.png`,
    },
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-black">
      <div className=" mb-5">Admin Home</div>

      <div className="shadow-lg">
        <StytchB2B
          config={config}
          styles={styles}
          callbacks={{
            onEvent: async ({ type, data }) => {
              console.log(`was I called? (${type})`);
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
