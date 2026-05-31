import SVG, { Path, SvgProps } from "react-native-svg";

export function Pie(props: SvgProps) {
  return (
    <SVG
      width="24"
      height="24"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
      />
    </SVG>
  );
}
