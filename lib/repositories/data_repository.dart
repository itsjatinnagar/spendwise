import 'dart:convert';
import 'dart:io';
import 'package:flutter/services.dart';
import '../helpers/helpers.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../services/services.dart';

class DataRepository {
  final DatabaseService _databaseService = DatabaseService.instance;
  final PreferenceService _preferenceService = PreferenceService.instance;
  final AccountManager accountManager;
  final CategoryManager categoryManager;
  final RouterManager routerManager;
  final TransactionManager transactionManager;
  final UserManager userManager;

  DataRepository({
    required this.accountManager,
    required this.categoryManager,
    required this.routerManager,
    required this.transactionManager,
    required this.userManager,
  });

  void register({
    required String name,
    required String email,
    required String number,
    required String balance,
    required String gender,
  }) async {
    User user = User(
      name: name.trim(),
      email: email.trim(),
      number: number.trim(),
      gender: gender,
      createdAt: DateTime.now(),
    );
    Account account = Account(
      id: uuid(),
      name: 'CASH',
      startingBalance: double.parse(balance),
      currentBalance: double.parse(balance),
    );
    try {
      final db = await _databaseService.database;
      final prefs = await _preferenceService.preferences;
      final List<Category> categories = await _loadCategories();

      await prefs.setString('user', jsonEncode(user.toMap()));
      await db.transaction(
        (txn) async {
          await txn.insert(DatabaseService.accountTable, account.toMap());
          for (Category category in categories) {
            await txn.insert(DatabaseService.categoryTable, category.toMap());
          }
        },
      );

      accountManager.createAccount(account);
      categoryManager.setCategories(categories);
      transactionManager.setTransactions(today, []);
      userManager.setUser(user);
    } catch (e) {
      print(e.toString());
    }
  }

  void createExpense({
    required String accountId,
    required String categoryId,
    required DateTime date,
    required String amount,
    String? note,
  }) async {
    final DateTime now = DateTime.now();
    Transaction transaction = Transaction(
      id: uuid(),
      accountId: accountId,
      categoryId: categoryId,
      type: 'expense',
      dateTime: DateTime(
        date.year,
        date.month,
        date.day,
        now.hour,
        now.minute,
        now.second,
      ),
      amount: double.parse(amount),
      note: note,
    );
    Account account = accountManager.accounts
        .firstWhere((element) => element.id == accountId);
    final double newBalance = account.currentBalance - double.parse(amount);
    try {
      final db = await _databaseService.database;
      await db.transaction(
        (txn) async {
          await txn.insert(
            DatabaseService.transactionTable,
            transaction.toMap(),
          );
          await txn.update(
            DatabaseService.accountTable,
            {'current_balance': newBalance},
            where: 'id = ?',
            whereArgs: [accountId],
          );
        },
      );
      transactionManager.createTransaction(transaction);
      accountManager.updateAccountBalance(accountId, newBalance);
      routerManager.goToCreateTransaction(value: false);
    } catch (e) {
      print(e.toString());
    }
  }

  void createIncome({
    required String accountId,
    required String categoryId,
    required DateTime date,
    required String amount,
    String? note,
  }) async {
    final DateTime now = DateTime.now();
    Transaction transaction = Transaction(
      id: uuid(),
      accountId: accountId,
      categoryId: categoryId,
      type: 'income',
      dateTime: DateTime(
        date.year,
        date.month,
        date.day,
        now.hour,
        now.minute,
        now.second,
      ),
      amount: double.parse(amount),
      note: note,
    );
    Account account = accountManager.accounts
        .firstWhere((element) => element.id == accountId);
    final double newBalance = account.currentBalance + double.parse(amount);
    try {
      final db = await _databaseService.database;
      await db.transaction(
        (txn) async {
          await txn.insert(
            DatabaseService.transactionTable,
            transaction.toMap(),
          );
          await txn.update(
            DatabaseService.accountTable,
            {'current_balance': newBalance},
            where: 'id = ?',
            whereArgs: [accountId],
          );
        },
      );
      transactionManager.createTransaction(transaction);
      accountManager.updateAccountBalance(accountId, newBalance);
      routerManager.goToCreateTransaction(value: false);
    } catch (e) {
      print(e.toString());
    }
  }

  void updateUser({
    required String name,
    required String email,
    required String number,
    required String gender,
  }) async {
    User user = userManager.user!.copyWith(
      name: name.trim(),
      email: email.trim(),
      number: number.trim(),
      gender: gender.trim(),
    );
    try {
      final prefs = await _preferenceService.preferences;
      await prefs.setString('user', jsonEncode(user.toMap()));
      userManager.setUser(user);
      routerManager.goToEditProfile(value: false);
    } catch (e) {
      print(e.toString());
    }
  }

  void createAccount({
    required String name,
    required String amount,
  }) async {
    Account account = Account(
      id: uuid(),
      name: name.trim(),
      startingBalance: double.parse(amount),
      currentBalance: double.parse(amount),
    );
    try {
      final db = await _databaseService.database;
      await db.insert(DatabaseService.accountTable, account.toMap());
      accountManager.createAccount(account);
    } catch (e) {
      print(e.toString());
    }
  }

  void exportData() async {
    try {
      final db = await _databaseService.database;
      final List<Map<String, dynamic>> accounts = await db.query(
        DatabaseService.accountTable,
      );
      final List<Map<String, dynamic>> categories = await db.query(
        DatabaseService.categoryTable,
      );
      final List<Map<String, dynamic>> transactions = await db.query(
        DatabaseService.transactionTable,
      );
      final data = {
        'accounts': accounts,
        'categories': categories,
        'transactions': transactions,
      };
      final file = File('/storage/emulated/0/Download/export_sw.json');
      await file.writeAsString(jsonEncode(data));
    } catch (e) {
      print(e.toString());
    }
  }

  Future<bool> loadUser() async {
    try {
      final prefs = await _preferenceService.preferences;
      final data = prefs.getString('user');
      if (data == null) {
        return false;
      }
      final user = User.fromMap(jsonDecode(data));
      userManager.setUser(user);
      return true;
    } catch (e) {
      print(e.toString());
      return false;
    }
  }

  Future<void> loadAccounts() async {
    try {
      final db = await _databaseService.database;
      final result = await db.query(DatabaseService.accountTable);
      List<Account> accounts = result
          .map(
            (e) => Account.fromMap(e),
          )
          .toList();
      accountManager.setAccounts(accounts);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> loadCategories() async {
    try {
      final db = await _databaseService.database;
      final result = await db.query(DatabaseService.categoryTable);
      List<Category> categories = result
          .map(
            (e) => Category.fromMap(e),
          )
          .toList();
      categoryManager.setCategories(categories);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> loadTransactions(DateTime date) async {
    List<Transaction>? transactions = transactionManager.getTransactions(date);
    if (transactions != null) {
      return;
    }
    DateTime endOfDay = DateTime(date.year, date.month, date.day, 23, 59, 59);
    try {
      final db = await _databaseService.database;
      final result = await db.query(
        DatabaseService.transactionTable,
        where: 'datetime >= ? AND datetime <= ?',
        whereArgs: [date.toIso8601String(), endOfDay.toIso8601String()],
      );
      transactions = result
          .map(
            (e) => Transaction.fromMap(e),
          )
          .toList();
      transactionManager.setTransactions(date, transactions);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> initialize() async {
    final userExists = await loadUser();
    if (userExists) {
      await loadAccounts();
      await loadCategories();
      await loadTransactions(today);
    }
  }

  void close() {
    _databaseService.close();
    _preferenceService.close();
  }
}

Future<List<Category>> _loadCategories() async {
  final String response = await rootBundle.loadString(
    'assets/categories.json',
  );
  final data = jsonDecode(response) as List<dynamic>;
  final List<Category> categories =
      data.map((e) => Category.fromMap(e)).toList();
  return categories;
}
