import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  error: Error = null as unknown as Error
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
