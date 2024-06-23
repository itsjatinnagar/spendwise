import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../managers/managers.dart';

class AccountListHeader extends StatelessWidget {
  const AccountListHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text('Accounts'),
        TextButton.icon(
          iconAlignment: IconAlignment.end,
          onPressed: Provider.of<RouterManager>(
            context,
            listen: false,
          ).goToManageAccount,
          label: Text('See All'),
          icon: Icon(
            Icons.arrow_forward_ios_rounded,
            size: 16.0,
          ),
        ),
      ],
    );
  }
}
