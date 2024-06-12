import { Suspense } from "react";
import AdminCallbackComponent from "./AdminCallbackComponent";

const AdminCallback = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminCallbackComponent />
    </Suspense>
  );
};

export default AdminCallback;
