import { customAlphabet, nanoid } from 'nanoid'

export const generateCode = (length: number = 6) => {
  return customAlphabet('0123456789', length)()
}

export const generateRandomId = (length: number = 16) => {
  return nanoid(length)
}
