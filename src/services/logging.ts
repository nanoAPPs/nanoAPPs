/**
 * debug
 *
 * @library
 * https://github.com/visionmedia/debug
 *
 */

// Lib imports
import debug from 'debug'
import { Dictionary } from 'typescript-collections'

debug.enable('nanoapps:*,pouchdb:*,-pouchdb:api')
const loggers: Dictionary<string, debug.Debugger> = new Dictionary()

export function getLogger(name: string): debug.Debugger {
  let logger = loggers.getValue(name)
  if (logger === undefined) {
    logger = debug('nanoapps:' + name)
    loggers.setValue(name, logger)
  }
  return logger
}
