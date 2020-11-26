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

    accountConnection = await sut.getCollection('accounts')
    expect(accountConnection).toBeTruthy()
  })

  test('Should verify connection before open another one', async () => {
    let currentClient = await sut.verifyConnection(sut.client)
    expect(sut.client).toBe(currentClient)

    await sut.disconnect()
    expect(sut.client).toBeNull()
    currentClient = await sut.verifyConnection(sut.client)
    expect(currentClient).toBeTruthy()
  })

  test('Should connection method open another one', async () => {
    const client = sut.client
    await sut.disconnect()
    expect(client).toBeTruthy()

    await sut.connect(sut.uri)
    const currentClient = sut.client
    expect(currentClient).toBeTruthy()

    expect(currentClient).not.toEqual(client)
  })
})
