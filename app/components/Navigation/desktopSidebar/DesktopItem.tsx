import Link from "next/link";

type DesktopItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
};

export default function DesktopItem({
  href,
  label,
  icon: Icon,
  active,
}: DesktopItemProps) {
  return (
    <div>
      <Link
        href={href}
        className="
          group flex relative gap-x-3 py-5 center items-center rounded-md px-4 hover:brightness-110 transition"
      >
        <Icon className={`h-5 w-5 font-medium`} />
        <p>{label}</p>
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute w-full h-1 bg-orange-500/75 bottom-0 left-0`}
        />
      </Link>
    </div>
  );
}
