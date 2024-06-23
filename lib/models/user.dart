class User {
  final String name;
  final String email;
  final String number;
  final String gender;
  final DateTime createdAt;

  User({
    required this.name,
    required this.email,
    required this.number,
    required this.gender,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() => {
        'name': name,
        'email': email,
        'number': number,
        'gender': gender,
        'createdAt': createdAt.toIso8601String(),
      };

  factory User.fromMap(Map<String, dynamic> map) => User(
        name: map['name'],
        email: map['email'],
        number: map['number'],
        gender: map['gender'],
        createdAt: DateTime.parse(map['createdAt']),
      );

  User copyWith({
    String? name,
    String? email,
    String? number,
    String? gender,
    DateTime? createdAt,
  }) =>
      User(
        createdAt: createdAt ?? this.createdAt,
        email: email ?? this.email,
        gender: gender ?? this.gender,
        name: name ?? this.name,
        number: number ?? this.number,
      );
}
