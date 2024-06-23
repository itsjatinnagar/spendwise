import 'package:flutter/material.dart';

class NumberField extends StatelessWidget {
  const NumberField({
    super.key,
    required this.controller,
    required this.label,
  });

  final TextEditingController controller;
  final String label;

  String? _validateNumber(String? value) {
    if (value == null || value.isEmpty) {
      return 'Enter Your Mobile Number';
    }
    if (value.length != 10) {
      return 'Invalid Mobile Number';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(labelText: label),
      keyboardType: TextInputType.phone,
      validator: _validateNumber,
    );
  }
}
