class Transaction {
  final String id;
  final String accountId;
  final String categoryId;
  final String type;
  final DateTime dateTime;
  final double amount;
  String? note;

  Transaction({
    required this.id,
    required this.accountId,
    required this.categoryId,
    required this.type,
    required this.dateTime,
    required this.amount,
    this.note,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'account_id': accountId,
        'category_id': categoryId,
        'type': type,
        'datetime': dateTime.toIso8601String(),
        'amount': amount,
        'note': note,
      };

  factory Transaction.fromMap(Map<String, dynamic> map) => Transaction(
        id: map['id'],
        accountId: map['account_id'],
        categoryId: map['category_id'],
        type: map['type'],
        dateTime: DateTime.parse(map['datetime']),
        amount: map['amount'],
        note: map['note'],
      );
}
