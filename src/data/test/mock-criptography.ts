import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.random.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.digest)
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return Promise.resolve(this.isValid)
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.random.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.ciphertext)
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return Promise.resolve(this.plaintext)
  }
}

// export const mockDecrypter = (): Decrypter => {
//   class DecrypterStub implements Decrypter {
//     async decrypt (token: string): Promise<string> {
//       return 'any_value'
//     }
//   }
//   return new DecrypterStub()
// }

// export const mockEncrypter = (): Encrypter => {
//   class TokenGeneratorStub implements Encrypter {
//     async encrypt (id: string): Promise<string> {
//       return 'any_token'
//     }
//   }
//   return new TokenGeneratorStub()
// }

// export const mockHashComparer = (): HashComparer => {
//   class HashComparerStub implements HashComparer {
//     async compare (value: string, hash: string): Promise<boolean> {
//       return true
//     }
//   }
//   return new HashComparerStub()
// }
