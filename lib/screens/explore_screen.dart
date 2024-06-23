import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../widgets/widgets.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Transaction> transactions =
        Provider.of<TransactionManager>(context).todayTransactions;

    if (transactions.isEmpty) {
      return _buildNonScrollable();
    } else {
      return _buildScrollable(transactions);
    }
  }

  Widget _buildNonScrollable() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ExploreHeader(),
          SizedBox(height: 20.0),
          AccountListHeader(),
          SizedBox(height: 10.0),
          AccountList(),
          SizedBox(height: 20.0),
          TransactionListHeader(),
          SizedBox(height: 10.0),
          EmptyTransactionView(),
        ],
      ),
    );
  }

  Widget _buildScrollable(List<Transaction> transactions) {
    return SingleChildScrollView(
      padding: EdgeInsets.only(left: 10.0, right: 10.0, bottom: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ExploreHeader(),
          SizedBox(height: 20.0),
          AccountListHeader(),
          SizedBox(height: 10.0),
          AccountList(),
          SizedBox(height: 20.0),
          TransactionListHeader(),
          SizedBox(height: 10.0),
          TransactionList(transactions),
        ],
      ),
    );
  }
}
