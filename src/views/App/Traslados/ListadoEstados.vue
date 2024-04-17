<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Control de traslados</h4>
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
              <b-tab title="Listado de solicitados" active><ListadoSolicitado/></b-tab>
              <b-tab title="Listado de completados" lazy><ListadoCompletados/></b-tab>
              <b-tab title="Listado de incompletos" lazy><ListadoIncompletos/></b-tab>
              <b-tab title="Listado de pedidos en camino" lazy><ListadoEnCamino/></b-tab>
              <b-tab title="Listado de cancelados" lazy><ListadoCancelado/></b-tab>
              <b-tab title="Listado de incompletos por existencia" lazy><ListadoExistenciaFisica/></b-tab>
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
import ListadoSolicitado from './ListadoSolicitado.vue'
import ListadoCancelado from './ListadoCancelado.vue'
import ListadoCompletados from './ListadoCompletados.vue'
import ListadoExistenciaFisica from './ListadoExistenciaFisica.vue'
import ListadoIncompletos from './ListadoIncompletos.vue'
import ListadoEnCamino from './ListadoEnCamino.vue'

export default {
  name: 'ListadoEstadosParent',
  components: {
    ListadoSolicitado,
    ListadoCancelado,
    ListadoCompletados,
    ListadoExistenciaFisica,
    ListadoIncompletos,
    ListadoEnCamino
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
