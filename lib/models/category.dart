class Category {
  final String id;
  final String name;
  final String type;

  Category({
    required this.id,
    required this.name,
    required this.type,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'type': type,
      };

  factory Category.fromMap(Map<String, dynamic> map) => Category(
        id: map['id'],
        name: map['name'],
        type: map['type'],
      );
}
