import Link from "next/link";

const AdminProfile = () => {
  return (
    <div className="h-screen">
      <div>Admin Profile</div>

      <Link href="/admin">Home</Link>
    </div>
  );
};

export default AdminProfile;
