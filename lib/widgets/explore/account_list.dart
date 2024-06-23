import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../helpers/helpers.dart';
import '../../managers/managers.dart';
import '../../models/models.dart';

class AccountList extends StatelessWidget {
  const AccountList({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AccountManager>(
      builder: (context, manager, child) => SizedBox(
        height: 200.0,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          itemBuilder: (context, index) {
            final Account account = manager.accounts[index];
            return _card(account);
          },
          separatorBuilder: (_, __) => SizedBox(width: 10.0),
          itemCount: manager.accounts.length,
        ),
      ),
    );
  }

  Widget _card(Account account) {
    return Container(
      width: 180,
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
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Balance'),
              Text(
                '₹${account.currentBalance.toStringAsFixed(2)}',
              ),
            ],
          ),
        ],
      ),
    );
  }
}
