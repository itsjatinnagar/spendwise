import 'dart:math';

const String lowers = 'xvjabqtpgwhfzmyudnerisoklc';
const String uppers = 'LINQFHCYKSPGZEVDRAJUBWTOMX';
const String digits = '6841097253';

const String characters = '$lowers$uppers$digits';

final _random = Random.secure();

String uuid([int size = 10]) {
  return generateUuid(characters, size);
}

String generateUuid(String seed, int size) {
  final length = seed.length;

  String uuid = '';

  while (0 < size--) {
    uuid += seed[_random.nextInt(length)];
  }

  return uuid;
}
