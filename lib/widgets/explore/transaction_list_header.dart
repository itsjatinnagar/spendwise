import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../managers/managers.dart';

class TransactionListHeader extends StatelessWidget {
  const TransactionListHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text("Today's Transactions"),
        TextButton.icon(
          onPressed: Provider.of<RouterManager>(
            context,
            listen: false,
          ).goToCreateTransaction,
          label: Text('Add'),
          icon: Icon(
            Icons.add,
            size: 16.0,
          ),
        ),
      ],
    );
  }
}
