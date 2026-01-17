import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeProvider extends ChangeNotifier {
  static const String _themeKey = 'theme_mode';
  final SharedPreferences _prefs;
  ThemeMode _themeMode = ThemeMode.light;

  ThemeProvider(this._prefs) {
    _loadTheme();
  }

  ThemeMode get themeMode => _themeMode;
  bool get isDark => _themeMode == ThemeMode.dark;

  Future<void> _loadTheme() async {
    final isDark = _prefs.getBool(_themeKey) ?? false;
    _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
    notifyListeners();
  }

  Future<void> toggleTheme() async {
    _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    await _prefs.setBool(_themeKey, isDark);
    notifyListeners();
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    _themeMode = mode;
    await _prefs.setBool(_themeKey, isDark);
    notifyListeners();
  }
}
