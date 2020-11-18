import { MongoClient } from 'mongodb'

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
}
