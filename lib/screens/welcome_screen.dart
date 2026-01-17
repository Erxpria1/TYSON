import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/premium_logo.dart';
import '../widgets/premium_button.dart';
import '../widgets/theme_toggle.dart';
import '../constants/colors.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Theme.of(context).scaffoldBackgroundColor,
                  AppColors.secondary.withOpacity(0.1),
                ],
              ),
            ),
          ),
          // Theme Toggle
          const ThemeToggle(),
          // Content
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const PremiumLogo(size: 140),
                    const SizedBox(height: 32),
                    Text(
                      'TY-HAİR DESIGN',
                      style: Theme.of(context).textTheme.displayMedium,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Profesyonel Berberlik Hizmetleri',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: AppColors.textSecondary,
                          ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 64),
                    PremiumButton(
                      text: 'Giriş Yap',
                      onPressed: () => context.go('/auth/login'),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 16),
                    PremiumButton(
                      text: 'Kayıt Ol',
                      variant: ButtonVariant.outline,
                      onPressed: () => context.go('/auth/register'),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 32),
                    const Divider(),
                    const SizedBox(height: 32),
                    PremiumButton(
                      text: 'WhatsApp ile Randevu',
                      variant: ButtonVariant.whatsapp,
                      icon: Icons.whatsapp,
                      onPressed: () => context.go('/customer/whatsapp'),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 16),
                    TextButton(
                      onPressed: () => context.go('/auth/barber-login'),
                      child: Text(
                        'Berber Girişi',
                        style: TextStyle(
                          color: AppColors.textSecondary,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
