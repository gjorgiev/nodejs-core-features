// const fs = require('node:fs/promises');

// Execution time: 20s
// CPU usage: 100%
// Memory usage: 45MB
// (async () => {
//   console.time('writeMany')
//   const fileHandle = await fs.open('test.txt', 'w')

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `)
//   }
//   console.timeEnd('writeMany')
// })()

// Execution time: 0.16s
// CPU usage: -
// Memory usage: 26MB
// const fs = require('node:fs')

// ;(async () => {
//   console.time('writeMany')
//   fs.open('test.txt', 'w', (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, 'utf-8')
//       fs.writeSync(fd, buff)
//     }
//   })
//   console.timeEnd('writeMany')
// })()

const fs = require('node:fs/promises')
// Execution time: 20s
// CPU usage: 100%
// Memory usage: 45MB
;(async () => {
  console.time('writeMany')
  const fileHandle = await fs.open('test.txt', 'w')
  const stream = fileHandle.createWriteStream()

  console.log(stream.writableHighWaterMark)
  console.log(stream.writableLength)
  const buff = Buffer.from('string')
  stream.write(buff)
  stream.write(buff)
  console.log(stream.writableLength)
  console.log(buff)

  // for (let i = 0; i < 1000000; i++) {
  //   const buff = Buffer.from(` ${i} `, 'utf-8')
  //   stream.write(buff)
  // }
  console.timeEnd('writeMany')
})()
