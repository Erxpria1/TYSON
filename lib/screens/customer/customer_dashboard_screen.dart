import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../constants/colors.dart';

class CustomerDashboardScreen extends StatelessWidget {
  const CustomerDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final userName = authProvider.userData?.name ?? 'Misafir';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Ana Sayfa'),
        actions: [
          IconButton(
            icon: const CircleAvatar(
              backgroundColor: AppColors.secondary,
              child: Icon(Icons.person, color: Colors.white, size: 20),
            ),
            onPressed: () => context.go('/customer/profile'),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Greeting
            Text(
              'Merhaba, $userName! 👋',
              style: Theme.of(context).textTheme.displaySmall,
            ),
            const SizedBox(height: 8),
            Text(
              'Size nasıl yardımcı olabiliriz?',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: AppColors.textSecondary,
                  ),
            ),
            const SizedBox(height: 24),

            // Quick Actions
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              children: [
                _QuickActionCard(
                  title: 'Yeni Randevu',
                  icon: Icons.calendar_today,
                  color: AppColors.secondary,
                  onTap: () => context.go('/customer/new-appointment'),
                ),
                _QuickActionCard(
                  title: 'Randevularım',
                  icon: Icons.event_note,
                  color: AppColors.info,
                  onTap: () => context.go('/customer/appointments'),
                ),
                _QuickActionCard(
                  title: 'Hizmetler',
                  icon: Icons.content_cut,
                  color: AppColors.warning,
                  onTap: () => context.go('/customer/services'),
                ),
                _QuickActionCard(
                  title: 'WhatsApp',
                  icon: Icons.whatsapp,
                  color: AppColors.whatsapp,
                  onTap: () => context.go('/customer/whatsapp'),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Upcoming Appointment Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.event, color: AppColors.secondary),
                        const SizedBox(width: 8),
                        Text(
                          'Yaklaşan Randevu',
                          style: Theme.of(context).textTheme.headlineMedium,
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: AppColors.goldGradient,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Saç Kesimi',
                                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                ),
                                const SizedBox(height: 8),
                                Row(
                                  children: [
                                    const Icon(Icons.calendar_today, color: Colors.white, size: 16),
                                    const SizedBox(width: 4),
                                    Text(
                                      '15 Şubat 2024',
                                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                            color: Colors.white,
                                          ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    const Icon(Icons.access_time, color: Colors.white, size: 16),
                                    const SizedBox(width: 4),
                                    Text(
                                      '14:00',
                                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                            color: Colors.white,
                                          ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.arrow_forward, color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Salon Info Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'TY-HAİR DESIGN',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: List.generate(
                        5,
                        (index) => const Icon(Icons.star, color: AppColors.gold, size: 20),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text('Profesyonel berberlik hizmetleri'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go('/customer');
              break;
            case 1:
              context.go('/customer/appointments');
              break;
            case 2:
              context.go('/customer/new-appointment');
              break;
            case 3:
              context.go('/customer/services');
              break;
            case 4:
              context.go('/customer/profile');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Ana Sayfa'),
          BottomNavigationBarItem(icon: Icon(Icons.event_note), label: 'Randevular'),
          BottomNavigationBarItem(icon: Icon(Icons.add_circle), label: 'Yeni'),
          BottomNavigationBarItem(icon: Icon(Icons.content_cut), label: 'Hizmetler'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profil'),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _QuickActionCard({
    required this.title,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 32),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
