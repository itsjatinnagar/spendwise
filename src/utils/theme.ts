import { DefaultTheme, NativeTheme } from "@react-navigation/native";

const palette = {
  background: "rgb(255,255,255)", // white
  foreground: "rgb(2, 6, 24)", // slate-950
  primary: "rgb(255, 186, 0)", // yellow-600
  surface: "rgb(255, 251, 235)", // yellow-50
  placeholder: "rgb(144, 161, 185)", // slate-400
  danger: "rgb(254, 242, 242)", // red-50
  dangerForeground: "rgb(193, 0, 7)", // red-700
  success: "rgb(236, 253, 245)", // emerald-50
  successForeground: "rgb(0, 122, 85)", // emerald-700
};

export const theme: NativeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background,
    foreground: palette.foreground,
    primary: palette.primary,
    surface: palette.surface,
    text: palette.foreground,
    placeholder: palette.placeholder,
    danger: palette.danger,
    dangerForeground: palette.dangerForeground,
    success: palette.success,
    successForeground: palette.successForeground,
  },
  fonts: {
    ...DefaultTheme.fonts,
    headline: { fontSize: 54, fontWeight: 800, color: palette.foreground },
    title: { fontSize: 28, fontWeight: 700, color: palette.foreground },
  },
} as const;

import { useTheme } from "@react-navigation/native";

export const useNativeTheme = () => {
  return useTheme() as NativeTheme;
};
