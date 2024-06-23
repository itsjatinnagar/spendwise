import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../repositories/repositories.dart';
import '../widgets/widgets.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  final TextEditingController _name = TextEditingController();
  final TextEditingController _email = TextEditingController();
  final TextEditingController _number = TextEditingController();
  final TextEditingController _amount = TextEditingController();
  String _gender = 'male';

  void _setGender(String value) {
    setState(() {
      _gender = value;
    });
  }

  void onSubmit() {
    if (!_key.currentState!.validate()) {
      return;
    }
    Provider.of<DataRepository>(context, listen: false).register(
      balance: _amount.text,
      email: _email.text,
      gender: _gender,
      name: _name.text,
      number: _number.text,
    );
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _number.dispose();
    _amount.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  'assets/images/logo.png',
                  height: 200.0,
                  width: 200.0,
                ),
                SizedBox(height: 60),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20.0),
                  child: Form(
                    key: _key,
                    child: Column(
                      children: [
                        NameField(
                          controller: _name,
                          label: 'Full Name',
                        ),
                        SizedBox(height: 20),
                        EmailField(
                          controller: _email,
                          label: 'Email Address',
                        ),
                        SizedBox(height: 20),
                        NumberField(
                          controller: _number,
                          label: 'Mobile Number',
                        ),
                        SizedBox(height: 20),
                        AmountField(
                          controller: _amount,
                          label: 'Cash Balance',
                        ),
                        SizedBox(height: 20),
                        SelectionField(
                          title: 'Gender',
                          onSelected: _setGender,
                          selected: _gender,
                          choices: [
                            Choice(label: 'Male', value: 'male'),
                            Choice(label: 'Female', value: 'female')
                          ],
                        ),
                        SizedBox(height: 30),
                        SizedBox(
                          width: double.infinity,
                          child: FilledButton(
                            onPressed: onSubmit,
                            child: Text('Get Started'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
