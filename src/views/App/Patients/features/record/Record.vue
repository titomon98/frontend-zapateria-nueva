<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <b-alert
          :variant="alertVariant"
          :show="alertCountDown"
          dismissible
          fade
          @dismissed="alertCountDown=0"
          class="bg-white"
        >
          <div class="iq-alert-text">{{ alertText }}</div>
        </b-alert>

        <iq-card>
          <h4 class="card-title mt-3">Historial de la enfermedad</h4>
          <div>
            <b-form-textarea
              rows="6"
              placeholder="Historial médico"
              v-model.trim="$v.frecuencia.$model"
              :state="!$v.frecuencia.$error"
            ></b-form-textarea>
          </div>
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-form-group>
          <br>
          <b-button class="mr-2" variant="dark" @click="saveRecord()">MODIFICAR HISTORIAL</b-button>
          <b-button class="mr-2" @click="getData(1)" variant="dark">GENERAR HISTORIAL SIMPLE</b-button>
          <b-button @click="getData(2)" variant="dark">GENERAR HISTORIAL COMPLETO</b-button>
          <b-button @click="getData(3)" variant="dark">GENERAR NOTA DE EVOLUCIÓN</b-button>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { apiUrl } from '../../../../../config/constant'
import axios from 'axios'
import JsPDF from 'jspdf'
import moment from 'moment'
import IqCard from '../../../../../components/xray/cards/iq-card.vue'
export default {
  name: 'History',
  components: {
    IqCard

  },
  props: {
    logo3: { type: String, default: require('./4x4.png') }
  },
  setup () {
    return { $v: useVuelidate() }
  },
  data () {
    return {
      patient: null,
      user: {},
      frecuencia: '',
      data: null,
      id: 0,
      expediente: 1,
      paciente: 'Arturo Monterroso',
      telefono: '35130842',
      fecha: '13/3/2023',
      nacimiento: '2/3/1998',
      arrayDetallesPaciente: null,
      arrayDatosPaciente: null,
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: ''
    }
  },
  mounted () {
    xray.index()
  },
  beforeMount () {
    this.patientId = this.$route.params.id
    this.getRecord(this.patientId)
  },
  validations () {
    return {
      frecuencia: {
        required
      }
    }
  },
  methods: {
    getRecord (id) {
      let me = this
      axios.get(apiUrl + `/record/get?id=${id}`)
        .then(function (response) {
          me.frecuencia = response.data[0].contenido
          me.id = response.data[0].id
          me.user = response.data[0].usuario
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getData (accion) {
      let me = this
      if (accion === 1) {
        axios.get(apiUrl + `/paciente/get?id=${me.patientId}`)
          .then(function (response) {
            console.log(response.data)
            me.patient = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
        let data = {
          usuario: me.user,
          paciente: me.patient
        }
        me.imprimirHistorial(data)
      } else if (accion === 2) {
        axios.get(apiUrl + `/paciente/get?id=${me.patientId}`)
          .then(function (response) {
            me.arrayDatosPaciente = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
        axios.get(apiUrl + `/detail_record/get?id=${me.patientId}`)
          .then(function (response) {
            me.arrayDetallesPaciente = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
        let data = {
          usuario: me.user,
          paciente: me.patient,
          detalle: me.arrayDetallesPaciente
        }
        me.imprimirHistorialCompleto(data)
      }
    },
    saveRecord () {
      let me = this
      axios.put(apiUrl + '/record/update', {
        contenido: me.frecuencia,
        id_paciente: this.patientId,
        id: me.id
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha guardado el historial exitosamente'
        })
        .catch((error) => {
          console.log(error)
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    pushPatient (id) {
      this.$router.push({ name: 'reports.sandbox', params: { id: id } })
    },
    imprimirHistorial (data) {
      var altura = 2
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var ingreso = moment('2023-03-12 18:38:51').format('DD/MM/YYYY')
      var nacimiento = moment('2023-03-12').format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      var paragraph = this.frecuencia
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Expediente: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Paciente: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
      altura = altura + 0.5
      doc.text('Telefono: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
      altura = altura + 1
      doc.text('Motivo de consulta ', 1.5, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.text('Convulsión de 15 días', 1.5, altura)
      altura = altura + 1
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Historial de la enfermedad ', 1.5, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'normal')
      var lines = doc.splitTextToSize(paragraph, 18)
      doc.text(lines, 1.5, altura, { maxWidth: 18.5, align: 'justify' })
      doc.save('HistorialSimple.pdf')
    },
    imprimirHistorialCompleto (data) {
      var altura = 2
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var ingreso = moment('2023-03-12 18:38:51').format('DD/MM/YYYY')
      var nacimiento = moment('2023-03-12').format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      var paragraph = this.frecuencia
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Expediente: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Paciente: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
      altura = altura + 0.5
      doc.text('Telefono: ' + 1, 6, altura)
      altura = altura + 0.5
      doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
      altura = altura + 1
      doc.text('Motivo de consulta ', 1.5, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.text('Convulsión de 15 días', 1.5, altura)
      altura = altura + 1
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Historial de la enfermedad ', 1.5, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'normal')
      var lines = doc.splitTextToSize(paragraph, 18)
      doc.text(lines, 1.5, altura, { maxWidth: 18.5, align: 'justify' })
      doc.setLineWidth(0.2)
      altura = altura + lines.length * 0.425
      doc.line(1.5, altura, 20, altura)
      altura = altura + 0.75
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Revisión por sistemas ', 1.5, altura)
      altura = altura + 1
      // Resto del cuerpo del reporte
      // Aparato digestivo
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato digestivo ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato digestivo', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato respiratorio
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato respiratorio ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato respiratorio', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato cardio vascular
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato cardio vascular ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato cardio vascular', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato urinario
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato urinario ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato urinario', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato general femenino
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato general femenino ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato general femenino', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato endocrino
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato endocrino ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato endocrino', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato osteo muscular
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato osteo muscular ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato osteo muscular', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato nervioso
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato nervioso ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato nervioso', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Aparato sensorial
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Aparato sensorial ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el aparato sensorial', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Piel y faneras
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Piel y faneras ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Sin datos patológicos', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(12, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 12.5, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para piel y faneras', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Habitus exterior
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Habitus exterior ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el habitus exterior', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Cabeza
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Cabeza ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para la cabeza', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Faringe
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Faringe ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para la faringe', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Cuello
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Cuello ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el cuello', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Tórax
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Tórax ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el tórax', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Regio precordial
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Región precordial ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para la región precordial', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Glandulas mamarias y regiones axilares
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Glándulas mamarias y', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Regiones axilares ', 1.5, altura)
      altura = altura + 0.5
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.text('Este es un texto de prueba para las glándulas mamarias y regiones axilares', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Abdomen
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Abdomen ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para el abdomen', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Genitales externos
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Genitales externos ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para los genitales externos', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Extremidades
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Extremidades ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para las extremidades', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Columna vertebral
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Columna vertebral ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para la columna vertebral', 1.5, altura)
      altura = altura + 0.5
      if (altura > 25) {
        doc.addPage()
        altura = 2
        doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
        doc.setFontSize(10).setFont(undefined, 'bold')
        doc.text('Expediente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Paciente: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de ingreso: ' + ingreso, 6, altura)
        altura = altura + 0.5
        doc.text('Fecha de nacimiento: ' + nacimiento, 6, altura)
        altura = altura + 0.5
        doc.text('Telefono: ' + 1, 6, altura)
        altura = altura + 0.5
        doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, altura)
        altura = altura + 1
      }
      // Exploracion neurologica
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Exploración neurológica ', 1.5, altura)
      doc.setFontSize(10).setFont(undefined, 'normal')
      doc.rect(6.5, altura - 0.25, 0.30, 0.30, 'F')
      doc.text('Normal', 7, altura)
      doc.setDrawColor(255, 255, 255)
      doc.rect(9, altura - 0.25, 0.30, 0.30)
      doc.text('Anormal', 9.5, altura)
      doc.rect(11.5, altura - 0.25, 0.30, 0.30)
      doc.text('Diferido por', 12, altura)
      altura = altura + 0.5
      doc.text('Este es un texto de prueba para la exploración neurológica', 1.5, altura)
      altura = altura + 0.5
      doc.save('HistorialCompleto.pdf')
    },
    showAlert () {
      this.alertCountDown = this.alertSecs
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    }
  }
}
</script>
