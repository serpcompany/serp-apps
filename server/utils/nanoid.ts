import { customAlphabet, nanoid } from 'nanoid'

export const generateNumericCode = (length: number = 6) => {
  return customAlphabet('0123456789', length)()
}

export const generateAlphaNumericCode = (length: number = 6) => {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)()
}

export const generateRandomId = (length: number = 16) => {
  return nanoid(length)
}
