import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../constants/services.dart';
import '../../widgets/premium_button.dart';
import '../../constants/colors.dart';

class NewAppointmentScreen extends StatefulWidget {
  const NewAppointmentScreen({super.key});

  @override
  State<NewAppointmentScreen> createState() => _NewAppointmentScreenState();
}

class _NewAppointmentScreenState extends State<NewAppointmentScreen> {
  int _currentStep = 0;
  String? _selectedServiceId;
  DateTime? _selectedDate;
  String? _selectedTime;

  void _nextStep() {
    if (_currentStep < 2) {
      setState(() => _currentStep++);
    } else {
      _showConfirmationDialog();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  bool get _canProceed {
    switch (_currentStep) {
      case 0:
        return _selectedServiceId != null;
      case 1:
        return _selectedDate != null;
      case 2:
        return _selectedTime != null;
      default:
        return false;
    }
  }

  void _showConfirmationDialog() {
    final service = AppConstants.services.firstWhere((s) => s.id == _selectedServiceId);
    final dateFormat = DateFormat('dd MMMM yyyy EEEE', 'tr_TR');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Randevu Onayı'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Hizmet: ${service.name}'),
            Text('Tarih: ${dateFormat.format(_selectedDate!)}'),
            Text('Saat: $_selectedTime'),
            Text('Ücret: ${service.price} ₺'),
            Text('Süre: ${service.duration} dakika'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Randevu başarıyla oluşturuldu!'),
                  backgroundColor: AppColors.success,
                ),
              );
              context.go('/customer/appointments');
            },
            child: const Text('Onayla'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Yeni Randevu'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: _currentStep > 0 ? _previousStep : () => context.pop(),
        ),
      ),
      body: Column(
        children: [
          // Progress Indicator
          LinearProgressIndicator(
            value: (_currentStep + 1) / 3,
            backgroundColor: Colors.grey[200],
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
          ),
          Expanded(
            child: IndexedStack(
              index: _currentStep,
              children: [
                _buildServiceSelection(),
                _buildDateSelection(),
                _buildTimeSelection(),
              ],
            ),
          ),
          // Bottom Button
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: PremiumButton(
                text: _currentStep == 2 ? 'Randevu Oluştur' : 'Devam',
                onPressed: _canProceed ? _nextStep : null,
                width: double.infinity,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceSelection() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Hizmet Seçin',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        ...AppConstants.services.map((service) {
          final isSelected = _selectedServiceId == service.id;
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            color: isSelected ? AppColors.secondary.withOpacity(0.1) : null,
            child: InkWell(
              onTap: () => setState(() => _selectedServiceId = service.id),
              borderRadius: BorderRadius.circular(16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        color: AppColors.secondary.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.content_cut, color: AppColors.secondary),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            service.name,
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                          if (service.description != null) ...[
                            const SizedBox(height: 4),
                            Text(
                              service.description!,
                              style: Theme.of(context).textTheme.bodySmall,
                            ),
                          ],
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Text(
                                '${service.price} ₺',
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.secondary,
                                ),
                              ),
                              const SizedBox(width: 16),
                              Text(
                                '${service.duration} dk',
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    if (isSelected)
                      const Icon(Icons.check_circle, color: AppColors.secondary),
                  ],
                ),
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildDateSelection() {
    final today = DateTime.now();
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Tarih Seçin',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        SizedBox(
          height: 100,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: 14,
            itemBuilder: (context, index) {
              final date = today.add(Duration(days: index));
              final isSelected = _selectedDate?.day == date.day &&
                  _selectedDate?.month == date.month;
              return GestureDetector(
                onTap: () => setState(() => _selectedDate = date),
                child: Container(
                  width: 80,
                  margin: const EdgeInsets.only(right: 12),
                  decoration: BoxDecoration(
                    color: isSelected ? AppColors.secondary : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected ? AppColors.secondary : AppColors.border,
                      width: 2,
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        DateFormat('E', 'tr_TR').format(date),
                        style: TextStyle(
                          color: isSelected ? Colors.white : AppColors.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        DateFormat('d').format(date),
                        style: TextStyle(
                          color: isSelected ? Colors.white : AppColors.text,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        DateFormat('MMM', 'tr_TR').format(date),
                        style: TextStyle(
                          color: isSelected ? Colors.white : AppColors.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildTimeSelection() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Saat Seçin',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 2,
          ),
          itemCount: AppConstants.timeSlots.length,
          itemBuilder: (context, index) {
            final time = AppConstants.timeSlots[index];
            final isSelected = _selectedTime == time;
            return InkWell(
              onTap: () => setState(() => _selectedTime = time),
              borderRadius: BorderRadius.circular(12),
              child: Container(
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.secondary : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isSelected ? AppColors.secondary : AppColors.border,
                    width: 2,
                  ),
                ),
                child: Center(
                  child: Text(
                    time,
                    style: TextStyle(
                      color: isSelected ? Colors.white : AppColors.text,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
