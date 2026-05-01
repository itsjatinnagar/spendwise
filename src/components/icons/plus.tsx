import SVG, { Path, SvgProps } from "react-native-svg";

export function Plus(props: SvgProps) {
  return (
    <SVG
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      height="28"
      width="28"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </SVG>
  );
}
