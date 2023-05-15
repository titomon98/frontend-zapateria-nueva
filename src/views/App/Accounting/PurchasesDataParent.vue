<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Datos para contabilidad</h4>
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
              <b-tab title="Proveedores" active><Proveedores/></b-tab>
              <b-tab title="Contribuyentes" lazy><Contribuyentes/></b-tab>
              <b-tab title="Áreas de destino" lazy><Destino/></b-tab>
              <b-tab title="Tipos de cobro" lazy><TipoPago/></b-tab>
              <b-tab title="Tipo de movimiento bancario" lazy><TipoMovimientoBancario/></b-tab>
              <b-tab title="Movimientos bancarios" lazy><MovimientoBancario/></b-tab>
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
import Contribuyentes from './Contribuyentes.vue'
import Destino from './Destino.vue'
import Proveedores from './Proveedores.vue'
import TipoPago from './TipoPago.vue'
import TipoMovimientoBancario from './TipoMovimientoBancario.vue'
import MovimientoBancario from './MovimientoBancario.vue'

export default {
  name: 'PurchasesDataParent',
  components: {
    Contribuyentes,
    Destino,
    Proveedores,
    TipoMovimientoBancario,
    TipoPago,
    MovimientoBancario
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
