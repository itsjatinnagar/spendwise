import 'package:flutter/material.dart';
import '../../helpers/helpers.dart';
import '../../models/models.dart';

class AccountCard extends StatelessWidget {
  const AccountCard(this.account, {super.key});

  final Account account;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        gradient: accountCardGradient,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(account.name),
          SizedBox(height: 16.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Starting Balance'),
              Text('₹${account.startingBalance.toStringAsFixed(2)}'),
            ],
          ),
          SizedBox(height: 6.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Current Balance'),
              Text('₹${account.currentBalance.toStringAsFixed(2)}'),
            ],
          ),
        ],
      ),
    );
  }
}
