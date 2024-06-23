import 'package:flutter/material.dart';
import '../../models/models.dart';
import '../widgets.dart';

class TransactionView extends StatelessWidget {
  const TransactionView(this.transactions, {super.key});

  final List<Transaction> transactions;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView(
        scrollDirection: Axis.vertical,
        padding: const EdgeInsets.only(
          left: 10.0,
          top: 10.0,
          right: 10.0,
          bottom: 80.0,
        ),
        children: [
          _buildSummary(),
          SizedBox(height: 20.0),
          TransactionList(transactions),
        ],
      ),
    );
  }

  Widget _buildSummary() {
    return Row(
      children: [
        _summaryCard(
          amount: totalSpending(),
          background: Colors.red.shade100,
          title: 'Total Spending',
        ),
        SizedBox(width: 10.0),
        _summaryCard(
          amount: totalEarning(),
          background: Colors.green.shade100,
          title: 'Total Earning',
        ),
      ],
    );
  }

  Widget _summaryCard({
    required double amount,
    required Color background,
    required String title,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(20.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: background,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(title),
            SizedBox(height: 6.0),
            Text('₹${amount.toStringAsFixed(2)}'),
          ],
        ),
      ),
    );
  }

  double totalSpending() {
    List<Transaction> items = transactions
        .where(
          (element) => element.type == 'expense',
        )
        .toList();
    return items.fold(0, (prev, e) => prev + e.amount);
  }

  double totalEarning() {
    List<Transaction> items = transactions
        .where(
          (element) => element.type == 'income',
        )
        .toList();
    return items.fold(0, (prev, e) => prev + e.amount);
  }
}
