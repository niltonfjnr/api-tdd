import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (this.fieldName && !input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    } else {
      return false as unknown as Error
    }
  }
}
