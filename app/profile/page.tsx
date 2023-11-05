import AuthForm from "./components/AuthForm";
const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-4 lg:pt-8">
      {/* logo image or something */}
      <div className="w-52 h-52 bg-white justify-center items-center flex relative mt-3 lg:mt-12">
        <p className="absolute text-4xl">IMAGE</p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Profile;
