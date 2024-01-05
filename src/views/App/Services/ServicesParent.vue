<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Productos</h4>
            <div class="iq-search-bar mt-2">
              <div class="row">
                <div class="col-sm">
                  <b-form action="#" class="searchbox">
                  </b-form>
                </div>
                <div class="col-sm">
                </div>
              </div>
            </div>
          </template>
          <template v-slot:body>
            <b-tabs>
              <b-tab title="Tiendas" active><Tiendas/></b-tab> <!-- Aqui los maquete al reves xD -->
              <b-tab title="Zapato" lazy><Zapato/></b-tab>
              <b-tab title="Generar tallas" lazy><Tallas/></b-tab>
              <b-tab title="Listado de tallas" lazy><ListadoTallas/></b-tab>
              <b-tab title="Marcas" lazy><Marcas/></b-tab>
              <b-tab title="Colores" lazy><Colores/></b-tab>
              <b-tab title="Clasificación" lazy><Clasificaciones/></b-tab>
            </b-tabs>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import Clasificaciones from './Clasificaciones.vue'
import Colores from './Colores.vue'
import Marcas from './Marcas.vue'
import Tallas from './Tallas.vue'
import ListadoTallas from './ListadoTallas'
import Tiendas from './Tiendas.vue'
import Zapato from './Zapato.vue'

export default {
  name: 'ServicesParent',
  components: {
    Clasificaciones,
    Colores,
    Marcas,
    Tallas,
    ListadoTallas,
    Tiendas,
    Zapato
  },
  data () {
    return {
      patient: {},
      patientId: 0
    }
  },
  mounted () {
    xray.index()
  },
  beforeMount () {
    this.patientId = this.$route.params.id
    this.getPatient(this.patientId)
  },
  methods: {
    getPatient (id) {
      let me = this
      axios.get(apiUrl + `/paciente/get?id=${id}`)
        .then(response => {
          me.patient = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    backToPatients () {
      this.$router.push({ name: 'patient.patients' })
    }
  }
}
</script>
