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
              <v-text-field
                clearable
                label="Servidor"
                class="user-input"
                v-model="connectionSettings.server"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                clearable
                label="Base de datos"
                class="user-input"
                v-model="connectionSettings.database"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                clearable
                label="Usuario"
                class="user-input"
                v-model="connectionSettings.user"
              ></v-text-field>
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
          <v-row justify="space-around">
            <v-col cols="12">
              <v-autocomplete
                label="Subtarea"
                class="user-input"
                v-model="subtask"
                :items="projectSubTasks"
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
import { OdooClient } from '@/services/odoo'
import axios from 'axios'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('odoo-project-test')

export default createComponent({
  name: 'odoo-project-test',
  setup(props, context) {
    var odooClient: OdooClient
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
    const projects = ref([])
    const tasks = ref([])
    const projectTasks = ref([])
    const projectSubTasks = ref([])
    const project = ref()
    const task = ref()
    const subtask = ref()

    const runConnectionTest = () => {
      log('runConnectionTest')
      connectionTest.value = true
      odooClient = new OdooClient(connectionSettings.value.server)
      odooClient
        .authenticate(
          connectionSettings.value.database,
          connectionSettings.value.user,
          connectionSettings.value.password
        )
        .then(
          response => {
            log(response)
            connectionTest.value = false
            testOK.value = true
            testMessage.value = 'OK - Odoo v.' + odooClient.serverVersion
          },
          error => {
            log(error)
            connectionTest.value = false
            testMessage.value = error
          }
        )
    }

    const runModulesRead = () => {
      log('runModulesRead')
      if (odooClient == null) {
        // TODO: Notificar que debe iniciar sesión antes
        return
      }
      connectionTest.value = true
      odooClient.search_read('ir.module.module', [['state', '=', 'installed']], ['name']).then(
        response => {
          log(response)
          connectionTest.value = false
          modulesMessage.value = 'El server tiene ' + response.length + ' módulos instalados!'
        },
        error => {
          log(error)
          connectionTest.value = false
        }
      )
    }

    const runProjectsRead = () => {
      log('runProjectsRead')
      if (odooClient == null) {
        // TODO: Notificar que debe iniciar sesión antes
        return
      }
      connectionTest.value = true
      let reads: [Promise<any>, Promise<any>] = [
        odooClient.search_read('project.project', [['is_template', '=', false]], ['project_code', 'name']),
        odooClient.search_read(
          'project.task',
          [['active', '=', true]],
          ['project_id', 'parent_id', 'full_code', 'name']
        ),
      ]
      Promise.all(reads).then(
        (results: any[]) => {
          connectionTest.value = false
          let newProjects: any = results[0]
          log('Projects:', newProjects)
          ;(projects.value as any) = newProjects.map(function(p: any) {
            return {
              id: p.id,
              name: p.project_code + ' - ' + p.name,
            }
          })
          log(projects.value)
          let newTasks: any = results[1]
          log('Tasks:', newTasks[1])
          ;(tasks.value as any) = newTasks.map(function(t: any) {
            let parent = 0
            if (t.parent_id) {
              parent = t.parent_id[0]
            }
            return {
              id: t.id,
              project_id: t.project_id[0],
              parent_id: parent,
              name: t.full_code + ' - ' + t.name,
            }
          })
          projectsMessage.value = 'Se han leído ' + newProjects.length + ' proyectos y ' + newTasks.length + ' tareas.'
        },
        error => {
          log(error)
          connectionTest.value = false
        }
      )
    }

    watch(project, (project, prevProject) => {
      log('Ha cambiado el proyecto: ', project)
      if (project != null) {
        ;(projectTasks.value as any) = tasks.value.filter(function(t: any) {
          return t.project_id === project && t.parent_id === 0
        })
        projectSubTasks.value = []
        log(projectTasks.value)
      }
    })

    watch(task, (task, prevTask) => {
      log('Ha cambiado la tarea: ', task)
      if (task != null) {
        ;(projectSubTasks.value as any) = tasks.value.filter(function(t: any) {
          return t.parent_id === task
        })
        log(projectSubTasks.value)
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
      projectSubTasks,
      runProjectsRead,
      project,
      task,
      subtask,
    } // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped></style>
