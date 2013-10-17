#!/usr/bin/env node

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('SWORDS!!!\n');
process.stdout.write('---------\n');
process.stdout.write('A game of bladesmanship, from an original idea by gretcher\n');
process.stdout.write('v0.1.0 © 2013 kapowaz\n');

process.stdin.on('data', function(chunk) {
  switch (true) {
    case (chunk == 'help\n'):
      process.stdout.write('Available commands: quit, help\n');
      break;
    case (chunk == 'quit\n'):
    case (chunk == 'exit\n'):
      process.stdout.write('Thanks for playing!\n');
      process.exit(0);
      break;
    default:
      process.stdout.write('Unknown command ‘' + chunk.replace('\n','') + '’');
      break;
  }
});

// process.stdin.on('end', function() {
//   process.stdout.write('end');
// });