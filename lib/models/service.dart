import 'package:cloud_firestore/cloud_firestore.dart';

class Service {
  final String id;
  final String name;
  final String? description;
  final double price;
  final int duration; // in minutes
  final String? image;
  final bool isActive;
  final int sortOrder;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Service({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    required this.duration,
    this.image,
    this.isActive = true,
    this.sortOrder = 0,
    this.createdAt,
    this.updatedAt,
  });

  factory Service.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Service(
      id: doc.id,
      name: data['name'] ?? '',
      description: data['description'],
      price: (data['price'] ?? 0).toDouble(),
      duration: data['duration'] ?? 0,
      image: data['image'],
      isActive: data['isActive'] ?? true,
      sortOrder: data['sortOrder'] ?? 0,
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'name': name,
      'description': description,
      'price': price,
      'duration': duration,
      'image': image,
      'isActive': isActive,
      'sortOrder': sortOrder,
      'createdAt': createdAt != null ? Timestamp.fromDate(createdAt!) : FieldValue.serverTimestamp(),
      'updatedAt': updatedAt != null ? Timestamp.fromDate(updatedAt!) : FieldValue.serverTimestamp(),
    };
  }

  Service copyWith({
    String? id,
    String? name,
    String? description,
    double? price,
    int? duration,
    String? image,
    bool? isActive,
    int? sortOrder,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Service(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      price: price ?? this.price,
      duration: duration ?? this.duration,
      image: image ?? this.image,
      isActive: isActive ?? this.isActive,
      sortOrder: sortOrder ?? this.sortOrder,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
