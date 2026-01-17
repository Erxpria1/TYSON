import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/theme_provider.dart';

class ThemeToggle extends StatelessWidget {
  const ThemeToggle({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Positioned(
      top: 50,
      right: 20,
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor.withOpacity(0.9),
          borderRadius: BorderRadius.circular(25),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              spreadRadius: 2,
            ),
          ],
        ),
        child: IconButton(
          icon: Icon(
            themeProvider.isDark ? Icons.light_mode : Icons.dark_mode,
            color: Theme.of(context).iconTheme.color,
          ),
          onPressed: themeProvider.toggleTheme,
          tooltip: themeProvider.isDark ? 'Açık Tema' : 'Koyu Tema',
        ),
      ),
    );
  }
}
