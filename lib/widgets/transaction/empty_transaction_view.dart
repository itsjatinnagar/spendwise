import 'package:flutter/material.dart';

class EmptyTransactionView extends StatelessWidget {
  const EmptyTransactionView({super.key});

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.width;

    return Expanded(
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.inbox,
              size: 80.0,
              color: Colors.grey.shade400,
            ),
            SizedBox(height: 10.0),
            Text('No transactions!'),
            SizedBox(height: 10.0),
            SizedBox(
              width: width * 0.8,
              child: Text(
                'Start by adding a new transaction to keep track of your expenses and income.',
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
