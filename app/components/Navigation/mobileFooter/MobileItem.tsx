
import Link from "next/link";

type MobileItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
};

export default function MobileItem({
  href,
  label,
  icon: Icon,
  active,
}: MobileItemProps) {
  return (
    <div className="w-full">
      <Link
        href={href}
        className="
          group relative flex flex-col p-3 gap-y-1 items-center  hover:brightness-125 transition"
      >
        <Icon className={`h-5 w-5 font-medium`} />
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute h-1 w-full bg-orange-500 top-0 left-0`}
        />
        <p className="text-sm">{label}</p>
      </Link>
    </div>
  );
}
