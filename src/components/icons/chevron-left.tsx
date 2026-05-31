import SVG, { Path, SvgProps } from "react-native-svg";

export function ChevronLeft(props: SvgProps) {
  return (
    <SVG
      width="16"
      height="16"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </SVG>
  );
}
