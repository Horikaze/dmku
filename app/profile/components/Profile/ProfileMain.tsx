import ProfileContent from "./content/ProfileContent";
import ProfileSideLeft from "./sideNav/ProfileSideNav";

export default async function ProfileMain() {
  return (
    <div className="flex flex-row h-full w-full">
      <ProfileSideLeft />
      <ProfileContent />
    </div>
  );
}
