import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { EmailValidation } from './email-validation'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return { sut, emailValidatorStub }
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('EmailValidation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any@mail.com')
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
