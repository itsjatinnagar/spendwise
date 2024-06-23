import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../managers/managers.dart';
import '../widgets.dart';

class ProfileCard extends StatelessWidget {
  const ProfileCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<UserManager>(
      builder: (context, manager, child) => SizedBox(
        width: double.infinity,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(height: 40.0),
            ProfileAvatar(
              assetName: manager.user!.gender == 'male'
                  ? 'assets/images/avatar_male.png'
                  : 'assets/images/avatar_female.png',
              radius: 60,
            ),
            SizedBox(height: 10.0),
            Text(manager.user!.name),
            SizedBox(height: 6.0),
            Text('+91-${manager.user!.number}'),
            SizedBox(height: 2.0),
            Text(manager.user!.email),
          ],
        ),
      ),
    );
  }
}
