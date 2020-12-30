import {
  AccountModel, AddAccount, AddAccountParams,
  Hasher, AddAccountRepository, LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    let account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.encrypter.hash(accountData.password)
      account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

      return account
    }
    return null as unknown as AccountModel
  }
}
