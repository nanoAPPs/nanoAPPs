/* tslint:disable:no-namespace */
/* tslint:disable:max-line-length */

// Type definitions for pouchdb-http 6.1
// Project: https://pouchdb.com/, https://github.com/pouchdb/pouchdb
// Definitions by: Simon Paulger <https://github.com/spaulg>, Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

// Modifyed for nanoAPPs (because of an error with Static interface) by: Jose F. Fernandez

/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  namespace HttpAdapter {
    interface HttpAdapterConfiguration extends Configuration.RemoteDatabaseConfiguration {
      adapter: 'http'
    }
  }
}

declare module 'pouchdb-adapter-http' {
  const plugin: PouchDB.Plugin
  export = plugin
}
