import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../helpers/helpers.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../repositories/repositories.dart';
import '../widgets/widgets.dart';

class ExpenseScreen extends StatefulWidget {
  const ExpenseScreen({super.key});

  @override
  State<ExpenseScreen> createState() => _ExpenseScreenState();
}

class _ExpenseScreenState extends State<ExpenseScreen>
    with AutomaticKeepAliveClientMixin {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  final TextEditingController _amount = TextEditingController();
  final TextEditingController _note = TextEditingController();
  late List<Account> _accountList;
  late String _account;
  late List<Category> _categoryList;
  late String _category;
  DateTime _date = today;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Form(
      key: _key,
      child: ListView(
        padding: const EdgeInsets.all(10.0),
        children: [
          SelectionField(
            title: 'Account',
            onSelected: _updateAccount,
            selected: _account,
            choices: _accountList
                .map((e) => Choice(
                      label: e.name,
                      value: e.id,
                    ))
                .toList(),
          ),
          SizedBox(height: 20.0),
          SelectionField(
            title: 'Category',
            onSelected: _updateCategory,
            selected: _category,
            choices: _categoryList
                .map((e) => Choice(
                      label: e.name,
                      value: e.id,
                    ))
                .toList(),
          ),
          SizedBox(height: 20.0),
          DateField(
            date: _date,
            label: 'Date',
            onUpdate: _updateDate,
          ),
          SizedBox(height: 20.0),
          AmountField(
            controller: _amount,
            label: 'Amount',
          ),
          SizedBox(height: 20.0),
          MultilineField(
            controller: _note,
            label: 'Note',
          ),
          SizedBox(height: 30.0),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: _submit,
              child: Text('Add Expense'),
            ),
          ),
        ],
      ),
    );
  }

  @override
  bool get wantKeepAlive => true;

  @override
  void initState() {
    super.initState();
    _accountList = Provider.of<AccountManager>(
      context,
      listen: false,
    ).accounts;
    _account = _accountList.first.id;
    _categoryList = Provider.of<CategoryManager>(
      context,
      listen: false,
    ).expenseCategories;
    _category = _categoryList.first.id;
  }

  @override
  void dispose() {
    _amount.dispose();
    _note.dispose();
    super.dispose();
  }

  void _updateAccount(String value) {
    setState(() {
      _account = value;
    });
  }

  void _updateCategory(String value) {
    setState(() {
      _category = value;
    });
  }

  void _updateDate(DateTime date) {
    setState(() {
      _date = date;
    });
  }

  void _submit() {
    if (!_key.currentState!.validate()) {
      return;
    }
    Provider.of<DataRepository>(
      context,
      listen: false,
    ).createExpense(
      accountId: _account,
      categoryId: _category,
      date: _date,
      amount: _amount.text,
      note: _note.text,
    );
  }
}
