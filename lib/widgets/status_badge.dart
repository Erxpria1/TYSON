import 'package:flutter/material.dart';
import '../models/appointment.dart';
import '../constants/colors.dart';

class StatusBadge extends StatelessWidget {
  final AppointmentStatus status;

  const StatusBadge({super.key, required this.status});

  Color _getColor() {
    switch (status) {
      case AppointmentStatus.pending:
        return AppColors.pending;
      case AppointmentStatus.confirmed:
        return AppColors.confirmed;
      case AppointmentStatus.cancelled:
        return AppColors.cancelled;
      case AppointmentStatus.completed:
        return AppColors.completed;
    }
  }

  String _getText() {
    switch (status) {
      case AppointmentStatus.pending:
        return 'Beklemede';
      case AppointmentStatus.confirmed:
        return 'Onaylandı';
      case AppointmentStatus.cancelled:
        return 'İptal Edildi';
      case AppointmentStatus.completed:
        return 'Tamamlandı';
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _getColor();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        _getText(),
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
