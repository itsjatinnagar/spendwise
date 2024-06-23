import 'package:flutter/material.dart';
import '../widgets.dart';
import '../../models/models.dart';

class TransactionList extends StatelessWidget {
  const TransactionList(this.transactions, {super.key});

  final List<Transaction> transactions;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      primary: false,
      physics: NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      scrollDirection: Axis.vertical,
      itemBuilder: (context, index) {
        final Transaction transaction = transactions[index];
        return TransactionCard(transaction);
      },
      separatorBuilder: (context, index) => SizedBox(height: 10),
      itemCount: transactions.length,
    );
  }
}
