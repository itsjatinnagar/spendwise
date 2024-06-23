import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../repositories/repositories.dart';
import '../widgets.dart';

class AccountDialog extends StatefulWidget {
  const AccountDialog({super.key});

  @override
  State<AccountDialog> createState() => _AccountDialogState();
}

class _AccountDialogState extends State<AccountDialog> {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  final TextEditingController _name = TextEditingController();
  final TextEditingController _amount = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Add Account'),
      content: Form(
        key: _key,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            NameField(
              controller: _name,
              label: 'Account Name',
            ),
            SizedBox(height: 20.0),
            AmountField(
              controller: _amount,
              label: 'Account Balance',
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
        FilledButton(
          onPressed: _submit,
          child: Text('Submit'),
        ),
      ],
    );
  }

  void _submit() {
    if (!_key.currentState!.validate()) {
      return;
    }
    Provider.of<DataRepository>(
      context,
      listen: false,
    ).createAccount(
      name: _name.text,
      amount: _amount.text,
    );
    Navigator.pop(context);
  }
}
