<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Libros contables</h4>
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
              <b-tab title="Ventas" active><LibroVentas/></b-tab>
              <b-tab title="Compras" lazy><LibroCompras/></b-tab>
              <b-tab title="Diario" lazy><LibroDiario/></b-tab>
              <b-tab title="Mayor" lazy><LibroMayor/></b-tab>
              <b-tab title="Balances" lazy><LibroBalance/></b-tab>
              <b-tab title="Bancos" lazy><LibroBancos/></b-tab>
              <b-tab title="Estado de resultados" lazy><LibroEstadoResultados/></b-tab>
              <b-tab title="Flujo de efectivo" lazy><LibroFlujoEfectivo/></b-tab>
              <b-tab title="Conciliación bancaria" lazy><LibroConciliacionBancaria/></b-tab>
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
import LibroBalance from './LibroBalance.vue'
import LibroBancos from './LibroBancos.vue'
import LibroCompras from './LibroCompras.vue'
import LibroConciliacionBancaria from './LibroConciliacionBancaria.vue'
import LibroDiario from './LibroDiario.vue'
import LibroEstadoResultados from './LibroEstadoResultados.vue'
import LibroFlujoEfectivo from './LibroFlujoEfectivo.vue'
import LibroMayor from './LibroMayor.vue'
import LibroVentas from './LibroVentas.vue'

export default {
  name: 'BooksParent',
  components: {
    LibroBalance,
    LibroBancos,
    LibroCompras,
    LibroDiario,
    LibroEstadoResultados,
    LibroMayor,
    LibroVentas,
    LibroConciliacionBancaria,
    LibroFlujoEfectivo
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
