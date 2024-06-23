import 'package:flutter/material.dart';
import 'screens.dart';

class CreateTransaction extends StatelessWidget {
  const CreateTransaction({super.key});

  static const List<Tab> _tabs = [
    Tab(text: 'Expense'),
    Tab(text: 'Income'),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: _tabs.length,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: _tabs,
          ),
          title: Text('Add Transaction'),
        ),
        body: TabBarView(
          children: [
            ExpenseScreen(),
            IncomeScreen(),
          ],
        ),
      ),
    );
  }
}
