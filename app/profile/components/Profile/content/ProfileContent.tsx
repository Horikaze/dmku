import ProfileBanner from "./components/ProfileBanner";

export default async function ProfileContent() {
  return (
    <div className="flex w-full h-full flex-col">
      <ProfileBanner />
      <p className="p-10 text-white">MainContetnt</p>
    </div>
  );
}
