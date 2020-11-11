export class InvalidParamError extends Error {
  constructor (errorParamName: string) {
    super(`Invalid param(s): ${errorParamName}`)
    this.name = this.constructor.name
  }
}
