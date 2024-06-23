import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../managers/managers.dart';
import '../models/models.dart';
import '../repositories/repositories.dart';
import '../widgets/widgets.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  final TextEditingController _name = TextEditingController();
  final TextEditingController _email = TextEditingController();
  final TextEditingController _number = TextEditingController();
  late String _gender;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
        actions: [
          IconButton(
            onPressed: _submit,
            icon: Icon(Icons.check),
          ),
        ],
      ),
      body: Form(
        key: _key,
        child: ListView(
          padding: const EdgeInsets.all(10.0),
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
            SelectionField(
              title: 'Gender',
              onSelected: _setGender,
              selected: _gender,
              choices: [
                Choice(label: 'Male', value: 'male'),
                Choice(label: 'Female', value: 'female'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _setGender(String value) {
    setState(() {
      _gender = value;
    });
  }

  void _submit() {
    if (!_key.currentState!.validate()) {
      return;
    }
    Provider.of<DataRepository>(
      context,
      listen: false,
    ).updateUser(
      name: _name.text,
      email: _email.text,
      number: _number.text,
      gender: _gender,
    );
  }

  @override
  void initState() {
    super.initState();
    final User user = Provider.of<UserManager>(
      context,
      listen: false,
    ).user!;
    _name.text = user.name;
    _email.text = user.email;
    _number.text = user.number;
    _gender = user.gender;
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _number.dispose();
    super.dispose();
  }
}
