import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:intl/intl.dart';
import '../../constants/services.dart';
import '../../widgets/premium_button.dart';
import '../../constants/colors.dart';

class WhatsAppBookingScreen extends StatefulWidget {
  const WhatsAppBookingScreen({super.key});

  @override
  State<WhatsAppBookingScreen> createState() => _WhatsAppBookingScreenState();
}

class _WhatsAppBookingScreenState extends State<WhatsAppBookingScreen> {
  int _currentStep = 0;
  String? _selectedBarberId;
  DateTime? _selectedDate;
  String? _selectedTime;
  String? _selectedServiceId;
  final _nameController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < 4) {
      setState(() => _currentStep++);
    } else {
      _sendWhatsAppMessage();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    } else {
      context.go('/');
    }
  }

  bool get _canProceed {
    switch (_currentStep) {
      case 0:
        return _selectedBarberId != null;
      case 1:
        return _selectedDate != null;
      case 2:
        return _selectedTime != null;
      case 3:
        return _selectedServiceId != null;
      case 4:
        return _nameController.text.isNotEmpty;
      default:
        return false;
    }
  }

  Future<void> _sendWhatsAppMessage() async {
    final barber = AppConstants.barbers.firstWhere((b) => b.id == _selectedBarberId);
    final service = AppConstants.services.firstWhere((s) => s.id == _selectedServiceId);
    final dateFormat = DateFormat('dd MMMM yyyy EEEE', 'tr_TR');

    final message = '''
Merhaba, randevu almak istiyorum.

İsim: ${_nameController.text}
Berber: ${barber.name}
Hizmet: ${service.name}
Tarih: ${dateFormat.format(_selectedDate!)}
Saat: $_selectedTime

Teşekkürler.
''';

    final whatsappUrl = Uri.parse(
      'https://wa.me/${AppConstants.whatsappNumber}?text=${Uri.encodeComponent(message)}',
    );

    if (await canLaunchUrl(whatsappUrl)) {
      await launchUrl(whatsappUrl, mode: LaunchMode.externalApplication);
      if (mounted) {
        context.go('/');
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('WhatsApp açılamadı'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('WhatsApp ile Randevu'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: _previousStep,
        ),
      ),
      body: Column(
        children: [
          // Progress Indicator
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(5, (index) {
                return Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: index <= _currentStep ? AppColors.whatsapp : Colors.grey[300],
                    shape: BoxShape.circle,
                  ),
                );
              }),
            ),
          ),
          Expanded(
            child: IndexedStack(
              index: _currentStep,
              children: [
                _buildBarberSelection(),
                _buildDateSelection(),
                _buildTimeSelection(),
                _buildServiceSelection(),
                _buildNameInput(),
              ],
            ),
          ),
          // Bottom Button
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: PremiumButton(
                text: _currentStep == 4 ? 'WhatsApp\'ta Aç' : 'Devam',
                variant: _currentStep == 4 ? ButtonVariant.whatsapp : ButtonVariant.primary,
                icon: _currentStep == 4 ? Icons.whatsapp : null,
                onPressed: _canProceed ? _nextStep : null,
                width: double.infinity,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBarberSelection() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Berber Seçin',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        ...AppConstants.barbers.map((barber) {
          final isSelected = _selectedBarberId == barber.id;
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            color: isSelected ? AppColors.whatsapp.withOpacity(0.1) : null,
            child: InkWell(
              onTap: () => setState(() => _selectedBarberId = barber.id),
              borderRadius: BorderRadius.circular(16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: AppColors.secondary,
                      child: Text(
                        barber.name[0],
                        style: const TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            barber.name,
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                          if (barber.isOwner) ...[
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.gold.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Text(
                                'Salon Sahibi',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.gold,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    if (isSelected)
                      const Icon(Icons.check_circle, color: AppColors.whatsapp),
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
                    color: isSelected ? AppColors.whatsapp : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected ? AppColors.whatsapp : AppColors.border,
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
                  color: isSelected ? AppColors.whatsapp : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isSelected ? AppColors.whatsapp : AppColors.border,
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
            color: isSelected ? AppColors.whatsapp.withOpacity(0.1) : null,
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
                        color: AppColors.whatsapp.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.content_cut, color: AppColors.whatsapp),
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
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Text(
                                '${service.price} ₺',
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.whatsapp,
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
                      const Icon(Icons.check_circle, color: AppColors.whatsapp),
                  ],
                ),
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildNameInput() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'İsim ve İletişim',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        TextField(
          controller: _nameController,
          decoration: const InputDecoration(
            labelText: 'Adınız Soyadınız',
            prefixIcon: Icon(Icons.person_outline),
          ),
          onChanged: (_) => setState(() {}),
        ),
      ],
    );
  }
}
