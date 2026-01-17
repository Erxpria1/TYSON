import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../constants/colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final user = authProvider.userData;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // User Header
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: AppColors.goldGradient,
              ),
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundColor: Colors.white,
                    child: Text(
                      user?.name.substring(0, 1).toUpperCase() ?? 'U',
                      style: const TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                        color: AppColors.secondary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    user?.name ?? 'Kullanıcı',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: Colors.white,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    user?.email ?? '',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white.withOpacity(0.9),
                        ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // Menu Items
            _MenuItem(
              icon: Icons.event_note,
              title: 'Randevularım',
              onTap: () => context.go('/customer/appointments'),
            ),
            _MenuItem(
              icon: Icons.content_cut,
              title: 'Hizmetler',
              onTap: () => context.go('/customer/services'),
            ),
            _MenuItem(
              icon: Icons.notifications_outlined,
              title: 'Bildirimler',
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Bildirimler özelliği yakında eklenecek')),
                );
              },
            ),
            _MenuItem(
              icon: Icons.settings_outlined,
              title: 'Ayarlar',
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Ayarlar özelliği yakında eklenecek')),
                );
              },
            ),
            _MenuItem(
              icon: Icons.help_outline,
              title: 'Yardım',
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Yardım özelliği yakında eklenecek')),
                );
              },
            ),
            _MenuItem(
              icon: Icons.info_outline,
              title: 'Hakkında',
              onTap: () {
                showAboutDialog(
                  context: context,
                  applicationName: 'TY-HAIR DESIGN',
                  applicationVersion: '1.0.0',
                  applicationLegalese: '© 2024 TY-HAIR DESIGN\nTüm hakları saklıdır.',
                );
              },
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.logout),
                  label: const Text('Çıkış Yap'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.error,
                    side: const BorderSide(color: AppColors.error),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  onPressed: () async {
                    final confirmed = await showDialog<bool>(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Çıkış Yap'),
                        content: const Text('Çıkış yapmak istediğinizden emin misiniz?'),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context, false),
                            child: const Text('İptal'),
                          ),
                          ElevatedButton(
                            onPressed: () => Navigator.pop(context, true),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.error,
                            ),
                            child: const Text('Çıkış Yap'),
                          ),
                        ],
                      ),
                    );
                    if (confirmed == true && context.mounted) {
                      await authProvider.signOut();
                      if (context.mounted) {
                        context.go('/');
                      }
                    }
                  },
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Versiyon 1.0.0',
              style: Theme.of(context).textTheme.bodySmall,
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 4,
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

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;

  const _MenuItem({
    required this.icon,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
