import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

interface SutTypes {
  sut: AccountMongoRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new AccountMongoRepository()
  }
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const { sut } = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('Account Mongo Repository', () => {
    test('Should return an account on loadByEmail success', async () => {
      const { sut } = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any@mail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const { sut } = makeSut()
      const account = await sut.loadByEmail('any@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccesstoken success', async () => {
      const { sut } = makeSut()
      const result = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      })
      let account = result.ops[0]
      expect(account.accessToken).toBeFalsy()
      await sut.updateAccessToken(account._id, 'any_token')

      account = await accountCollection.findOne({ _id: account._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
})
