import { Suspense } from "react";
import Authenticate from "./Authenticate";

const AuthenticatePage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Authenticate />
    </Suspense>
  );
};

export default AuthenticatePage;
