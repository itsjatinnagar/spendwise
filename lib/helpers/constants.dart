import 'package:flutter/material.dart';

const Color primaryColor = Color(0xffF0AA1E);
const Color primaryBackground = Color(0xffFAE0AE);
const Color avatarBackground = Color(0xffFDF2DE);

const LinearGradient accountCardGradient = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [
    Color(0xffF9E49F),
    Color(0xffFDB49E),
  ],
);

final DateTime initialDate = DateTime(2023, 12, 23);
final DateTime today = DateTime(
  DateTime.now().year,
  DateTime.now().month,
  DateTime.now().day,
);
