import { Suspense } from "react";
import AuthenticateComponent from "./AuthenticateComponent";

const Authenticate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticateComponent />
    </Suspense>
  );
};

export default Authenticate;
