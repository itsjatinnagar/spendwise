import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../helpers/helpers.dart';
import '../../managers/managers.dart';
import '../../models/models.dart';

class TransactionCard extends StatelessWidget {
  const TransactionCard(this.transaction, {super.key});

  final Transaction transaction;

  @override
  Widget build(BuildContext context) {
    final List<Category> categories =
        Provider.of<CategoryManager>(context).categories;

    return DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: primaryBackground,
      ),
      child: ListTile(
        title: Text(getCategoryName(transaction.categoryId, categories)),
        subtitle: Text(DateFormat('HH:mm').format(transaction.dateTime)),
        trailing: Text(
          '₹${transaction.amount.toStringAsFixed(2)}',
          style: TextStyle(
            color: transaction.type == 'expense' ? Colors.red : Colors.green,
          ),
        ),
      ),
    );
  }

  String getCategoryName(String id, List<Category> categories) =>
      categories.firstWhere((element) => element.id == id).name;
}
