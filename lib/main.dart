import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'managers/managers.dart';
import 'repositories/repositories.dart';
import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final AccountManager accountManager = AccountManager();
  final CategoryManager categoryManager = CategoryManager();
  final RouterManager routerManager = RouterManager();
  final TransactionManager transactionManager = TransactionManager();
  final UserManager userManager = UserManager();
  final DataRepository dataRepository = DataRepository(
    accountManager: accountManager,
    categoryManager: categoryManager,
    routerManager: routerManager,
    transactionManager: transactionManager,
    userManager: userManager,
  );

  await dataRepository.initialize();

  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
      statusBarBrightness: Brightness.light,
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(MyApp(dataRepository: dataRepository));
}
