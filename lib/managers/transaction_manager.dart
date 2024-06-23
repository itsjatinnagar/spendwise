import 'package:flutter/material.dart';
import '../helpers/helpers.dart';
import '../models/models.dart';

class TransactionManager extends ChangeNotifier {
  final Map<DateTime, List<Transaction>> _transactions = {};

  List<Transaction> get todayTransactions {
    DateTime key = DateTime(today.year, today.month, today.day);
    return _transactions[key]!;
  }

  List<Transaction>? getTransactions(DateTime date) {
    if (_transactions.containsKey(date)) {
      return _transactions[date];
    } else {
      return null;
    }
  }

  void setTransactions(DateTime date, List<Transaction> transactions) {
    if (!_transactions.containsKey(date)) {
      _transactions[date] = transactions;
    }
    notifyListeners();
  }

  void createTransaction(Transaction transaction) {
    DateTime key = DateTime(
      transaction.dateTime.year,
      transaction.dateTime.month,
      transaction.dateTime.day,
    );
    if (_transactions.containsKey(key)) {
      _transactions[key]!.add(transaction);
    } else {
      _transactions[key] = [transaction];
    }
    notifyListeners();
  }
}
