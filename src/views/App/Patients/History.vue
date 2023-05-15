<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Historial clinico del paciente {{ patient.nombre }} {{ patient.apellidos }}</h4>
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
          <template v-slot:headerAction>
            <b-button variant="primary" @click="backToPatients"  >REGRESAR A PACIENTES</b-button>
          </template>
          <template v-slot:body>
            <b-tabs>
              <b-tab title="Historial" active><Record :patientId="patientId" /></b-tab>
              <b-tab title="Detalle de historial" lazy><DetailsRecord :patientId="patientId" /></b-tab>
              <b-tab title="Diagnósticos" lazy><Diagnosis :patientId="patientId" /></b-tab>
              <b-tab title="Vitales" lazy><VitalSigns :patientId="patientId" /></b-tab>
              <b-tab title="Laboratorio" lazy><Laboratory :patientId="patientId"/></b-tab>
              <b-tab title="Terapia" lazy><Others :patientId="patientId"/></b-tab>
              <b-tab title="Medicamentos" lazy><Medicine :patientId="patientId"/></b-tab>
              <b-tab title="Radiología" lazy><Radiology :patientId="patientId"/></b-tab>
              <b-tab title="Documentos" lazy><Documents :patientId="patientId"/></b-tab>
              <b-tab title="Visitas" lazy><Visits :patientId="patientId"/></b-tab>
              <b-tab title="Exoneración" lazy><Charges :patientId="patientId"/></b-tab>
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
import Record from './features/record/Record.vue'
import DetailsRecord from './features/record/DetailsRecord.vue'
import Diagnosis from './features/DiagnosisParent'
import VitalSigns from './features/VitalSignsParent'
import Laboratory from './features/LaboratoryParent'
import Others from './features/OthersParent'
import Medicine from './features/Medicine'
import Radiology from './features/Radiology'
import Documents from './features/DocumentsParent'
import Visits from './features/Visits'
import Charges from './features/ChargesParent'

export default {
  name: 'History',
  components: {
    Record,
    DetailsRecord,
    Diagnosis,
    VitalSigns,
    Laboratory,
    Others,
    Medicine,
    Radiology,
    Documents,
    Visits,
    Charges
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
