import { Hasher } from '@/data/protocols/criptography/hasher'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.random.uuid()
  plainText: string
  async hash (value: string): Promise<string> {
    this.plainText = value
    return this.digest
  }
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class TokenGeneratorStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }
  return new TokenGeneratorStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
}
