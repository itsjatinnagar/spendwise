import 'package:flutter/material.dart';

class NameField extends StatelessWidget {
  const NameField({
    super.key,
    required this.controller,
    required this.label,
  });

  final TextEditingController controller;
  final String label;

  String? _validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Enter Your Full Name';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(labelText: label),
      keyboardType: TextInputType.name,
      textCapitalization: TextCapitalization.words,
      validator: _validateName,
    );
  }
}
