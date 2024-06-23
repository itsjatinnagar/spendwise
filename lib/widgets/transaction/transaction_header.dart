import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../helpers/helpers.dart';

class TransactionHeader extends StatelessWidget {
  const TransactionHeader({
    super.key,
    required this.date,
    required this.updateDate,
  });

  final DateTime date;
  final Function(DateTime) updateDate;

  void _prev() {
    final DateTime newDate = date.subtract(
      Duration(days: 1),
    );
    updateDate(newDate);
  }

  void _next() {
    final DateTime newDate = date.add(
      Duration(days: 1),
    );
    updateDate(newDate);
  }

  void _pick(BuildContext context) async {
    DateTime? selectedDate = await showDatePicker(
      context: context,
      initialDate: date,
      firstDate: initialDate,
      lastDate: DateTime.now(),
    );
    if (selectedDate != null) {
      updateDate(selectedDate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool isToday = date.compareTo(today) == 0;
    final bool isInitial = date.compareTo(initialDate) == 0;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          IconButton(
            iconSize: 30.0,
            onPressed: isInitial ? null : _prev,
            icon: Icon(
              Icons.arrow_left,
            ),
          ),
          TextButton(
            onPressed: () => _pick(context),
            child: Text(
              DateFormat('dd MMMM y').format(date),
            ),
          ),
          IconButton(
            iconSize: 30.0,
            onPressed: isToday ? null : _next,
            icon: Icon(
              Icons.arrow_right,
            ),
          ),
        ],
      ),
    );
  }
}
