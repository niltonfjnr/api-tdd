export class MissingParamError extends Error {
  constructor (errorParamName: string) {
    super(`Missing param(s): ${errorParamName}`)
    this.name = this.constructor.name
  }
}
