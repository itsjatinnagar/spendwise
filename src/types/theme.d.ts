import { Theme } from "@react-navigation/native";
import { ColorValue, TextStyle } from "react-native";

declare module "@react-navigation/native" {
  export type NativeTheme = Theme & {
    colors: {
      surface: ColorValue;
      placeholder: ColorValue;
      danger: ColorValue;
      dangerText: ColorValue;
      success: ColorValue;
      successText: ColorValue;
      transfer: ColorValue;
      transferText: ColorValue;
      refund: ColorValue;
      refundText: ColorValue;
    };
    fonts: {
      headline: TextStyle;
      title: TextStyle;
    };
  };
}
