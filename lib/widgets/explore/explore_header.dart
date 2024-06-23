import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../managers/managers.dart';

class ExploreHeader extends StatelessWidget {
  const ExploreHeader({super.key});

  String greet() {
    final DateTime now = DateTime.now();
    if (now.hour < 12) {
      return 'Morning';
    } else if (now.hour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Good ${greet()},'),
            Consumer<UserManager>(
              builder: (context, manager, child) => Text(manager.user!.name),
            ),
          ],
        ),
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.notifications_none_rounded),
        ),
      ],
    );
  }
}
