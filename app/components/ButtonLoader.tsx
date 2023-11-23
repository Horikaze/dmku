import { useTheme } from "next-themes";
import PulseLoader from "react-spinners/PulseLoader";

type ButtonLoaderProps = {
  loading: boolean;
};
export default function ButtonLoader({ loading }: ButtonLoaderProps) {
  const { theme } = useTheme();
  return (
    <PulseLoader
      size={6}
      color={theme === "light" ? "white" : "black"}
      loading={loading}
      className="pr-2"
    />
  );
}
