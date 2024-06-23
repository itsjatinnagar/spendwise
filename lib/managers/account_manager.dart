import 'package:flutter/material.dart';
import '../models/models.dart';

class AccountManager extends ChangeNotifier {
  List<Account> _accounts = [];

  List<Account> get accounts => List.unmodifiable(_accounts);

  void createAccount(Account account) {
    _accounts.add(account);
    notifyListeners();
  }

  void updateAccountBalance(String id, double newBalance) {
    final index = _accounts.indexWhere((element) => element.id == id);
    _accounts[index] = _accounts[index].copyWith(currentBalance: newBalance);
    notifyListeners();
  }

  void setAccounts(List<Account> accounts) {
    _accounts = accounts;
    notifyListeners();
  }
}
