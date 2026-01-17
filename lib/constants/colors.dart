import 'package:flutter/material.dart';

class AppColors {
  // Primary Colors
  static const Color primary = Color(0xFF1a1a1a);
  static const Color secondary = Color(0xFFc9a962);
  static const Color gold = Color(0xFFd4af37);

  // Background Colors
  static const Color background = Color(0xFFffffff);
  static const Color backgroundDark = Color(0xFF0a0a0a);
  static const Color surface = Color(0xFFf5f5f5);
  static const Color surfaceDark = Color(0xFF1a1a1a);

  // Text Colors
  static const Color text = Color(0xFF1a1a1a);
  static const Color textDark = Color(0xFFffffff);
  static const Color textSecondary = Color(0xFF666666);
  static const Color textSecondaryDark = Color(0xFFcccccc);

  // Status Colors
  static const Color success = Color(0xFF4CAF50);
  static const Color error = Color(0xFFf44336);
  static const Color warning = Color(0xFFFF9800);
  static const Color info = Color(0xFF2196F3);

  // Appointment Status Colors
  static const Color pending = Color(0xFFFF9800);
  static const Color confirmed = Color(0xFF4CAF50);
  static const Color cancelled = Color(0xFFf44336);
  static const Color completed = Color(0xFF9E9E9E);

  // WhatsApp
  static const Color whatsapp = Color(0xFF25D366);

  // Gradients
  static const LinearGradient goldGradient = LinearGradient(
    colors: [secondary, gold],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkGradient = LinearGradient(
    colors: [primary, Color(0xFF0a0a0a)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // Border Colors
  static const Color border = Color(0xFFe0e0e0);
  static const Color borderDark = Color(0xFF333333);

  // Shadow Colors
  static const Color shadow = Color(0x1A000000);
  static const Color shadowDark = Color(0x4D000000);
}
