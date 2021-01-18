import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { mockAddAccountRepository, HasherSpy, mockLoadAccountByEmailRepository } from '@/data/test'

import {
  AccountModel, AddAccountRepository, LoadAccountByEmailRepository
} from './db-add-account-protocols'

import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = new HasherSpy()
  const addAccountRepositoryStub = mockAddAccountRepository()

  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValue(Promise.resolve(null as unknown as AccountModel))

  return {
    sut: new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub),
    hasherSpy: hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCases', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plainText).toBe(addAccountParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const account = await sut.add(addAccountParams)
    expect(addAccountParams.password).toBe(account.password)
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccountModel()))

    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
