import SVG, { Path, SvgProps } from "react-native-svg";

export function ArrowUpRight(props: SvgProps) {
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
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </SVG>
  );
}
