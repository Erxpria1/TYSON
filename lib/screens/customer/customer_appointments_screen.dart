import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../models/appointment.dart';
import '../../widgets/status_badge.dart';
import '../../constants/colors.dart';

class CustomerAppointmentsScreen extends StatelessWidget {
  const CustomerAppointmentsScreen({super.key});

  // Mock data - replace with actual Firestore data
  List<Appointment> _getMockAppointments() {
    final now = DateTime.now();
    return [
      Appointment(
        id: '1',
        customerId: 'user1',
        customerName: 'Ali Yılmaz',
        customerPhone: '5551234567',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'sac-kesimi',
        serviceName: 'Saç Kesimi',
        servicePrice: 150,
        serviceDuration: 30,
        date: now.add(const Duration(days: 2)),
        time: '14:00',
        status: AppointmentStatus.confirmed,
        createdAt: now,
        updatedAt: now,
      ),
      Appointment(
        id: '2',
        customerId: 'user1',
        customerName: 'Ali Yılmaz',
        customerPhone: '5551234567',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'sakal-kesimi',
        serviceName: 'Sakal Kesimi',
        servicePrice: 80,
        serviceDuration: 20,
        date: now.add(const Duration(days: 5)),
        time: '16:00',
        status: AppointmentStatus.pending,
        createdAt: now,
        updatedAt: now,
      ),
      Appointment(
        id: '3',
        customerId: 'user1',
        customerName: 'Ali Yılmaz',
        customerPhone: '5551234567',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'sac-sakal-paket',
        serviceName: 'Saç + Sakal Paket',
        servicePrice: 200,
        serviceDuration: 45,
        date: now.subtract(const Duration(days: 3)),
        time: '15:00',
        status: AppointmentStatus.completed,
        createdAt: now.subtract(const Duration(days: 10)),
        updatedAt: now.subtract(const Duration(days: 3)),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final appointments = _getMockAppointments();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Randevularım'),
      ),
      body: appointments.isEmpty
          ? _buildEmptyState(context)
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: appointments.length,
              itemBuilder: (context, index) {
                return _AppointmentCard(appointment: appointments[index]);
              },
            ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1,
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

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.event_busy, size: 80, color: AppColors.textSecondary.withOpacity(0.5)),
          const SizedBox(height: 16),
          Text(
            'Henüz randevunuz yok',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const SizedBox(height: 8),
          Text(
            'Yeni randevu oluşturmak için + butonuna tıklayın',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppColors.textSecondary,
                ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _AppointmentCard extends StatelessWidget {
  final Appointment appointment;

  const _AppointmentCard({required this.appointment});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd MMMM yyyy EEEE', 'tr_TR');

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    appointment.serviceName,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ),
                StatusBadge(status: appointment.status),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.person_outline, size: 18, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text(appointment.barberName),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 18, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text(dateFormat.format(appointment.date)),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.access_time, size: 18, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text(appointment.time),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.attach_money, size: 18, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text('${appointment.servicePrice} ₺'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
