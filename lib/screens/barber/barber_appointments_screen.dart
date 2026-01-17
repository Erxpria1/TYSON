import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../models/appointment.dart';
import '../../widgets/status_badge.dart';
import '../../constants/colors.dart';

class BarberAppointmentsScreen extends StatefulWidget {
  const BarberAppointmentsScreen({super.key});

  @override
  State<BarberAppointmentsScreen> createState() => _BarberAppointmentsScreenState();
}

class _BarberAppointmentsScreenState extends State<BarberAppointmentsScreen> {
  String _selectedFilter = 'all';

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
        date: now,
        time: '14:00',
        status: AppointmentStatus.confirmed,
        createdAt: now,
        updatedAt: now,
      ),
      Appointment(
        id: '2',
        customerId: 'user2',
        customerName: 'Mehmet Demir',
        customerPhone: '5559876543',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'sakal-kesimi',
        serviceName: 'Sakal Kesimi',
        servicePrice: 80,
        serviceDuration: 20,
        date: now,
        time: '16:00',
        status: AppointmentStatus.pending,
        createdAt: now,
        updatedAt: now,
      ),
      Appointment(
        id: '3',
        customerId: 'user3',
        customerName: 'Ahmet Kaya',
        customerPhone: '5552223344',
        barberId: 'omer-jr',
        barberName: 'Ömer Jr',
        serviceId: 'sac-sakal-paket',
        serviceName: 'Saç + Sakal Paket',
        servicePrice: 200,
        serviceDuration: 45,
        date: now.add(const Duration(days: 1)),
        time: '15:00',
        status: AppointmentStatus.confirmed,
        createdAt: now,
        updatedAt: now,
      ),
      Appointment(
        id: '4',
        customerId: 'user4',
        customerName: 'Can Öztürk',
        customerPhone: '5556667788',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'tam-bakim-paket',
        serviceName: 'Tam Bakım Paket',
        servicePrice: 280,
        serviceDuration: 60,
        date: now.subtract(const Duration(days: 1)),
        time: '11:00',
        status: AppointmentStatus.completed,
        createdAt: now.subtract(const Duration(days: 5)),
        updatedAt: now.subtract(const Duration(days: 1)),
      ),
      Appointment(
        id: '5',
        customerId: 'user5',
        customerName: 'Emre Yıldız',
        customerPhone: '5553334455',
        barberId: 'tarik-bey',
        barberName: 'Tarık Bey',
        serviceId: 'cilt-bakimi',
        serviceName: 'Cilt Bakımı',
        servicePrice: 100,
        serviceDuration: 25,
        date: now.add(const Duration(days: 2)),
        time: '10:00',
        status: AppointmentStatus.cancelled,
        createdAt: now.subtract(const Duration(days: 2)),
        updatedAt: now,
      ),
    ];
  }

  List<Appointment> _getFilteredAppointments() {
    final appointments = _getMockAppointments();
    if (_selectedFilter == 'all') return appointments;

    final status = AppointmentStatus.values.firstWhere(
      (s) => s.toString().split('.').last == _selectedFilter,
    );
    return appointments.where((a) => a.status == status).toList();
  }

  @override
  Widget build(BuildContext context) {
    final appointments = _getFilteredAppointments();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Randevular'),
        automaticallyImplyLeading: false,
      ),
      body: Column(
        children: [
          // Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                _buildFilterChip('Tümü', 'all'),
                _buildFilterChip('Bekleyen', 'pending'),
                _buildFilterChip('Onaylı', 'confirmed'),
                _buildFilterChip('İptal', 'cancelled'),
                _buildFilterChip('Tamamlandı', 'completed'),
              ],
            ),
          ),
          // Appointments List
          Expanded(
            child: appointments.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: appointments.length,
                    itemBuilder: (context, index) {
                      return _AppointmentCard(appointment: appointments[index]);
                    },
                  ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1,
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

  Widget _buildFilterChip(String label, String value) {
    final isSelected = _selectedFilter == value;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (selected) {
          setState(() => _selectedFilter = value);
        },
        backgroundColor: Colors.white,
        selectedColor: AppColors.secondary.withOpacity(0.2),
        checkmarkColor: AppColors.secondary,
        labelStyle: TextStyle(
          color: isSelected ? AppColors.secondary : AppColors.text,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        ),
        side: BorderSide(
          color: isSelected ? AppColors.secondary : AppColors.border,
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.event_busy,
            size: 80,
            color: AppColors.textSecondary.withOpacity(0.5),
          ),
          const SizedBox(height: 16),
          Text(
            'Randevu bulunamadı',
            style: Theme.of(context).textTheme.headlineMedium,
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
    final dateFormat = DateFormat('dd MMM yyyy', 'tr_TR');

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
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
                    appointment.customerName,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ),
                StatusBadge(status: appointment.status),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.phone, size: 16, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text(appointment.customerPhone),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.content_cut, size: 16, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text(appointment.serviceName),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 16, color: AppColors.textSecondary),
                const SizedBox(width: 8),
                Text('${dateFormat.format(appointment.date)} - ${appointment.time}'),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.attach_money, size: 16, color: AppColors.textSecondary),
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
