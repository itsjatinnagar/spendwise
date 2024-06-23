import 'package:flutter/material.dart';
import '../../models/models.dart';

class SelectionField extends StatelessWidget {
  const SelectionField({
    super.key,
    required this.title,
    required this.onSelected,
    required this.selected,
    required this.choices,
  });

  final String title;
  final Function(String) onSelected;
  final String selected;
  final List<Choice> choices;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
          ),
          Wrap(
            spacing: 16.0,
            children: choices
                .map(
                  (choice) => ChoiceChip(
                    label: Text(choice.label),
                    selected: selected == choice.value,
                    onSelected: (value) {
                      if (value) {
                        onSelected(choice.value);
                      }
                    },
                  ),
                )
                .toList(),
          ),
        ],
      ),
    );
  }
}
