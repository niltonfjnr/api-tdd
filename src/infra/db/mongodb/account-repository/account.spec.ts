import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

interface SutTypes {
  sut: AccountMongoRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new AccountMongoRepository()
  }
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
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
