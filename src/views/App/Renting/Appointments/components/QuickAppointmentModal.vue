<template>
    <b-modal ref="modalAppointment" title="Consulta" size="lg">
      <b-form-group label="Nombre:">
        <b-form-input
          v-model.trim="$v.form.name.$model"
          :state="!$v.form.name.$error"
          placeholder="Ingresar nombre del paciente"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Apellidos:">
        <b-form-input
          v-model.trim="$v.form.secondName.$model"
          :state="!$v.form.secondName.$error"
          placeholder="Ingresar apellidos del paciente"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Numero de telefono:">
        <b-form-input
          v-model.trim="$v.form.phoneNumber.$model"
          :state="!$v.form.phoneNumber.$error"
          placeholder="Ingresar numero de telefono del paciente"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Edad:">
        <b-form-row>
          <b-col>
            <b-form-input
              v-model.trim="$v.form.age.$model"
              :state="!$v.form.age.$error"
              placeholder="Ingresar edad del paciente"
            ></b-form-input>
          </b-col>
          <b-col>
            <v-select
              name="edadsel"
              v-model="ageSel"
              :options="ageOptions"
              label="Referido"
              placeholder="Seleccione el tiempo"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group label="Fecha de nacimiento:">
        <b-form-input
        type="date"
          v-model.trim="$v.form.born.$model"
          :state="!$v.form.born.$error"
          placeholder="Ingresar fecha de nacimiento del paciente"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Referente:">
        <b-form-input
          v-model.trim="$v.form.referrer.$model"
          :state="!$v.form.referrer.$error"
          placeholder="Ingresar nombre del referido del paciente"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Procendete:">
        <b-form-input
          v-model.trim="$v.form.origin.$model"
          :state="!$v.form.origin.$error"
          placeholder="Ingresar procedencia del paciente"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Motivo de consulta:">
        <b-form-textarea
          v-model.trim="$v.form.description.$model"
          :state="!$v.form.description.$error"
          placeholder="Ingresar Descripción"
        ></b-form-textarea>
      </b-form-group>

      <MedicoModal
        ref="doctorModal"
        @doctor="getDoctor"
        :doctorEdit='doctor'
      />
      <b-modal id="deleteModal" ref="deleteModal" title="Eliminar consulta">
        <h6 class="my-4">
          ¿Desea eliminar la cita?
        </h6>
        <template #modal-footer="{}">
        <b-button variant="primary" @click="onDelete"
          >Eliminar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('deleteModal')"
          >Cancelar</b-button
        >
      </template>
      </b-modal>
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-form>

        <b-form-group label="Fecha de consulta:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.startDate.$model"
            placeholder="Ingresar el inicio de contrato"
            @input="handleChangeTime"
          ></b-form-input>
          <div v-if="$v.form.startDate.$error" class="invalid-feedback-vselect">
            Debe seleccionar la fecha
          </div>
          <b-form-input
            class="mt-2"
            id="example-input"
            v-model="$v.form.startTime.$model"
            type="text"
            placeholder="HH:mm:ss"
            @input="handleChangeTime"
          ></b-form-input>
          <b-form-timepicker
            label-hours="hola"
            class="mt-2"
            v-model="$v.form.startTime.$model"
            placeholder="Seleccione una hora"
            @input="handleChangeTime"
            locale="en"
          />
          <div v-if="$v.form.startTime.$error" class="invalid-feedback-vselect">
            Debe seleccionar el horario
          </div>
        </b-form-group>
        <b-form-group label="Referido:">
          <v-select
            name="referido"
            v-model="form.referred"
            :options="referredOptions"
            label="Referido"
            placeholder="Seleccione el referido"
          />
        </b-form-group>
        <b-form-group label="Doctor:">
          <b-button variant="primary" @click="openDoctorModal">
            Agregar doctor
          </b-button>
          <vuetable
            ref="doctorVuetable"
            class="table-divided order-with-arrow "
            :api-mode="false"
            :data="$v.form.doctor.$model"
            :fields="doctorField"
            pagination-path
          >
          </vuetable>
          <div v-if="$v.form.doctor.$error" class="invalid-feedback-vselect">
            Debe seleccionar al medico
          </div>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button v-if="saveEdit=='save'" variant="primary" @click="onValidate(saveEdit)"
          >Guardar</b-button
        >
        <template v-else >
          <b-button variant="danger" @click="closeModal('save')"
            >Cancelar</b-button
          >
          <b-button variant="warning" @click="onValidate(saveEdit)"
            >Actualizar</b-button
          >
          <b-button variant="secondary" @click="onValidate('delete')"
            >Eliminar</b-button
          >
        </template>
      </template>
    </b-modal>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import MedicoModal from '../../../Doctors/components/MedicosModal'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../../config/constant'

export default ({
  name: 'QuickAppointmentModal',
  components: {
    MedicoModal,
    vuetable: Vuetable
    // 'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    // 'datatable-heading': DatatableHeading
  },
  props: [
    'saveEdit',
    'patient',
    'doctor'
  ],
  setup () {
    return { $v: useVuelidate() }
  },
  data () {
    return {
      form: {
        // id: 0,
        name: '',
        secondName: '',
        phoneNumber: '',
        born: '',
        age: '',
        referrer: '',
        origin: '',
        id: 0,
        title: '',
        startDate: '',
        startTime: '',
        doctor: [],
        start: '',
        referred: '',
        description: ''
      },
      ageSel: '',
      ageOptions: [
        'Días',
        'Meses',
        'Años'
      ],
      referredOptions: [
        'IGSS',
        'Centro Galo',
        'Doctor'
      ],
      patientField: [
        {
          name: '',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading',
          callback: function (value) {
            if (value.apellido_casada) {
              return `${value.nombre}  ${value.apellidos}  ${value.apellido_casada}`
            } else {
              return `${value.nombre}  ${value.apellidos} `
            }
          }
        },
        {
          name: 'telefono',
          sortField: 'telefono',
          title: 'Teléfono',
          dataClass: 'list-item-heading'
        },
        {
          name: 'sexo',
          sortField: 'sexo',
          title: 'Sexo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'num_expediente',
          sortField: 'num_expediente',
          title: 'No. expediente',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_sangres.nombre',
          sortField: 'tipo_sangre.nombre',
          title: 'Tipo sangre',
          dataClass: 'list-item-heading'
        }
      ],
      doctorField: [
        {
          name: '',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading',
          callback: function (value) {
            return `${value.nombre}  ${value.apellido}`
          }
        },
        {
          name: 'telefono',
          sortField: 'telefono',
          title: 'Teléfono',
          dataClass: 'list-item-heading'
        },
        {
          name: 'especialidade.nombre',
          sortField: 'specialty',
          title: 'Especialidad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_medico.nombre',
          sortField: 'type',
          title: 'Tipo',
          dataClass: 'list-item-heading'
        }
      ],
      mask_quetzal: createNumberMask({
        prefix: 'Q ',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2, // how many digits allowed after the decimal
        integerLimit: 10, // limit length of integer numbers
        allowNegative: false,
        allowLeadingZeroes: false
      }),
      alertSecs: 5,
      alertCountDownError: 0,
      alertErrorText: ''
    }
  },
  validations () {
    return {
      form: {
        startDate: { required },
        startTime: { required },
        doctor: { required },
        name: { },
        secondName: { },
        phoneNumber: { },
        born: { },
        age: { },
        referrer: { },
        origin: { },
        description: { }
      }
    }
  },
  methods: {
    onValidate (action) {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'save') {
          this.onSave()
        } else if (action === 'edit') {
          this.onUpdate()
        } else {
          this.onDeleteModal()
        }
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    onSave () {
      const me = this
      this.form.age = `${this.form.age} ${this.ageSel}`
      console.log(this.form.age)
      axios.post(apiUrl + '/citarapida/create', {
        form: me.form })
        .then((response) => {
          me.closeModal(this.saveEdit)
          me.$emit('savedAppointment', response.data)
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/consulta/update', {
        form: me.form })
        .then((response) => {
          console.log(response)
          me.closeModal(this.saveEdit)
          me.$emit('updatedAppointment', response.data)
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    onDelete () {
      const me = this
      axios.delete(apiUrl + '/consulta/delete', {
        data: {
          id: this.form.id
        } })
        .then((response) => {
          console.log(response.data)
          me.closeModal(this.saveEdit)
          me.$emit('deleteAppointment', response.data)
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    onDeleteModal () {
      this.$refs['deleteModal'].show()
    },
    openModal () {
      this.$v.$reset()
      this.form.id = 0
      this.form.title = ''
      this.form.startDate = ''
      this.form.startTime = ''
      this.form.patient = []
      this.form.doctor = []
      this.form.start = ''
      this.form.referrer = ''
      this.form.name = ''
      this.form.secondName = ''
      this.form.phoneNumber = ''
      this.form.born = ''
      this.form.age = ''
      this.origin = ''
      this.description = ''
      this.$refs['modalAppointment'].show()
    },
    openModalClick (form) {
      this.$v.$reset()
      this.form.title = ''
      this.form.patient = []
      this.form.doctor = []
      this.form.start = ''
      this.form.startDate = form.startDate
      this.form.startTime = form.startTime
      this.form.referrer = ''
      this.form.id = 0
      this.form.name = ''
      this.form.secondName = ''
      this.form.phoneNumber = ''
      this.form.born = ''
      this.form.age = ''
      this.form.origin = ''
      this.description = ''
      this.handleChangeTime()
      // console.log(form)
      // this.form.startDate = ''
      // this.form.startTime = ''
      this.$refs['modalAppointment'].show()
    },
    openEditModal (form) {
      console.log('openedit')
      console.log(form)
      this.$v.$reset()
      this.form.id = form.id
      this.form.startDate = form.startDate
      this.form.startTime = form.startTime
      this.form.patient = [form.patient]
      this.form.doctor = [form.doctor]
      this.form.title = form.title
      this.form.referred = form.referred
      this.handleChangeTime()
      this.$refs['modalAppointment'].show()
    },
    closeModal () {
      switch (this.saveEdit) {
        case 'save':
          this.$v.$reset()
          this.form.id = 0
          this.form.title = ''
          this.form.startDate = ''
          this.form.startTime = ''
          this.form.patient = []
          this.form.doctor = []
          this.form.start = ''
          this.form.referred = ''
          this.form.name = ''
          this.form.secondName = ''
          this.form.phoneNumber = ''
          this.form.born = ''
          this.form.age = ''
          this.form.origin = ''
          this.form.description = ''
          this.$emit('closeModal')
          this.$refs['modalAppointment'].hide()
          break
        case 'edit':
          this.$v.$reset()
          this.form.id = 0
          this.form.title = ''
          this.form.startDate = ''
          this.form.startTime = ''
          this.form.patient = []
          this.form.doctor = []
          this.form.start = ''
          this.form.referred = ''
          this.form.name = ''
          this.form.secondName = ''
          this.form.phoneNumber = ''
          this.form.born = ''
          this.form.age = ''
          this.form.origin = ''
          this.form.description = ''
          this.$emit('closeModal')
          this.$refs['modalAppointment'].hide()
          break
        case 'deleteModal':
          break
      }
    },
    openPatientModal () {
      this.$refs.patientModal.openModal()
    },
    openDoctorModal () {
      this.$refs.doctorModal.openModal()
    },
    getPatient (patient) {
      if (patient !== '') {
        this.form.patient.push(patient)
        this.$refs.patientVuetable.refresh()
        this.form.title = `${patient.nombre} ${patient.apellidos}`
      } else {
        this.form.patient.pop()
        this.$refs.patientVuetable.refresh()
        this.form.title = ''
      }
    },
    getDoctor (doctor) {
      if (doctor !== '') {
        this.form.doctor.push(doctor)
        this.$refs.doctorVuetable.refresh()
      } else {
        this.form.doctor.pop()
        this.$refs.doctorVuetable.refresh()
      }
    },
    handleChangeTime () {
      this.form.start = moment(`${this.form.startDate} ${this.form.startTime}`).format('YYYY-MM-DDTHH:mm:ss')
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    }
  }
})
</script>
