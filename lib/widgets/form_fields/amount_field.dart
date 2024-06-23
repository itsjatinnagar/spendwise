import 'package:flutter/material.dart';

class AmountField extends StatelessWidget {
  const AmountField({
    super.key,
    required this.controller,
    required this.label,
  });

  final TextEditingController controller;
  final String label;

  String? _validateAmount(String? value) {
    if (value == null || value.isEmpty) {
      return 'Enter Amount';
    }
    if (double.parse(value) < 0) {
      return 'Invalid Amount';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(labelText: label),
      keyboardType: TextInputType.number,
      validator: _validateAmount,
    );
  }
}
