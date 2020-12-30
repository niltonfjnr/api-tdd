export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authenticationModel: AuthenticationParams) => Promise<string>
}
