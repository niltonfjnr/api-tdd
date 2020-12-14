import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError, ServerError } from '../errors'
import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpResquest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpResquest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
