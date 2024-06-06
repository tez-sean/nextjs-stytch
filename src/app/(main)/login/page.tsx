"use client";

import * as utils from "@/lib/utils";
import { StytchLogin } from "@stytch/nextjs";
import { Products, StytchEventType } from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
 */
const Login = () => {
  const router = useRouter();

  const styles = {
    container: {
      width: "100%",
    },
    buttons: {
      primary: {
        backgroundColor: "#4A37BE",
        borderColor: "#4A37BE",
      },
    },
  };

  const config = {
    products: [
      Products.emailMagicLinks,
      Products.oauth,
      Products.otp,
      Products.passwords,
    ],
    emailMagicLinksOptions: {
      loginRedirectURL: utils.getDomainFromWindow() + "/authenticate",
      loginExpirationMinutes: 60,
      signupRedirectURL: utils.getDomainFromWindow() + "/authenticate",
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: "google" }, { type: "apple" }],
      loginRedirectURL: utils.getDomainFromWindow() + "/authenticate",
      signupRedirectURL: utils.getDomainFromWindow() + "/authenticate",
    },
    otpOptions: {
      methods: ["sms"],
      expirationMinutes: 10,
    },
    passwordOptions: {
      loginRedirectURL: utils.getDomainFromWindow() + "/authenticate",
      loginExpirationMinutes: 60,
      resetPasswordRedirectURL: utils.getDomainFromWindow() + "/authenticate",
      resetPasswordExpirationMinutes: 60,
    },
  } as Parameters<typeof StytchLogin>[0]["config"];

  return (
    <div className="flex flex-col justify-center items-center bg-purple-300 h-screen">
      <StytchLogin
        config={config}
        styles={styles}
        callbacks={{
          onEvent: async ({ type, data }) => {
            console.log(`EVENTING: ${type}`);
            if (
              type === StytchEventType.PasswordAuthenticate ||
              type === StytchEventType.OTPsAuthenticate
            )
              router.push("/location");
          },
        }}
      />
    </div>
  );
};

export default Login;
