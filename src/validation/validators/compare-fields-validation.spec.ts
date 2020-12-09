import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}
const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  return { sut }
}

describe('CompareFieldsValidation', () => {
  test('Should return a InvalidParamError if Validation fails', () => {
    const { sut } = makeSut()

    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'wrong_name'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_name'
    })
    expect(error).toBeFalsy()
  })
})
