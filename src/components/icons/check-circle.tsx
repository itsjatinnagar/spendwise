import SVG, { Path, SvgProps } from "react-native-svg";

export function CheckCircle(props: SvgProps) {
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
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </SVG>
  );
}
