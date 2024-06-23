import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseService {
  static const String _databaseName = 'Spendwise.db';
  static const int _databaseVersion = 1;

  static const String accountTable = 'Accounts';
  static const String transactionTable = 'Transactions';
  static const String categoryTable = 'Categories';

  DatabaseService._init();
  static final DatabaseService instance = DatabaseService._init();

  static Database? _database;

  Future _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE $accountTable (
        id CHAR(10) PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        starting_balance REAL NOT NULL,
        current_balance REAL NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE $categoryTable (
        id CHAR(10) PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE $transactionTable (
        id CHAR(10) PRIMARY KEY,
        account_id CHAR(10) NOT NULL,
        category_id CHAR(10) NOT NULL,
        type TEXT NOT NULL,
        datetime TEXT NOT NULL,
        amount REAL NOT NULL,
        note TEXT,
        FOREIGN KEY(account_id) REFERENCES $accountTable(id),
        FOREIGN KEY(category_id) REFERENCES $categoryTable(id)
      )
    ''');
  }

  Future<Database> _initDatabase() async {
    final documentsDirectory = await getApplicationDocumentsDirectory();
    final path = join(documentsDirectory.path, _databaseName);
    return openDatabase(path, version: _databaseVersion, onCreate: _onCreate);
  }

  Future<Database> get database async {
    if (_database != null) {
      return _database!;
    }

    _database = await _initDatabase();
    return _database!;
  }

  void close() async {
    final db = await instance.database;
    _database = null;
    await db.close();
  }
}
