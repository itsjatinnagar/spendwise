import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../helpers/helpers.dart';

class DateField extends StatelessWidget {
  const DateField({
    super.key,
    required this.date,
    required this.label,
    required this.onUpdate,
  });

  final String label;
  final DateTime date;
  final Function(DateTime) onUpdate;

  void _pickDate(BuildContext context) async {
    DateTime? selected = await showDatePicker(
      context: context,
      initialDate: date,
      firstDate: initialDate,
      lastDate: today,
    );
    if (selected != null) {
      onUpdate(selected);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label),
              Text(
                DateFormat.yMMMMd().format(
                  date,
                ),
              ),
            ],
          ),
          TextButton(
            onPressed: () => _pickDate(context),
            child: Text('Edit'),
          ),
        ],
      ),
    );
  }
}
