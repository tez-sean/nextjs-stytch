const LoginError = ({ params }: { params: any }) => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-red-500">Danger Will Robinson!</div>
      <p className="py-5 text-black">
        The magic link could not be authenticaed because it was either already
        used or expired.
      </p>
    </div>
  );
};

export default LoginError;
