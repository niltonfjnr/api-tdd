import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

type SutTypes = {
  sut: RequiredFieldValidation
}
const makeSut = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)

  return { sut }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if Validation fails', () => {
    const { sut } = makeSut('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if no field', () => {
    const { sut } = makeSut(null as unknown as string)
    const error = sut.validate({ name: 'any_name' })
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
