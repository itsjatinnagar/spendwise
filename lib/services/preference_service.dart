import 'package:shared_preferences/shared_preferences.dart';

class PreferenceService {
  PreferenceService._init();
  static final PreferenceService instance = PreferenceService._init();

  static SharedPreferences? _preferences;

  Future<SharedPreferences> get preferences async {
    if (_preferences != null) {
      return _preferences!;
    }

    _preferences = await SharedPreferences.getInstance();
    return _preferences!;
  }

  void close() {
    _preferences = null;
  }
}
