import 'package:flutter/material.dart';
import '../models/models.dart';

class CategoryManager extends ChangeNotifier {
  List<Category> _categories = [];

  List<Category> get categories => List.unmodifiable(_categories);

  List<Category> get expenseCategories =>
      _categories.where((element) => element.type == 'expense').toList();

  List<Category> get incomeCategories =>
      _categories.where((element) => element.type == 'income').toList();

  void setCategories(List<Category> categories) {
    _categories = categories;
    notifyListeners();
  }
}
