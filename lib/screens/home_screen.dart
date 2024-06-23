import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens.dart';
import '../managers/managers.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.selectedTab});

  final int selectedTab;

  static const List<Widget> _screens = [
    ExploreScreen(),
    TransactionScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: IndexedStack(
          index: selectedTab,
          children: _screens,
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedTab,
        onDestinationSelected: (index) => Provider.of<RouterManager>(
          context,
          listen: false,
        ).selectTab(index),
        destinations: <NavigationDestination>[
          NavigationDestination(
            selectedIcon: Icon(Icons.explore),
            icon: Icon(Icons.explore_outlined),
            label: 'Explore',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.compare_arrows_rounded),
            icon: Icon(Icons.compare_arrows_rounded),
            label: 'Transactions',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.account_circle),
            icon: Icon(Icons.account_circle_outlined),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
