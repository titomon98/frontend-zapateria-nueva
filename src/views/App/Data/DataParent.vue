<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Control de datos</h4>
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
              <b-tab title="Tiendas" active><Tiendas/></b-tab>
              <b-tab title="Zapato" lazy><Zapato/></b-tab>
              <b-tab title="Tallas" lazy><Tallas/></b-tab>
              <b-tab title="Marcas" lazy><Marcas/></b-tab>
              <b-tab title="Clasificación" lazy><Clasificaciones/></b-tab>
              <b-tab title="Ventas" lazy><Clasificaciones/></b-tab>
              <b-tab title="Compras" lazy><Clasificaciones/></b-tab>
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
import Marcas from './Marcas.vue'
import Tallas from './Tallas.vue'
import Tiendas from './Tiendas.vue'
import Zapato from './Zapatos.vue'

export default {
  name: 'DataParent',
  components: {
    Clasificaciones,
    Marcas,
    Tallas,
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
