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
            <v-col cols="12" md="6">
              <v-text-field label="Servidor" v-model="connectionSettings.server"></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field label="Usuario" v-model="connectionSettings.user"></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field label="Contraseña" v-model="connectionSettings.password" type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Prueba conexión</v-col>
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
              <v-text-field color="success" :loading="connectionTest" disabled v-model="testMessage"></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="primary" :loading="connectionTest" @click.stop="runConnectionTest">Conectar</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('odoo-project-test')

export default createComponent({
  name: 'odoo-project-test',
  setup(props, context) {
    const connectionSettings = ref({
      server: 'https://regenasa-for.odooserver.net/',
      user: '',
      password: '',
    })
    let testMessage = ref('Pulsa "CONECTAR" para hacer una prueba de conexión')
    let connectionTest = ref(false)

    const runConnectionTest = () => {
      log('runConnectionTest')
      connectionTest.value = true
    }

    return {
      connectionSettings,
      testMessage,
      connectionTest,
      runConnectionTest,
    } // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped></style>
