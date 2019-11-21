<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Configuración conexión</v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="!open" key="0"> {{ connectionSettings.user }} @ {{ connectionSettings.server }} </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-around">
            <v-col cols="12">
              <v-text-field label="Servidor" v-model="connectionSettings.server"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Base de datos" v-model="connectionSettings.database"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Usuario" v-model="connectionSettings.user"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Contraseña" v-model="connectionSettings.password" type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="4">Prueba conexión</v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-around">
            <v-col cols="8">
              <v-text-field color="success" :loading="connectionTest" disabled v-model="testMessage"></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" :loading="connectionTest" @click.stop="runConnectionTest">Conectar</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Lee módulos</v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="!open" key="0"></span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-around">
            <v-col cols="8">
              <v-text-field color="success" :loading="connectionTest" disabled v-model="modulesMessage"></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" :loading="connectionTest" :disabled="!testOK" @click.stop="runModulesRead"
                >Leer</v-btn
              >
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import axios from 'axios'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('odoo-project-test')

export default createComponent({
  name: 'odoo-project-test',
  setup(props, context) {
    const connectionSettings = ref({
      server: 'https://regenasa-for.odooserver.net',
      database: '',
      user: '',
      password: '',
    })
    let testMessage = ref('Pulsa "CONECTAR" para hacer una prueba de conexión')
    let connectionTest = ref(false)
    let testOK = ref(true)
    let odooSessionId = 'c0040994bca80859545894e0b39a356c75cb0128'
    let odooUserId = 1
    let modulesMessage = ref('Pulsa "LEER" para obtener la lista de módulos instalados')

    const runConnectionTest = () => {
      log('runConnectionTest')
      connectionTest.value = true
      axios
        .post(
          connectionSettings.value.server + '/web/session/authenticate',
          {
            jsonrpc: '2.0',
            params: {
              db: connectionSettings.value.database,
              login: connectionSettings.value.user,
              password: connectionSettings.value.password,
            },
          },
          { headers: { 'Content-type': 'application/json' } }
        )
        .then(response => {
          connectionTest.value = false
          log(response.data.result)
          if (response.data.result) {
            if (response.data.result.uid === false) {
              testOK.value = false
              testMessage.value = 'Contraseña incorrecta! - Odoo v.' + response.data.result.server_version
            } else {
              odooSessionId = response.data.result.session_id
              testOK.value = true
              testMessage.value = 'OK - Odoo v.' + response.data.result.server_version + ' sessionId: ' + odooSessionId
            }
          }
        })
        .catch(error => {
          connectionTest.value = false
          if (!error.response) {
            // network error
            log('Error: Network Error')
          } else {
            log(error.response.data.message)
          }
        })
    }

    const runModulesRead = () => {
      log('runModulesRead')
      connectionTest.value = true
      axios
        .post(
          connectionSettings.value.server + '/web/dataset/call_kw',
          {
            jsonrpc: '2.0',
            params: {
              model: 'ir.module.module',
              method: 'search_read',
              args: [[['state', '=', 'installed']], ['name']],
              kwargs: {
                context: { lang: 'es_ES' },
              },
            },
          },
          {
            headers: {
              'Content-type': 'application/json',
              'X-Openerp-Session-Id': odooSessionId,
            },
          }
        )
        .then(response => {
          connectionTest.value = false
          log(response.data.result)
          if (response.data.result) {
            modulesMessage.value = 'El server tiene ' + response.data.result.length + ' módulos instalados!'
          }
        })
        .catch(error => {
          connectionTest.value = false
          if (!error.response) {
            // network error
            log('Error: Network Error')
          } else {
            log(error.response.data.message)
          }
        })
    }

    return {
      connectionSettings,
      testMessage,
      connectionTest,
      runConnectionTest,
      testOK,
      modulesMessage,
      runModulesRead,
    } // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped></style>
