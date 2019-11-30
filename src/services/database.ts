/*
  PouchDB Database Service

  Packages to install:
    npm install --save-exact pouchdb-core pouchdb-adapter-http pouchdb-mapreduce pouchdb-replication pouchdb-find pouchdb-debug
    npm install --save-exact @scdf/pouchdb-adapter-indexeddb
    npm install --save-exact pouchdb-adapter-utils
    npm install -D @types/pouchdb-core @types/pouchdb-find @types/pouchdb-mapreduce @types/pouchdb-replication

  Aditional types are needed:
    shims-pouchdb-adapter-indexeddb.d.ts
    shims-pouchdb-debug.d.ts
    shims-pouchdb-adapter-http.d.ts

  
  Usage:

  import { database } from '@/services/database'

  const dbPromise = database.open('nanoAPPs-DB')
  // wait for database
  const db = await dbPromise

  ...
  
*/
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
