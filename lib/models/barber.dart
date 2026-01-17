class Barber {
  final String id;
  final String name;
  final bool isOwner;
  final String? whatsappNumber;

  Barber({
    required this.id,
    required this.name,
    this.isOwner = false,
    this.whatsappNumber,
  });

  Barber copyWith({
    String? id,
    String? name,
    bool? isOwner,
    String? whatsappNumber,
  }) {
    return Barber(
      id: id ?? this.id,
      name: name ?? this.name,
      isOwner: isOwner ?? this.isOwner,
      whatsappNumber: whatsappNumber ?? this.whatsappNumber,
    );
  }
}
