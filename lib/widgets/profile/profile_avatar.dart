import 'package:flutter/material.dart';
import 'package:spendwise/helpers/helpers.dart';

class ProfileAvatar extends StatelessWidget {
  const ProfileAvatar({
    super.key,
    required this.assetName,
    required this.radius,
  });

  final String assetName;
  final double radius;

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      backgroundColor: avatarBackground,
      foregroundImage: AssetImage(assetName),
      radius: radius,
    );
  }
}
