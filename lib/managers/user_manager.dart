import 'package:flutter/material.dart';
import '../models/models.dart';

class UserManager extends ChangeNotifier {
  User? _user;

  User? get user => _user;

  void setUser(User user) {
    _user = user;
    notifyListeners();
  }
}
