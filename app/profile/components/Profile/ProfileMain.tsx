import ProfileContent from "./content/ProfileContent";

export default async function ProfileMain() {
  return (
    <div className="flex flex-col h-full mx-2 md:mx-4 lg:mx-20 2xl:mx-32">
      <ProfileContent />
    </div>
  );
}
