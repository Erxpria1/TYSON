import 'package:cloud_firestore/cloud_firestore.dart';

enum UserRole {
  customer,
  barber,
}

class User {
  final String uid;
  final String email;
  final String name;
  final String phone;
  final UserRole role;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.uid,
    required this.email,
    required this.name,
    required this.phone,
    required this.role,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return User(
      uid: doc.id,
      email: data['email'] ?? '',
      name: data['name'] ?? '',
      phone: data['phone'] ?? '',
      role: data['role'] == 'barber' ? UserRole.barber : UserRole.customer,
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'email': email,
      'name': name,
      'phone': phone,
      'role': role == UserRole.barber ? 'barber' : 'customer',
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
    };
  }

  User copyWith({
    String? uid,
    String? email,
    String? name,
    String? phone,
    UserRole? role,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return User(
      uid: uid ?? this.uid,
      email: email ?? this.email,
      name: name ?? this.name,
      phone: phone ?? this.phone,
      role: role ?? this.role,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
