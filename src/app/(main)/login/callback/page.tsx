import { Suspense } from "react";
import Authenticate from "./Callback";

const LoginCallback = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Authenticate />
    </Suspense>
  );
};

export default LoginCallback;
