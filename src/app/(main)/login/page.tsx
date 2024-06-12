"use client";

import * as utils from "@/lib/utils";
import { StytchLogin } from "@stytch/nextjs";
import { Products, StyleConfig, StytchLoginConfig } from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
 */
const Login = () => {
  const router = useRouter();
  const redirectUrl = `${utils.getDomainFromWindow()}/login/callback`;

  const config = {
    products: [Products.emailMagicLinks, Products.oauth, Products.otp],
    emailMagicLinksOptions: {
      loginRedirectURL: redirectUrl,
      loginExpirationMinutes: 60,
      signupRedirectURL: redirectUrl,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: "google" }, { type: "apple" }],
      loginRedirectURL: redirectUrl,
      signupRedirectURL: redirectUrl,
    },
    otpOptions: {
      methods: ["sms"],
      expirationMinutes: 10,
    },
  } as StytchLoginConfig;
  const styles: StyleConfig = {
    inputs: {
      borderRadius: "0.375rem",
      borderColor: "#dedede",
      textColor: "#333333",
    },
    buttons: {
      primary: {
        backgroundColor: "rgb(63, 89, 228)",
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
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
      <div className="shadow-lg">
        <StytchLogin
          config={config}
          styles={styles}
          // callbacks={{
          //   onEvent: async ({ type, data }) => {
          //     console.log(`EVENTING: ${type}`);
          //     if (
          //       type === StytchEventType.PasswordAuthenticate ||
          //       type === StytchEventType.OTPsAuthenticate
          //     )
          //       router.push("/location");
          //   },
          // }}
        />
      </div>
    </div>
  );
};

export default Login;
