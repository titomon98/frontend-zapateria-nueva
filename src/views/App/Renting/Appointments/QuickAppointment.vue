<template>
  <b-container fluid>
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
    <QuickAppointmentModal
      ref="appointmentModal"
      @savedAppointment="savedAppointment"
      @updatedAppointment="updatedAppointment"
      @closeModal="closeModal"
      @deleteAppointment="deleteAppointment"
      :eventClick="handleEventClick"
      :patient="patient"
      :doctor="doctor"
      :saveEdit="saveEdit"
    />
    <b-row>
      <b-col md="12">
        <iq-card class="calender-small">
          <template v-slot:headerTitle>
            <h4 class="card-title">Consultas rapidas</h4>
          </template>
          <template v-slot:headerAction>
            <a href="#" class="btn btn-primary" @click="openModal('appointment')"><i class="ri-add-line mr-2"></i>Añadir consulta</a>
          </template>
          <template v-slot:body>
            <VueFullCalendar ref="calendar" :options="calendarOptions" />
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import esLocale from '@fullcalendar/core/locales/es'
import VueFullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { xray } from '../../../../config/pluginInit'
import QuickAppointmentModal from './components/QuickAppointmentModal'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'
import { apiUrl } from '../../../../config/constant'
import moment from 'moment'

export default {
  name: 'QuickAppointment',
  components: {
    QuickAppointmentModal,
    VueFullCalendar
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    let calendarApi = this.$refs.calendar.getApi()
    setTimeout(() => {
      calendarApi.changeView('timeGridWeek')
    }, 800)
  },
  data () {
    return {
      calendarOptions: {
        timeZone: 'America/Guatemala',
        locales: [ esLocale ],
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ],
        initialView: 'listWeek',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        // eventClick: this.handleEventClick,
        events: this.handleEvent,
        dateClick: this.handleDateClick
      },
      events: [
      ],
      config: {
        dateFormat: 'Y-m-d',
        inline: true
      },
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        startDate: new Date('today').toString(),
        startTime: '',
        start: '',
        end: '',
        title: '',
        patient: null,
        medic: {},
        state: 1,
        referred: ''
      },
      patient: null,
      doctor: null,
      options: [
        { value: '1', nombre: 'Clínicia' },
        { value: '2', nombre: 'Centro' }
      ],
      columna: { value: '1', nombre: 'Clínica' },
      centros: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/clinica/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'numero',
          sortField: 'number',
          title: 'Número',
          dataClass: 'list-item-heading'
        },
        {
          name: 'centro.nombre',
          sortField: 'centro.nombre',
          title: 'Centro',
          dataClass: 'list-item-heading'
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted',
          width: '25%'
        }
      ],
      saveEdit: '',
      etapa: 'Mes'
    }
  },
  validations () {
    return {
      form: {
        start: { /* required */ },
        end: { /* required */ }
      }
    }
  },
  methods: {
    prueba () {
      console.log('holaaaaaa')
    },
    openModal (modal) {
      switch (modal) {
        case 'appointment': {
          this.saveEdit = 'save'
          this.$refs.appointmentModal.openModal()
          break
        }
      }
    },
    closeModal () {
      this.patient = null
      this.doctor = null
    },
    onValidate (action) {

    },
    setData (data) {
      this.form.number = data.numero
      this.form.state = data.estado
      this.form.id = data.id
      this.form.site = data.centro
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/clinica/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la clinca ' + me.form.number + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/clinica/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la clinica ' + me.form.number + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
          console.error('Error!', error)
        })
    },
    onState () {
      let me = this
      if (this.form.state === 1) {
        axios
          .put(apiUrl + '/clinica/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la clinica ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/clinica/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el clinica ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      }
    },
    makeQueryParams (sortOrder, currentPage, perPage) {
      return sortOrder[0]
        ? {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.value
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.value
        }
    },
    changePageSizes (perPage) {
      this.perPage = perPage
      this.$refs.vuetable.refresh()
    },
    searchChange (val) {
      this.search = val.toLowerCase()
      this.$refs.vuetable.refresh()
    },
    onPaginationData (paginationData) {
      this.from = paginationData.from
      this.to = paginationData.to
      this.total = paginationData.total
      this.lastPage = paginationData.last_page
      this.items = paginationData.data
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    showAlert () {
      this.alertCountDown = this.alertSecs
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    },
    changeTypeSearch (columna) {
      this.columna = columna
    },
    savedAppointment (appointment) {
      let calendarApi = this.$refs.calendar.getApi()
      calendarApi.refetchEvents()
      this.alertVariant = 'success'
      this.showAlert()
      this.alertText = 'Se ha creado la consulta de: ' + appointment.title + ' exitosamente'
    },
    updatedAppointment (appointment) {
      let calendarApi = this.$refs.calendar.getApi()
      calendarApi.refetchEvents()
      this.alertVariant = 'warning'
      this.showAlert()
      this.alertText = 'Se ha actualizado la consulta exitosamente'
    },
    deleteAppointment () {
      let calendarApi = this.$refs.calendar.getApi()
      calendarApi.refetchEvents()
      this.alertVariant = 'danger'
      this.showAlert()
      this.alertText = 'Se ha eliminado la consulta'
    },
    handleEventClick (arg) {
      let event = arg.event
      let date = moment(event.start).add(6, 'hour')
      let startDate = moment(date).format('yyyy-MM-DD')
      let startTime = moment(date).format('h:mm:ss')
      let form = {
        id: event.id,
        title: event.title,
        startDate: startDate,
        startTime: startTime,
        patient: event.extendedProps.paciente,
        doctor: event.extendedProps.medico,
        referred: event.extendedProps.referido
      }
      // console.log(form)
      this.patient = event.extendedProps.paciente
      this.doctor = event.extendedProps.medico
      this.saveEdit = 'edit'
      this.$refs.appointmentModal.openEditModal(form)
    },
    handleEvent (payload, successCallback, failureCallback) {
      const { startStr, endStr } = payload
      // const me = this
      axios.get(apiUrl + '/consulta/calendar', {
        params: {
          start: startStr,
          end: endStr
        }
      })
        .then((response, error) => {
          if (error) {
            failureCallback(error)
          } else {
            successCallback(
              response.data.map(function (event) {
                return {
                  ...event,
                  startt: event.start,
                  backgroundColor: '#17a2b8'
                }
              })
            )
          }
        })
    },
    handleDateClick (event) {
      let date = event.dateStr
      let startDate = moment(date).format('yyyy-MM-DD')
      let startTime = moment(date).format('h:mm:ss')
      let form = {
        startDate: startDate,
        startTime: startTime
      }
      this.saveEdit = 'save'
      this.$refs.appointmentModal.openModalClick(form)
    }
  }
}
</script>

<style lang='scss'>
  .fc-event-time, .fc-event-title{
    color: black !important;
  }
  // .fc-view-harness {}
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import '~@fullcalendar/list/main.min.css';
</style>
