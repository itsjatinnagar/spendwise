class Account {
  final String id;
  final String name;
  final double startingBalance;
  final double currentBalance;

  Account({
    required this.id,
    required this.name,
    required this.startingBalance,
    required this.currentBalance,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'starting_balance': startingBalance,
        'current_balance': currentBalance,
      };

  factory Account.fromMap(Map<String, dynamic> map) => Account(
        id: map['id'],
        name: map['name'],
        startingBalance: map['starting_balance'],
        currentBalance: map['current_balance'],
      );

  Account copyWith({
    String? id,
    String? name,
    double? startingBalance,
    double? currentBalance,
  }) =>
      Account(
        id: id ?? this.id,
        name: name ?? this.name,
        startingBalance: startingBalance ?? this.startingBalance,
        currentBalance: currentBalance ?? this.currentBalance,
      );
}
