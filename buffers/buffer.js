import { Buffer } from 'buffer';

const memoryContainer = Buffer.alloc(4) // 4 bytes (32 bits)

memoryContainer[0] = 0xf4 // 11110100
memoryContainer[1] = 0x34
memoryContainer[2] = 0xb6
memoryContainer[3] = 0xff

console.log(memoryContainer.toString("hex"))
console.log(memoryContainer[0])
console.log(memoryContainer[1])
console.log(memoryContainer[2])
console.log(memoryContainer[3])

const buff = Buffer.from("Hi!", "utf8");
console.log(buff)