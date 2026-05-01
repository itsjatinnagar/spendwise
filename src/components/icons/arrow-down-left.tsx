import SVG, { Path, SvgProps } from "react-native-svg";

export function ArrowDownLeft(props: SvgProps) {
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
        d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
      />
    </SVG>
  );
}
