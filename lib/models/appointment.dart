import 'package:cloud_firestore/cloud_firestore.dart';

enum AppointmentStatus {
  pending,
  confirmed,
  cancelled,
  completed,
}

class Appointment {
  final String id;
  final String customerId;
  final String customerName;
  final String customerPhone;
  final String? customerUid;
  final String barberId;
  final String barberName;
  final String serviceId;
  final String serviceName;
  final double servicePrice;
  final int serviceDuration;
  final DateTime date;
  final String time;
  final AppointmentStatus status;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  Appointment({
    required this.id,
    required this.customerId,
    required this.customerName,
    required this.customerPhone,
    this.customerUid,
    required this.barberId,
    required this.barberName,
    required this.serviceId,
    required this.serviceName,
    required this.servicePrice,
    required this.serviceDuration,
    required this.date,
    required this.time,
    required this.status,
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Appointment.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Appointment(
      id: doc.id,
      customerId: data['customerId'] ?? '',
      customerName: data['customerName'] ?? '',
      customerPhone: data['customerPhone'] ?? '',
      customerUid: data['customerUid'],
      barberId: data['barberId'] ?? '',
      barberName: data['barberName'] ?? '',
      serviceId: data['serviceId'] ?? '',
      serviceName: data['serviceName'] ?? '',
      servicePrice: (data['servicePrice'] ?? 0).toDouble(),
      serviceDuration: data['serviceDuration'] ?? 0,
      date: (data['date'] as Timestamp?)?.toDate() ?? DateTime.now(),
      time: data['time'] ?? '',
      status: _statusFromString(data['status']),
      notes: data['notes'],
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'customerId': customerId,
      'customerName': customerName,
      'customerPhone': customerPhone,
      'customerUid': customerUid,
      'barberId': barberId,
      'barberName': barberName,
      'serviceId': serviceId,
      'serviceName': serviceName,
      'servicePrice': servicePrice,
      'serviceDuration': serviceDuration,
      'date': Timestamp.fromDate(date),
      'time': time,
      'status': _statusToString(status),
      'notes': notes,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
    };
  }

  static AppointmentStatus _statusFromString(String? status) {
    switch (status) {
      case 'confirmed':
        return AppointmentStatus.confirmed;
      case 'cancelled':
        return AppointmentStatus.cancelled;
      case 'completed':
        return AppointmentStatus.completed;
      default:
        return AppointmentStatus.pending;
    }
  }

  static String _statusToString(AppointmentStatus status) {
    switch (status) {
      case AppointmentStatus.confirmed:
        return 'confirmed';
      case AppointmentStatus.cancelled:
        return 'cancelled';
      case AppointmentStatus.completed:
        return 'completed';
      case AppointmentStatus.pending:
        return 'pending';
    }
  }

  Appointment copyWith({
    String? id,
    String? customerId,
    String? customerName,
    String? customerPhone,
    String? customerUid,
    String? barberId,
    String? barberName,
    String? serviceId,
    String? serviceName,
    double? servicePrice,
    int? serviceDuration,
    DateTime? date,
    String? time,
    AppointmentStatus? status,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Appointment(
      id: id ?? this.id,
      customerId: customerId ?? this.customerId,
      customerName: customerName ?? this.customerName,
      customerPhone: customerPhone ?? this.customerPhone,
      customerUid: customerUid ?? this.customerUid,
      barberId: barberId ?? this.barberId,
      barberName: barberName ?? this.barberName,
      serviceId: serviceId ?? this.serviceId,
      serviceName: serviceName ?? this.serviceName,
      servicePrice: servicePrice ?? this.servicePrice,
      serviceDuration: serviceDuration ?? this.serviceDuration,
      date: date ?? this.date,
      time: time ?? this.time,
      status: status ?? this.status,
      notes: notes ?? this.notes,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
