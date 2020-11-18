import { Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  static client: MongoClient

  static async connect (uri: string): Promise<void> {
    MongoHelper.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  static async disconnect (): Promise<void> {
    await MongoHelper.client.close()
  }

  static getCollection (name: string): Collection {
    return MongoHelper.client.db().collection(name)
  }

  static map (account: any): any {
    const { _id, ...accountWithoutInternalId } = account
    return Object.assign({}, accountWithoutInternalId, { id: _id })
  }
}
