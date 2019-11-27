import PouchDB from 'pouchdb-core'
import indexeddb from '@scdf/pouchdb-adapter-indexeddb'
import httpPouch from 'pouchdb-adapter-http'
import mapreduce from 'pouchdb-mapreduce'
import replication from 'pouchdb-replication'
import find from 'pouchdb-find'
import debugPlugin from 'pouchdb-debug'
import { Dictionary } from 'typescript-collections'
import { getLogger } from '@/services/logging'

const log = getLogger('database')

// Custom load PouchDB (selected modules only)
PouchDB.plugin(indexeddb)
PouchDB.plugin(httpPouch)
PouchDB.plugin(mapreduce)
PouchDB.plugin(replication)
PouchDB.plugin(find)

// Enable PouchDB debug (only for initial testing)
PouchDB.plugin(debugPlugin)
// PouchDB.debug.enable('pouchdb:*')
// PouchDB.debug.enable('pouchdb:*,-pouchdb:api')

const dbs: Dictionary<string, any> = new Dictionary()

export const database = {
  async open(name: string) {
    log('open', 'Open database ' + name)
    let db = dbs.getValue(name)
    if (db === undefined) {
      db = new PouchDB(name)
      dbs.setValue(name, db)
    }
    log('open', 'opening ...')
    const info = await db.info()
    log('open', 'done!', info)
    return db
  },
  async close(name: string) {
    log('close', 'Close database ' + name)
    const db = dbs.getValue(name)
    if (db === undefined) {
      log('close', 'Already closed!')
    } else {
      const promise = db.close()
      log('close', 'closing ...')
      dbs.remove(name)
      await promise
      log('close', 'done!')
    }
  },
  /*
  async closeAll() {
    for (const db in dbs.values()) {
      db.close()
    }
  },*/
}
