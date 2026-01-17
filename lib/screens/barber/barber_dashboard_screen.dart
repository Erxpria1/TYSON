import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../constants/colors.dart';

class BarberDashboardScreen extends StatelessWidget {
  const BarberDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Yönetici Paneli'),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Genel Bakış',
              style: Theme.of(context).textTheme.displaySmall,
            ),
            const SizedBox(height: 24),
            // Stats Grid
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 1.5,
              children: [
                _StatCard(
                  title: 'Bugün',
                  value: '4',
                  icon: Icons.today,
                  color: AppColors.info,
                ),
                _StatCard(
                  title: 'Bu Hafta',
                  value: '18',
                  icon: Icons.date_range,
                  color: AppColors.secondary,
                ),
                _StatCard(
                  title: 'Bekleyen',
                  value: '2',
                  icon: Icons.pending_actions,
                  color: AppColors.warning,
                ),
                _StatCard(
                  title: 'Gelir',
                  value: '1200₺',
                  icon: Icons.attach_money,
                  color: AppColors.success,
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Today's Appointments
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Bugünkü Randevular',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                TextButton(
                  onPressed: () => context.go('/barber/appointments'),
                  child: const Text('Tümü'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ..._getTodayAppointments().map((appointment) {
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: _getStatusColor(appointment['status'] as String),
                    child: Text(
                      appointment['time'] as String,
                      style: const TextStyle(
                        fontSize: 12,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  title: Text(appointment['customer'] as String),
                  subtitle: Text(appointment['service'] as String),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: _getStatusColor(appointment['status'] as String).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      _getStatusText(appointment['status'] as String),
                      style: TextStyle(
                        color: _getStatusColor(appointment['status'] as String),
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
              );
            }),
            const SizedBox(height: 32),
            // Recent Activity
            Text(
              'Son Aktiviteler',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            ..._getRecentActivity().map((activity) {
              return ListTile(
                leading: CircleAvatar(
                  backgroundColor: AppColors.secondary.withOpacity(0.1),
                  child: Icon(
                    activity['icon'] as IconData,
                    color: AppColors.secondary,
                  ),
                ),
                title: Text(activity['title'] as String),
                subtitle: Text(activity['subtitle'] as String),
                trailing: Text(
                  activity['time'] as String,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              );
            }),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (index) {
          switch (index) {
            case 0:
              context.go('/barber');
              break;
            case 1:
              context.go('/barber/appointments');
              break;
            case 2:
              context.go('/barber/customers');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Panel'),
          BottomNavigationBarItem(icon: Icon(Icons.event_note), label: 'Randevular'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Müşteriler'),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _getTodayAppointments() {
    return [
      {
        'time': '10:00',
        'customer': 'Ali Yılmaz',
        'service': 'Saç Kesimi',
        'status': 'confirmed',
      },
      {
        'time': '11:30',
        'customer': 'Mehmet Demir',
        'service': 'Sakal Kesimi',
        'status': 'pending',
      },
      {
        'time': '14:00',
        'customer': 'Ahmet Kaya',
        'service': 'Saç + Sakal Paket',
        'status': 'confirmed',
      },
      {
        'time': '16:00',
        'customer': 'Can Öztürk',
        'service': 'Tam Bakım Paket',
        'status': 'confirmed',
      },
    ];
  }

  List<Map<String, dynamic>> _getRecentActivity() {
    return [
      {
        'icon': Icons.event_available,
        'title': 'Yeni Randevu',
        'subtitle': 'Ali Yılmaz - Saç Kesimi',
        'time': '5 dk önce',
      },
      {
        'icon': Icons.check_circle,
        'title': 'Randevu Tamamlandı',
        'subtitle': 'Mehmet Demir - Sakal Kesimi',
        'time': '1 saat önce',
      },
      {
        'icon': Icons.person_add,
        'title': 'Yeni Müşteri',
        'subtitle': 'Can Öztürk',
        'time': '2 saat önce',
      },
    ];
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'confirmed':
        return AppColors.confirmed;
      case 'pending':
        return AppColors.pending;
      case 'cancelled':
        return AppColors.cancelled;
      case 'completed':
        return AppColors.completed;
      default:
        return AppColors.textSecondary;
    }
  }

  String _getStatusText(String status) {
    switch (status) {
      case 'confirmed':
        return 'Onaylı';
      case 'pending':
        return 'Bekliyor';
      case 'cancelled':
        return 'İptal';
      case 'completed':
        return 'Tamamlandı';
      default:
        return status;
    }
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const _StatCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppColors.textSecondary,
                      ),
                ),
                Icon(icon, color: color, size: 24),
              ],
            ),
            Text(
              value,
              style: Theme.of(context).textTheme.displaySmall?.copyWith(
                    color: color,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}
