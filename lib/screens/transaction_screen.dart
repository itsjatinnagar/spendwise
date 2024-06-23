import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../repositories/repositories.dart';
import '../widgets/widgets.dart';

class TransactionScreen extends StatefulWidget {
  const TransactionScreen({super.key});

  @override
  State<TransactionScreen> createState() => _TransactionScreenState();
}

class _TransactionScreenState extends State<TransactionScreen> {
  DateTime _selectedDate =
      DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day);

  void _updateDate(DateTime date) {
    setState(() {
      _selectedDate = date;
    });
    Provider.of<DataRepository>(context, listen: false)
        .loadTransactions(_selectedDate);
  }

  @override
  Widget build(BuildContext context) {
    final List<Transaction>? transactions =
        Provider.of<TransactionManager>(context).getTransactions(_selectedDate);

    return Scaffold(
      body: Column(
        children: [
          TransactionHeader(
            date: _selectedDate,
            updateDate: _updateDate,
          ),
          if (transactions == null)
            Expanded(
              child: Center(
                child: CircularProgressIndicator(),
              ),
            )
          else if (transactions.isEmpty)
            EmptyTransactionView()
          else
            TransactionView(transactions)
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: Provider.of<RouterManager>(
          context,
          listen: false,
        ).goToCreateTransaction,
        child: Icon(Icons.add),
      ),
    );
  }
}
