import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../repositories/repositories.dart';
import '../helpers/helpers.dart';
import '../managers/managers.dart';
import '../widgets/widgets.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        children: [
          ProfileCard(),
          SizedBox(height: 40.0),
          _optionCard(
            title: 'Edit Profile',
            onTap: Provider.of<RouterManager>(
              context,
              listen: false,
            ).goToEditProfile,
          ),
          SizedBox(height: 20.0),
          _optionCard(
            title: 'Manage Accounts',
            onTap: Provider.of<RouterManager>(
              context,
              listen: false,
            ).goToManageAccount,
          ),
          SizedBox(height: 20.0),
          _optionCard(
            title: 'Export Data',
            onTap: Provider.of<DataRepository>(
              context,
              listen: false,
            ).exportData,
          ),
        ],
      ),
    );
  }

  Widget _optionCard({
    required String title,
    required void Function() onTap,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: primaryBackground,
      ),
      child: ListTile(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
        title: Text(title),
        trailing: Icon(Icons.arrow_forward_ios_rounded),
        onTap: onTap,
      ),
    );
  }
}
