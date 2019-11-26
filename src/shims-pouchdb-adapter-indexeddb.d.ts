/* tslint:disable:no-namespace */
/* tslint:disable:max-line-length */

// Type definitions for pouchdb-adapter-indexeddb 7.0
// Project: https://pouchdb.com/, https://github.com/pouchdb/pouchdb
// Definitions by: Jose F. Fernandez
// TypeScript Version: 3.5

/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  namespace IndexeddbAdapter {
    interface IndexeddbAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      adapter: 'indexeddb'
    }
  }

  interface Static extends EventEmitter {
    new <Content extends {} = {}>(
      name?: string | null,
      options?:
        | Configuration.DatabaseConfiguration
        | IndexeddbAdapter.IndexeddbAdapterConfiguration
        | HttpAdapter.HttpAdapterConfiguration
    ): Database<Content>
  }
}

declare module '@scdf/pouchdb-adapter-indexeddb' {
  const plugin: PouchDB.Plugin
  export = plugin
}
