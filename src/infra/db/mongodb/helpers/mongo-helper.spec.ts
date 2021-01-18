import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountConnection = await sut.getCollection('accounts')
    expect(accountConnection).toBeTruthy()

    await sut.disconnect()
    expect(sut.client).toBeNull()

    accountConnection = await sut.getCollection('accounts')
    expect(accountConnection).toBeTruthy()
  })
})
