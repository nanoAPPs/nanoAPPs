<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold" v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Datos conexión</v-col>
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
              <v-text-field clearable label="Servidor" class="user-input" v-model="connectionSettings.server"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field clearable label="Base de datos" class="user-input" v-model="connectionSettings.database"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field clearable label="Usuario" class="user-input" v-model="connectionSettings.user"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                clearable
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                class="user-input"
                v-model="connectionSettings.password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          <v-row no-gutters>
            <v-col cols="4">Inicio sesión</v-col>
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
        <v-expansion-panel-header class="font-weight-bold" v-slot="{ open }">
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

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          <v-row no-gutters>
            <v-col cols="4">Lee proyectos</v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-around">
            <v-col cols="8">
              <v-text-field color="success" :loading="connectionTest" disabled v-model="projectsMessage"></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" :loading="connectionTest" @click.stop="runProjectsRead">Leer</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold">
          <v-row no-gutters>
            <v-col cols="4">Ver proyectos</v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-around">
            <v-col cols="12">
              <v-autocomplete
                label="Proyecto"
                class="user-input"
                v-model="project"
                :items="projects"
                item-value="id"
                item-text="name"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col cols="12">
              <v-autocomplete
                label="Tarea"
                class="user-input"
                v-model="task"
                :items="projectTasks"
                item-value="id"
                item-text="name"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'
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
    const showPassword = ref(false)
    const testMessage = ref('Pulsa "CONECTAR" para hacer una prueba de conexión')
    const connectionTest = ref(false)
    const testOK = ref(true)
    let odooSessionId = 'c0040994bca80859545894e0b39a356c75cb0128'
    let odooUserId = 1
    const modulesMessage = ref('Pulsa "LEER" para obtener la lista de módulos instalados')
    const projectsMessage = ref('Pulsa "LEER" para obtener proyectos y tareas')
    const projects = ref([{ id: 0, name: 'No se han cargado los datos' }, { id: 1, name: 'Proyecto 1' }])
    const tasks = ref([
      { id: 0, project_id: 0, name: 'No se han cargado los datos' },
      { id: 1, project_id: 1, name: 'Tarea 1' },
    ])
    const projectTasks = ref([])
    const project = ref()
    const task = ref()

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

    const runProjectsRead = () => {
      log('runProjectsRead')
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

    watch(project, (project, prevProject) => {
      log(project)
      if (project != null) {
        ;(projectTasks.value as any) = tasks.value.filter(t => t.project_id === project)
      }
    })

    return {
      connectionSettings,
      showPassword,
      testMessage,
      connectionTest,
      runConnectionTest,
      testOK,
      modulesMessage,
      runModulesRead,
      projectsMessage,
      projects,
      tasks,
      projectTasks,
      runProjectsRead,
      project,
      task,
    } // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped></style>
