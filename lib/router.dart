import 'package:flutter/material.dart';
import 'managers/managers.dart';
import 'screens/screens.dart';

class AppRouter extends RouterDelegate
    with ChangeNotifier, PopNavigatorRouterDelegateMixin {
  @override
  final GlobalKey<NavigatorState> navigatorKey;
  final AccountManager accountManager;
  final CategoryManager categoryManager;
  final RouterManager routerManager;
  final TransactionManager transactionManager;
  final UserManager userManager;

  AppRouter({
    required this.accountManager,
    required this.routerManager,
    required this.categoryManager,
    required this.transactionManager,
    required this.userManager,
  }) : navigatorKey = GlobalKey<NavigatorState>() {
    accountManager.addListener(notifyListeners);
    routerManager.addListener(notifyListeners);
    categoryManager.addListener(notifyListeners);
    transactionManager.addListener(notifyListeners);
    userManager.addListener(notifyListeners);
  }

  @override
  void dispose() {
    accountManager.removeListener(notifyListeners);
    routerManager.removeListener(notifyListeners);
    categoryManager.removeListener(notifyListeners);
    transactionManager.removeListener(notifyListeners);
    userManager.removeListener(notifyListeners);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: navigatorKey,
      onPopPage: _handlePopPage,
      pages: [
        if (userManager.user == null)
          MaterialPage(
            name: Routes.signup,
            key: ValueKey(Routes.signup),
            child: SignupScreen(),
          ),
        if (userManager.user != null)
          MaterialPage(
            name: Routes.home,
            key: ValueKey(Routes.home),
            child: HomeScreen(
              selectedTab: routerManager.selectedTab,
            ),
          ),
        if (routerManager.isCreatingTransaction)
          MaterialPage(
            name: Routes.createTransaction,
            key: ValueKey(Routes.createTransaction),
            child: CreateTransaction(),
          ),
        if (routerManager.isManagingAccount)
          MaterialPage(
            name: Routes.manageAccount,
            key: ValueKey(Routes.manageAccount),
            child: AccountScreen(),
          ),
        if (routerManager.isEditingProfile)
          MaterialPage(
            name: Routes.editProfile,
            key: ValueKey(Routes.editProfile),
            child: EditProfileScreen(),
          ),
      ],
    );
  }

  bool _handlePopPage(Route<dynamic> route, result) {
    if (!route.didPop(result)) {
      return false;
    }
    if (route.settings.name == Routes.createTransaction) {
      routerManager.goToCreateTransaction(value: false);
    }
    if (route.settings.name == Routes.manageAccount) {
      routerManager.goToManageAccount(value: false);
    }
    if (route.settings.name == Routes.editProfile) {
      routerManager.goToEditProfile(value: false);
    }
    return true;
  }

  @override
  Future setNewRoutePath(configuration) async => null;
}

class Routes {
  static const String signup = '/signup';
  static const String home = '/home';
  static const String createTransaction = '/create-transaction';
  static const String manageAccount = '/manage-account';
  static const String editProfile = '/edit-profile';
}
