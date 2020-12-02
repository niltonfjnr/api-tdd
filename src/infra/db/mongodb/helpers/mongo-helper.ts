import { Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  static client: MongoClient
  static uri: string

  static async connect (uri: string): Promise<void> {
    MongoHelper.uri = uri
    MongoHelper.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  static async disconnect (): Promise<void> {
    await MongoHelper.client.close()
    Object.assign(MongoHelper, { client: null })
  }

  static async getCollection (name: string): Promise<Collection> {
    const client = await MongoHelper.verifyConnection()
    return client.db().collection(name)
  }

  static async verifyConnection (connection: MongoClient = MongoHelper.client): Promise<MongoClient> {
    if (!!connection && connection.isConnected()) {
      return connection
    } else {
      await MongoHelper.connect(MongoHelper.uri)
      return MongoHelper.client
    }
  }

  static map (account: any): any {
    const { _id, ...accountWithoutInternalId } = account
    return Object.assign({}, accountWithoutInternalId, { id: _id })
  }
}
