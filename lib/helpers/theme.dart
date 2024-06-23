import 'package:flutter/material.dart';
import 'helpers.dart';

final ThemeData themeData = ThemeData(
  appBarTheme: AppBarTheme(
    backgroundColor: Colors.white,
    centerTitle: true,
    elevation: 0.0,
  ),
  brightness: Brightness.light,
  chipTheme: ChipThemeData(
    showCheckmark: false,
  ),
  colorSchemeSeed: primaryColor,
  fontFamily: 'Poppins',
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(),
  ),
  platform: TargetPlatform.android,
  scaffoldBackgroundColor: Colors.white,
  useMaterial3: true,
);
