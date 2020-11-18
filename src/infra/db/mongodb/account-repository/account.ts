import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounst')
    const result = await accountCollection.insertOne(accountData)

    const account = result.ops[0]
    const { _id, ...accountWithoutInternalId } = account

    return Object.assign({}, accountWithoutInternalId, { id: _id })
  }
}
