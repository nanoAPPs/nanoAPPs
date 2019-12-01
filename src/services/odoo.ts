import axios from 'axios'
import { AxiosInstance } from 'axios'
// Log
import { getLogger } from '@/services/logging'
import { strict } from 'assert'
const log = getLogger('odoo')

export class OdooClient {
  private _axiosClient: AxiosInstance
  private _authenticated: boolean = false
  private _serverVersion: string = '0.00'
  private _context = {}

  constructor(serverUrl: string) {
    this._axiosClient = axios.create({
      baseURL: serverUrl,
      timeout: 3000,
      withCredentials: true,
      headers: { 'Content-type': 'application/json' },
    })
  }

  public get isAuthenticated() {
    return this._authenticated
  }

  public get serverVersion() {
    return this._serverVersion
  }

  public get context() {
    return this._context
  }

  public async authenticate(database: string, username: string, password: string) {
    return this._axiosClient
      .post('/web/session/authenticate', {
        jsonrpc: '2.0',
        params: {
          db: database,
          login: username,
          password: password,
        },
      })
      .then(
        response => {
          log(response)
          if (response.data.error) {
            let errorMessage = response.data.error.message
            if (response.data.error.data.arguments) {
              errorMessage = errorMessage + '. ' + response.data.error.data.arguments[0]
            }
            throw errorMessage
          }
          if (response.data.result) {
            if (response.data.result.uid) {
              this._authenticated = true
              this._serverVersion = response.data.result.server_version
              this._context = response.data.result.user_context
              return true
            }
          }
          this._authenticated = false
          throw 'Invalid login credentials'
        },
        error => {
          log(error)
          this._authenticated = false
          let errorMessage: string
          if (!error.response) {
            errorMessage = 'Odoo server unreachable'
          } else {
            errorMessage = error.response.data.message
          }
          throw errorMessage
        }
      )
  }

  public async search_read(model: string, domain: Array<any>, fields: Array<any>) {
    return this._axiosClient
      .post('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        params: {
          model: model,
          method: 'search_read',
          args: [domain, fields],
          kwargs: {
            context: { lang: 'es_ES' },
          },
        },
      })
      .then(
        response => {
          log(response)
          if (response.data.error) {
            let errorMessage = response.data.error.message
            if (response.data.error.data.arguments) {
              errorMessage = errorMessage + '. ' + response.data.error.data.arguments[0]
            }
            throw errorMessage
          }
          return response.data.result
        },
        error => {
          log(error)
          let errorMessage: string
          if (!error.response) {
            errorMessage = 'Odoo server unreachable'
          } else {
            errorMessage = error.response.data.message
          }
          throw errorMessage
        }
      )
  }
}
