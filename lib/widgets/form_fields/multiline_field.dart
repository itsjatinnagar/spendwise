import 'package:flutter/material.dart';

class MultilineField extends StatelessWidget {
  const MultilineField({
    super.key,
    required this.controller,
    required this.label,
  });

  final TextEditingController controller;
  final String label;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(labelText: label),
      textInputAction: TextInputAction.done,
      minLines: 1,
      maxLines: 5,
    );
  }
}
