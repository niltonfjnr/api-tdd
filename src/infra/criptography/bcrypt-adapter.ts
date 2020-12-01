import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) { }

  async hash (value: string): Promise<string> {
    /**
     * This try catch is optional, just simulating cathing an error e throwing it again
     * in a Promise structure
     */
    try {
      const hashedValue = await bcrypt.hash(value, this.salt)
      return hashedValue
    } catch (e) { return await new Promise((resolve, reject) => reject(e)) }
  }
}
