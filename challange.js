// 0100 1000 0110 1001 0010 0001
import { Buffer } from 'buffer';

const memoryContainer = Buffer.alloc(3); // 3 bytes (24 bits)

memoryContainer[0] = 0x48; // 01001000
memoryContainer[1] = 0x69; // 01101001
memoryContainer[2] = 0x21; // 00100001

console.log(memoryContainer.toString("hex")); // Output in hexadecimal
console.log(memoryContainer.toString("utf8")); // Output in UTF-8 string
console.log(memoryContainer.toString("utf16le")); // Output in UTF-16 string