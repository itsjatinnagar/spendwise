import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../helpers/helpers.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../widgets/widgets.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Account> accounts =
        Provider.of<AccountManager>(context).accounts;

    return Scaffold(
      appBar: AppBar(
        title: Text('Manage Accounts'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(10.0),
        children: [
          _balanceCard(getTotalBalance(accounts)),
          SizedBox(height: 20.0),
          _buildRow(context),
          _buildList(accounts),
        ],
      ),
    );
  }

  Widget _balanceCard(double balance) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: primaryBackground,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Available Balance'),
          Text('₹${balance.toStringAsFixed(2)}'),
        ],
      ),
    );
  }

  Widget _buildRow(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text('Accounts'),
        TextButton.icon(
          onPressed: () => showDialog(
            context: context,
            builder: (_) => AccountDialog(),
          ),
          icon: Icon(
            Icons.add,
            size: 16.0,
          ),
          label: Text('Add'),
        ),
      ],
    );
  }

  Widget _buildList(List<Account> accounts) {
    return ListView.separated(
      physics: const NeverScrollableScrollPhysics(),
      primary: false,
      shrinkWrap: true,
      itemBuilder: (context, index) {
        final Account account = accounts[index];
        return AccountCard(account);
      },
      separatorBuilder: (_, __) => const SizedBox(height: 10.0),
      itemCount: accounts.length,
    );
  }

  double getTotalBalance(List<Account> accounts) => accounts.fold(
        0,
        (previousValue, element) => previousValue + element.currentBalance,
      );
}
