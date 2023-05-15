<template>
  <b-container fluid>
    <NationalityModal @savedNationality="savedNationality" ref="nationalityModal" />
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
    <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Actualizar paciente</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="backToPatients"  >REGRESAR A PACIENTES</b-button>
          </template>
          <template v-slot:body>
            <!-- fila -->
            <b-row class="ml-2">
              <!-- columna -->
              <b-col md="2">
                <b-form-group label="Nombre:">
                  <b-form-input
                    v-model.trim="$v.form.name.$model"
                    :state="!$v.form.name.$error"
                    placeholder="Ingresar nombre"
                  ></b-form-input>
                  <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
                    Debe ingresar el nombre
                  </div>
                </b-form-group>
              </b-col>
              <!-- columna -->
              <b-col md="2">
                <b-form-group label="Apellido:">
                  <b-form-input
                    v-model.trim="$v.form.secondName.$model"
                    :state="!$v.form.secondName.$error"
                    placeholder="Ingresar apellido"
                  ></b-form-input>
                  <div v-if="$v.form.secondName.required.$invalid" class="invalid-feedback">
                    Debe ingresar el apellido
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Apellido de casada:">
                  <b-form-input
                    v-model.trim="form.marriedName"
                    placeholder="Ingresar apellido de casada"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Fecha de nacimiento:">
                  <b-form-input
                    type="date"
                    v-model.trim="$v.form.birth.$model"
                    :state="!$v.form.birth.$error"
                    placeholder="Ingresar fecha de nacimiento"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.birth.required.$invalid" class="invalid-feedback">
                    Debe ingresar la fecha de nacimiento
                  </div> -->
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Dirección:">
                  <b-form-input
                    v-model.trim="$v.form.address.$model"
                    :state="!$v.form.address.$error"
                    placeholder="Ingresar dirección"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.birth.required.$invalid" class="invalid-feedback">
                    Debe ingresar la dirección
                  </div> -->
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <!-- columna -->
              <b-col md="2">
                <b-form-group label="Telefono:">
                  <b-form-input
                    v-model.trim="$v.form.phoneNumber.$model"
                    :state="!$v.form.phoneNumber.$error"
                    placeholder="Ingresar telefono"
                  ></b-form-input>
                  <div v-if="$v.form.phoneNumber.required.$invalid" class="invalid-feedback">
                    Debe ingresar el telefono
                  </div>
                  <div v-if="$v.form.phoneNumber.numeric.$invalid" class="invalid-feedback">
                    Debe ingresar unicamente numeros
                  </div>
                </b-form-group>
              </b-col>
              <!-- columna -->
              <b-col md="2">
                <b-form-group label="Correo:">
                  <b-form-input
                    v-model.trim="form.email"
                    :state="!$v.form.email.$error"
                    placeholder="Ingresar correo"
                  ></b-form-input>
                  <div v-if="$v.form.email.$invalid" class="invalid-feedback">
                    Debe ingresar una direccion de correo válida
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Sexo:">
                  <v-select
                    name="type"
                    v-model="$v.form.sex.$model"
                    :state="!$v.form.sex.$error"
                    :options="genders"
                    placeholder="Seleccione el sexo"
                  />
                  <div v-if="$v.form.sex.$error" class="invalid-feedback-vselect">
                    Debe ingresar el Sexo
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="CUI:">
                  <b-form-input
                    v-model.trim="$v.form.cui.$model"
                    :state="!$v.form.cui.$error"
                    placeholder="Ingresar el CUI"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Nombre del encargado:">
                  <b-form-input
                    v-model.trim="$v.form.parentName.$model"
                    :state="!$v.form.parentName.$error"
                    placeholder="Ingresar nombre y apellido del encargado"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
                    Debe ingresar el nombre
                  </div> -->
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="CUI del encargado/a:">
                  <b-form-input
                    v-model.trim="$v.form.parentCUI.$model"
                    :state="!$v.form.parentCUI.$error"
                    placeholder="Ingresar el CUI del encargado/a"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.cui.required.$invalid" class="invalid-feedback">
                    Debe ingresar el CUI
                  </div> -->
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <!-- columna -->
              <b-col md="2">
                <b-form-group label="Referente:">
                  <b-form-input
                    v-model.trim="$v.form.referrer.$model"
                    :state="!$v.form.referrer.$error"
                    placeholder="Ingresar referente"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.fileNumber.required.$invalid" class="invalid-feedback">
                    Debe ingresar el numero de expediente
                  </div> -->
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Procedencia:">
                  <b-form-input
                    v-model.trim="$v.form.origin.$model"
                    :state="!$v.form.origin.$error"
                    placeholder="Ingresar procedencia"
                  ></b-form-input>
                  <!-- <div v-if="$v.form.fileNumber.required.$invalid" class="invalid-feedback">
                    Debe ingresar el numero de expediente
                  </div> -->
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Estado civil:">
                  <b-form-input
                    v-model.trim="$v.form.maritalStatus.$model"
                    :state="!$v.form.maritalStatus.$error"
                    placeholder="Ingresar estado civil"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Idioma:">
                  <v-select
                    name="type"
                    v-model="$v.form.language.$model"
                    :state="!$v.form.language.$error"
                    :options="languages"
                    label="nombre"
                    placeholder="Seleccione el idioma"
                  />
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Nacionalidad:">
                  <v-select
                    name="type"
                    v-model="$v.form.nationality.$model"
                    :state="!$v.form.nationality.$error"
                    :options="nationalities"
                    label="nombre"
                    placeholder="Seleccione la nacionalidad"
                  >
                    <template #footer>
                      <b-button
                        class="mt-1"
                        block
                        variant="primary"
                        @click="nationalityModal"
                      >Nueva nacionalidad</b-button>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Tipo de sangre:">
                  <v-select
                    name="type"
                    v-model="$v.form.blood.$model"
                    :state="!$v.form.blood.$error"
                    :options="bloods"
                    label="nombre"
                    placeholder="Seleccione el tipo de sangre"
                  />
                </b-form-group>
              </b-col>
              <!-- columna -->
            </b-row>
            <!-- <b-row class="ml-2">
              <b-col md="2">
                <b-form-group label="Numero de expediente:">
                  <b-form-input
                    v-model.trim="$v.form.fileNumber.$model"
                    placeholder="Ingresar numero de expediente"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row> -->
            <b-button block variant="primary" @click="onValidate">Actualizar paciente</b-button>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import NationalityModal from './components/NationalityModal'

export default {
  name: 'Patients',
  components: {
    NationalityModal
  },
  setup () {
    return { $v: useVuelidate() }
  },
  beforeMount () {
    this.getLaguages()
    this.getNationalities()
    this.getBloods()
    this.getPatient(this.$route.params.id)
  },
  mounted () {
    xray.index()
  },
  data () {
    return {
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        name: '',
        secondName: '',
        marriedName: '',
        address: '',
        fileNumber: '',
        birth: '',
        phoneNumber: '',
        email: '',
        sex: '',
        cui: '',
        parentName: '',
        parentCUI: '',
        referrer: '',
        origin: '',
        maritalStatus: '',
        born: '',
        age: '',
        tutor: '',
        language: [],
        blood: [],
        nationality: [],
        state: 1
      },
      languages: [],
      bloods: [],
      nationalities: [],
      genders: ['M', 'F'],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/paciente/list'
    }
  },
  validations () {
    return {
      form: {
        name: {
          required
        },
        secondName: {
          required
        },
        phoneNumber: {
          required, numeric
        },
        birth: {
        },
        email: {
          email
        },
        sex: {
          required
        },
        cui: {
          numeric
        },
        maritalStatus: {},
        language: {},
        nationality: {},
        blood: {},
        address: {
        },
        parentName: {
        },
        parentCUI: {
          numeric
        },
        referrer: {
        },
        origin: {
        }
      }
    }
  },
  methods: {
    getPatient (id) {
      axios.get(apiUrl + '/paciente/get', {
        params: { id: id }
      })
        .then(response => {
          console.log(response)
          this.form.id = response.data.id
          this.form.name = response.data.nombre
          this.form.secondName = response.data.apellidos
          this.form.marriedName = response.data.apellido_casada
          this.form.fileNumber = response.data.num_expediente
          this.form.phoneNumber = response.data.telefono
          this.form.email = response.data.correo
          this.form.sex = response.data.sexo
          this.form.cui = response.data.cui
          this.form.maritalStatus = response.data.estado_civil
          this.form.language = response.data.idiomas
          this.form.nationality = response.data.nacionalidades
          this.form.blood = response.data.tipo_sangres
          this.form.born = response.data.fecha_nacimiento
          this.form.address = response.data.direccion
          this.form.age = response.data.edad
          this.form.tutor = response.data.nombre_encargado
          this.form.birth = response.data.nacimiento
          this.form.parentName = response.data.nombre_encargado
          this.form.parentCUI = response.data.cui_encargado
          this.form.referrer = response.data.referente
          this.form.origin = response.data.procedencia
        })
    },
    onValidate () {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        this.onUpdate()
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/paciente/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el paciente ' + me.form.name + ' exitosamente'
          me.$router.push({ name: 'patient.patients' })
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
          console.error('Error!', error)
        })
    },
    getLaguages () {
      axios.get(apiUrl + '/idioma/get').then((response) => {
        this.languages = response.data
      })
    },
    getBloods () {
      axios.get(apiUrl + '/sangre/get').then((response) => {
        this.bloods = response.data
      })
    },
    getNationalities () {
      axios.get(apiUrl + '/nacionalidad/get').then((response) => {
        this.nationalities = response.data
      })
    },
    showAlert () {
      this.alertCountDown = this.alertSecs
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    },
    backToPatients () {
      this.$router.push({ name: 'patient.patients' })
    },
    nationalityModal () {
      this.$refs.nationalityModal.openModal()
    },
    savedNationality (nationality) {
      // console.log('holaaaaaaaaa')
      this.alertVariant = 'success'
      this.showAlert()
      this.alertText = 'Se la nacionalidad: ' + nationality.nombre + ' exitosamente'
      this.getNationalities()
      this.form.nationality = nationality
    }
  }
}
</script>
