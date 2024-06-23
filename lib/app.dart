import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'helpers/helpers.dart';
import 'repositories/repositories.dart';
import 'router.dart';

class MyApp extends StatelessWidget {
  MyApp({
    super.key,
    required this.dataRepository,
  });

  final DataRepository dataRepository;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => dataRepository.accountManager,
        ),
        ChangeNotifierProvider(
          create: (_) => dataRepository.categoryManager,
        ),
        ChangeNotifierProvider(
          create: (_) => dataRepository.routerManager,
        ),
        ChangeNotifierProvider(
          create: (_) => dataRepository.transactionManager,
        ),
        ChangeNotifierProvider(
          create: (_) => dataRepository.userManager,
        ),
        Provider(
          create: (_) => dataRepository,
          dispose: (_, dataRepository) => dataRepository.close(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Spendwise',
        theme: themeData,
        home: Router(
          routerDelegate: AppRouter(
            accountManager: dataRepository.accountManager,
            routerManager: dataRepository.routerManager,
            categoryManager: dataRepository.categoryManager,
            transactionManager: dataRepository.transactionManager,
            userManager: dataRepository.userManager,
          ),
          backButtonDispatcher: RootBackButtonDispatcher(),
        ),
      ),
    );
  }
}
