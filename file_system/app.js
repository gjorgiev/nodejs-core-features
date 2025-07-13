import { watch, open, rename, unlink, appendFile } from "fs/promises";

(async () => {
  // commands
  const CREATE_FILE = 'create a file'
  const DELETE_FILE = 'delete the file'
  const RENAME_FILE = 'rename the file'
  const ADD_TO_FILE = 'add to the file'

  const createFile = async (path) => {
    let existingFileHandle;
    try {
      // we want to check if we already have that file
      existingFileHandle = await open(path, 'r')
      existingFileHandle.close()
      // we already have that file
      return console.log(`The file ${path} already exists.`)
    } catch (e) {
      // we don't have the file
      // we should create it
      const newFileHandle = await open(path, 'w')
      console.log('A new file was sucessfully created.')
      newFileHandle.close()
    }
  }

  const deleteFile = async (path) => {
    console.log(`Deleting ${path}...`)
    try {
      await unlink(path)
      console.log('The file was sucessfully removed')
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File ${path} not found`)
      }
      console.error(err)
    }
  }

  const renameFile = async (oldPath, newPath) => {
    console.log(`Rename ${oldPath} to ${newPath}`)
    try {
      await rename(oldPath, newPath)
      console.log('The file was successfully renamed')
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File ${path} not found`)
      }
      console.error(err)
    }
  }

  const addToFile = async (path, content) => {
    console.log(`Adding to ${path}`)
    console.log(`Content: ${content}`)
    try {
      const fileHandle = await open(path, content)
      console.log('The content was sucessfully added')
    } catch (err) {
      console.error(err)
    }
  }

  const commandFileHandler = await open("./command.txt", "r")
  commandFileHandler.on('change', async () => {
        // get the size of our file
        const size = (await commandFileHandler.stat()).size
        // allocate our buffer with the size of the file
        const buff = Buffer.alloc(size)
        // the location at which we want to start filling our buffer
        const offset = 0
        // how many bytes we want to read
        const length = size
        // the position that we want to start reading the file from
        const position = 0
        // we always want to read the whole content (from beginning all the way to the end)
        await commandFileHandler.read(buff, offset, length, position)
        const command = buff.toString('utf-8')
        // create a file:
        // create a file <path>
        if (command.includes(CREATE_FILE)) {
          const filePath = command.substring(CREATE_FILE.length + 1)
          createFile(filePath)
        }

        // delete a file
        // usage: delete the file <path>
        if (command.includes(DELETE_FILE)) {
          const filePath = command.substring(DELETE_FILE.length + 1)
          deleteFile(filePath)
        }

        // rename a file
        // usage: rename the file <path> to <new-path>
        if (command.includes(RENAME_FILE)) {
          const _idx = command.indexOf(" to ")
          const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
          const newFilePath = command.substring(_idx + 4)
          renameFile(oldFilePath, newFilePath)
        }

        // add to file
        // usage: add to the file <path> this content: <content>
        if (command.includes(ADD_TO_FILE)) {
          const _idx = command.indexOf(" this content: ")
          const filePath = command.substring(ADD_TO_FILE + 1, _idx)
          const content = command.substring(_idx + 15)

          addToFile(filePath, content)
        }
  })

  const watcher = watch("./")
  for await (const event of watcher) {
    if (event.eventType === 'change'){
      commandFileHandler.emit('change')
    }
  }
})();