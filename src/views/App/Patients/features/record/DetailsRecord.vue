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
          <h4 class="card-title mt-3">Revisión por sistemas</h4>
          <div>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Aparato Digestivo:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato Digestivo"
                    v-model="form.contenido_digestivo"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato digestivo:">
                <b-form-radio v-model="form.estado_digestivo" value="0" name="customRadio1">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_digestivo" value="1" name="customRadio1">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato Respiratorio:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato Respiratorio"
                    v-model="form.contenido_respiratorio"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato Respiratorio:">
                <b-form-radio v-model="form.estado_respiratorio" value="0" name="customRadio2">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_respiratorio" value="1" name="customRadio2">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato cardio vascular:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato cardio vascular"
                    v-model="form.contenido_cardiovascular"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato cardio vascular:">
                <b-form-radio v-model="form.estado_cardiovascular" value="0" name="customRadio3">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_cardiovascular" value="1" name="customRadio3">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato urinario:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato urinario"
                    v-model="form.contenido_urinario"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato urinario:">
                <b-form-radio v-model="form.estado_urinario" value="0" name="customRadio4">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_urinario" value="1" name="customRadio4">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Aparato general femenino:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato general femenino"
                    v-model="form.contenido_femenino"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato general femenino:">
                <b-form-radio v-model="form.estado_femenino" value="0" name="customRadio5">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_femenino" value="1" name="customRadio5">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato endocrino:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato endocrino"
                    v-model="form.contenido_endocrino"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato endocrino:">
                <b-form-radio v-model="form.estado_endocrino" value="0" name="customRadio6">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_endocrino" value="1" name="customRadio6">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Aparato osteo muscular:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato osteo muscular"
                    v-model="form.contenido_osteo"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato osteo muscular:">
                <b-form-radio v-model="form.estado_osteo" value="0" name="customRadio7">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_osteo" value="1" name="customRadio7">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato nervioso:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato nervioso"
                    v-model="form.contenido_nervioso"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato nervioso:">
                <b-form-radio v-model="form.estado_nervioso" value="0" name="customRadio8">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_nervioso" value="1" name="customRadio8">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Aparato sensorial:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Aparato sensorial"
                    v-model="form.contenido_sensorial"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Aparato sensorial:">
                <b-form-radio v-model="form.estado_sensorial" value="0" name="customRadio9">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_sensorial" value="1" name="customRadio9">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Piel y faneras:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Piel y faneras"
                    v-model="form.contenido_piel"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="piel y faneras:">
                <b-form-radio v-model="form.estado_piel" value="0" name="customRadio10">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_piel" value="1" name="customRadio10">Sin datos patologicos</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Habitus exterior:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Habitus exterior"
                    v-model="form.contenido_habitus"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Habitus exterior:">
                <b-form-radio v-model="form.estado_habitus" value="0" name="customRadio11">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_habitus" value="1" name="customRadio11">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_habitus" value="2" name="customRadio11">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Cabeza:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Cabeza"
                    v-model="form.contenido_cabeza"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="cabeza:">
                <b-form-radio v-model="form.estado_cabeza" value="0" name="customRadio12">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_cabeza" value="1" name="customRadio12">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_cabeza" value="2" name="customRadio12">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Faringe:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Faringe"
                    v-model="form.contenido_faringe"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Faringe:">
                <b-form-radio v-model="form.estado_faringe" value="0" name="customRadio13">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_faringe" value="1" name="customRadio13">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_faringe" value="2" name="customRadio13">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Cuello:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Cuello"
                    v-model="form.contenido_cuello"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Cuello:">
                <b-form-radio v-model="form.estado_cuello" value="0" name="customRadio14">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_cuello" value="1" name="customRadio14">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_cuello" value="2" name="customRadio14">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Tórax:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Tórax"
                    v-model="form.contenido_torax"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Tórax:">
                <b-form-radio v-model="form.estado_torax" value="0" name="customRadio15">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_torax" value="1" name="customRadio15">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_torax" value="2" name="customRadio15">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Región precordial:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Región precordial"
                    v-model="form.contenido_precordial"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Region precordial:">
                <b-form-radio v-model="form.estado_precordial" value="0" name="customRadio16">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_precordial" value="1" name="customRadio16">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_precordial" value="2" name="customRadio16">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Glándulas mamarias y regiones axilares:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Glándulas mamarias y regiones axilares"
                    v-model="form.contenido_glandulas"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Glándulas mamarias y regiones axilares:">
                <b-form-radio v-model="form.estado_glandulas" value="0" name="customRadio17">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_glandulas" value="1" name="customRadio17">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_glandulas" value="2" name="customRadio17">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Abdomen:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Abdomen"
                    v-model="form.contenido_abdomen"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Abdomen:">
                <b-form-radio v-model="form.estado_abdomen" value="0" name="customRadio18">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_abdomen" value="1" name="customRadio18">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_abdomen" value="2" name="customRadio18">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Genitales externos:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Genitales externos"
                    v-model="form.contenido_genitales"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Genitales externos:">
                <b-form-radio v-model="form.estado_genitales" value="0" name="customRadio19">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_genitales" value="1" name="customRadio19">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_genitales" value="2" name="customRadio19">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Extremidades:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Extremidades"
                    v-model="form.contenido_extremidades"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Extremidades:">
                <b-form-radio v-model="form.estado_extremidades" value="0" name="customRadio20">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_extremidades" value="1" name="customRadio20">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_extremidades" value="2" name="customRadio20">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Columna vertebral:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Columna vertebral"
                    v-model="form.contenido_columna"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Columna vertebral:">
                <b-form-radio v-model="form.estado_columna" value="0" name="customRadio21">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_columna" value="1" name="customRadio21">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_columna" value="2" name="customRadio21">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Exploración neurológica:">
                  <b-form-textarea
                    rows="2"
                    placeholder="Exploración neurológica"
                    v-model="form.contenido_digestivo"
                  ></b-form-textarea>
                  <input type="radio" class="custom-control-input"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
              <b-form-group label="Exploración neurologica:">
                <b-form-radio v-model="form.estado_neurologica" value="0" name="customRadio22">Normal</b-form-radio>
                <b-form-radio v-model="form.estado_neurologica" value="1" name="customRadio22">Anormal</b-form-radio>
                <b-form-radio v-model="form.estado_neurologica" value="2" name="customRadio22">Diferido por</b-form-radio>
              </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
            </b-row>
          </div>
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-form-group>
          <br>
          <b-button class="mr-2" variant="dark" @click="saveRecord()">MODIFICAR HISTORIAL</b-button>
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
      form: {
        id: 0,
        contenido_digestivo: ' ',
        estado_digestivo: 0,
        contenido_respiratorio: ' ',
        estado_respiratorio: 0,
        contenido_cardiovascular: ' ',
        estado_cardiovascular: 0,
        contenido_urinario: ' ',
        estado_urinario: 0,
        contenido_femenino: ' ',
        estado_femenino: 0,
        contenido_endocrino: ' ',
        estado_endocrino: 0,
        contenido_osteo: ' ',
        estado_osteo: 0,
        contenido_nervioso: ' ',
        estado_nervioso: 0,
        contenido_sensorial: ' ',
        estado_sensorial: 0,
        contenido_piel: ' ',
        estado_piel: 0,
        contenido_habitus: ' ',
        estado_habitus: 0,
        contenido_cabeza: ' ',
        estado_cabeza: 0,
        contenido_faringe: ' ',
        estado_faringe: 0,
        contenido_cuello: ' ',
        estado_cuello: 0,
        contenido_torax: ' ',
        estado_torax: 0,
        contenido_precordial: ' ',
        estado_precordial: 0,
        contenido_glandulas: ' ',
        estado_glandulas: 0,
        contenido_abdomen: ' ',
        estado_abdomen: 0,
        contenido_genitales: ' ',
        estado_genitales: 0,
        contenido_extremidades: ' ',
        estado_extremidades: 0,
        contenido_columna: ' ',
        estado_columna: 0,
        contenido_neurologica: ' ',
        estado_neurologica: 0
      },
      check: 0,
      check2: 0,
      patient: null,
      user: {},
      frecuencia: '',
      data: null,
      id: 1,
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
    async getRecord (id) {
      let me = this
      axios.get(apiUrl + `/detail_record/get?id=${id}`)
        .then(function (response) {
          me.form.contenido_digestivo = response.data[0].contenido_digestivo
          me.form.estado_digestivo = response.data[0].estado_digestivo
          me.form.contenido_respiratorio = response.data[0].contenido_respiratorio
          me.form.estado_respiratorio = response.data[0].estado_respiratorio
          me.form.contenido_cardiovascular = response.data[0].contenido_cardiovascular
          me.form.estado_cardiovascular = response.data[0].estado_cardiovascular
          me.form.contenido_urinario = response.data[0].contenido_urinario
          me.form.estado_urinario = response.data[0].estado_urinario
          me.form.contenido_femenino = response.data[0].contenido_femenino
          me.form.estado_femenino = response.data[0].estado_femenino
          me.form.contenido_endocrino = response.data[0].contenido_endocrino
          me.form.estado_endocrino = response.data[0].estado_endocrino
          me.form.contenido_osteo = response.data[0].contenido_osteo
          me.form.estado_osteo = response.data[0].estado_osteo
          me.form.contenido_nervioso = response.data[0].contenido_nervioso
          me.form.estado_nervioso = response.data[0].estado_nervioso
          me.form.contenido_sensorial = response.data[0].contenido_sensorial
          me.form.estado_sensorial = response.data[0].estado_sensorial
          me.form.contenido_piel = response.data[0].contenido_piel
          me.form.estado_piel = response.data[0].estado_piel
          me.form.contenido_habitus = response.data[0].contenido_habitus
          me.form.estado_habitus = response.data[0].estado_habitus
          me.form.contenido_cabeza = response.data[0].contenido_cabeza
          me.form.estado_cabeza = response.data[0].estado_cabeza
          me.form.contenido_faringe = response.data[0].contenido_faringe
          me.form.estado_faringe = response.data[0].estado_faringe
          me.form.contenido_cuello = response.data[0].contenido_cuello
          me.form.estado_cuello = response.data[0].estado_cuello
          me.form.contenido_torax = response.data[0].contenido_torax
          me.form.estado_torax = response.data[0].estado_torax
          me.form.contenido_precordial = response.data[0].contenido_precordial
          me.form.estado_precordial = response.data[0].estado_precordial
          me.form.contenido_glandulas = response.data[0].contenido_glandulas
          me.form.estado_glandulas = response.data[0].estado_glandulas
          me.form.contenido_abdomen = response.data[0].contenido_abdomen
          me.form.estado_abdomen = response.data[0].estado_abdomen
          me.form.contenido_genitales = response.data[0].contenido_genitales
          me.form.estado_genitales = response.data[0].estado_genitales
          me.form.contenido_extremidades = response.data[0].contenido_extremidades
          me.form.estado_extremidades = response.data[0].estado_extremidades
          me.form.contenido_columna = response.data[0].contenido_columna
          me.form.estado_columna = response.data[0].estado_columna
          me.form.contenido_neurologica = response.data[0].contenido_neurologica
          me.form.estado_neurologica = response.data[0].estado_neurologica
          me.form.id = response.data[0].id
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
      axios.put(apiUrl + '/detail_record/update', {
        form: me.form,
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
    showAlert () {
      this.alertCountDown = this.alertSecs
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    }
  }
}
</script>
