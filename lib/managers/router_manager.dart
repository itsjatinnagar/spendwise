import 'package:flutter/material.dart';

class RouterManager extends ChangeNotifier {
  int _selectedTab = 0;
  bool _createTransaction = false;
  bool _manageAccount = false;
  bool _editProfile = false;

  int get selectedTab => _selectedTab;

  bool get isCreatingTransaction => _createTransaction;
  bool get isManagingAccount => _manageAccount;
  bool get isEditingProfile => _editProfile;

  void goToCreateTransaction({bool value = true}) {
    _createTransaction = value;
    notifyListeners();
  }

  void goToManageAccount({bool value = true}) {
    _manageAccount = value;
    notifyListeners();
  }

  void goToEditProfile({bool value = true}) {
    _editProfile = value;
    notifyListeners();
  }

  void selectTab(int index) {
    _selectedTab = index;
    notifyListeners();
  }
}
