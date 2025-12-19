import { DefaultTheme, NativeTheme } from "@react-navigation/native";

const palette = {
  background: "rgb(255,255,255)", // white
  foreground: "rgb(2, 6, 24)", // slate-950
  primary: "rgb(255, 186, 0)", // yellow-600
  surface: "rgb(255, 251, 235)", // yellow-50
  placeholder: "rgb(144, 161, 185)", // slate-400
  danger: "rgb(254, 242, 242)", // red-50
  dangerText: "rgb(193, 0, 7)", // red-700
  success: "rgb(236, 253, 245)", // emerald-50
  successText: "rgb(0, 122, 85)", // emerald-700
  transfer: "rgb(250, 245, 255)", // purple-50
  transferText: "rgb(130, 0, 219)", // purple-700
  refund: "rgb(239, 246, 255)", // blue-50
  refundText: "rgb(20, 71, 230)", // blue-700
};

export const theme: NativeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background,
    primary: palette.primary,
    surface: palette.surface,
    text: palette.foreground,
    placeholder: palette.placeholder,
    danger: palette.danger,
    dangerText: palette.dangerText,
    success: palette.success,
    successText: palette.successText,
    transfer: palette.transfer,
    transferText: palette.transferText,
    refund: palette.refund,
    refundText: palette.refundText,
  },
  fonts: {
    ...DefaultTheme.fonts,
    headline: {
      fontFamily: "Poppins",
      fontSize: 54,
      fontWeight: 800,
      color: palette.foreground,
      lineHeight: 64.8,
    },
    title: {
      fontFamily: "Poppins",
      fontSize: 28,
      fontWeight: 700,
      color: palette.foreground,
      lineHeight: 33.6,
    },
  },
} as const;

import { useTheme } from "@react-navigation/native";

export const useNativeTheme = () => {
  return useTheme() as NativeTheme;
};
