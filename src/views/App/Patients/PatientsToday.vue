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
    <b-modal id="modal1" ref="modal1" title="Pasar a lista de espera">
      <h4>¿Desea pasa al paciente a la lista de espera?</h4>
      <template #modal-footer="{}">
        <b-button type="submit" variant="primary" @click="sendWaitList"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal1')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
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
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Pacientes de hoy</h4>
            </template>
          <template v-slot:body>
            <datatable-heading
              :changePageSize="changePageSizes"
              :searchChange="searchChange"
              :from="from"
              :to="to"
              :total="total"
              :perPage="perPage"
            >
            </datatable-heading>
            <vuetable
              ref="vuetable"
              class="table-divided order-with-arrow"
              :api-url="apiBase"
              :query-params="makeQueryParams"
              :per-page="perPage"
              :reactive-api-url="true"
              :fields="fields"
              pagination-path
              @vuetable:pagination-data="onPaginationData"
            >
              <!-- Estado -->
              <div slot="estado" slot-scope="props">
                <h5 v-if="props.rowData.estado == 1">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>ACTIVO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else>
                  <b-badge variant="light"
                    ><h6 class="danger"><strong>INACTIVO</strong></h6></b-badge
                  >
                </h5>
              </div>
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-b-tooltip.top="'Editar'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal1
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-check'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Pasar a lista de espera'"
                    @click="setData(props.rowData)"
                    v-b-modal.deleteModal
                    class="mb-2"
                    size="sm"
                    variant="outline-danger"
                    ><i :class="'fas fa-trash-alt'"
                  /></b-button>
                </b-button-group>
              </template>
              <!-- Paginacion -->
            </vuetable>
            <vuetable-pagination-bootstrap
                ref="pagination"
                @vuetable-pagination:change-page="onChangePage"
              />
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import DatatableHeading from '../../Tables/DatatableHeading'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../components/common/VuetablePaginationBootstrap'
// import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import moment from 'moment'

export default {
  name: 'BlankPage',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
    // 'vuetablePagination': VuetablePagination
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    axios.get(apiUrl + '/type/get').then((response) => {
      this.typeOptions = response.data
    })
  },
  data () {
    return {
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0
      },
      apiBase: apiUrl + '/consulta/today_calendar',
      typeOptions: [],
      options: [
        { value: '1', nombre: 'Usuario' },
        { value: '2', nombre: 'Tipo usuario' }
      ],
      columna: { value: '1', nombre: 'Usuario' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
          // width: "15%",
        },
        {
          name: 'title',
          sortField: 'title',
          title: 'Paciente',
          dataClass: 'list-item-heading'
          // width: "25%",
        },
        {
          name: 'paciente.telefono',
          sortField: 'paciente.telefono',
          title: 'Teléfono',
          dataClass: 'list-item-heading'
          // width: "25%",
        },
        {
          name: 'start',
          sortField: 'start',
          title: 'Fecha y hora',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return moment(value).format('YYYY-MM-DD hh:mm')
          }
          // width: "25%",
        },
        {
          name: 'referido',
          sortField: 'referido',
          title: 'Referido',
          dataClass: 'list-item-heading'
          // width: "25%",
        },
        {
          name: 'medico',
          sortField: 'medico',
          title: 'Doctor',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return `${value.nombre}  ${value.apellido}`
          }
          // width: "25%",
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted',
          width: '25%'
        }
      ],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: ''
    }
  },
  validations () {
    return {
      form: {
        user: { required },
        password: { required },
        userType: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.user = ''
          this.form.password = ''
          this.form.userType = []
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal1'].hide()
          this.form.id = 0
          this.form.user = ''
          this.form.password = ''
          this.form.userType = []
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.form.id = 0
          this.form.user = ''
          this.form.password = ''
          this.form.userType = []
          this.form.state = 1
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'save') {
          this.onSave()
        } else if (action === 'update') {
          this.onUpdate()
        }
      }
    },
    setData (data) {
      console.log(data)
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      // this.$refs["modalSave"].hide();
      axios.post(apiUrl + '/user/create', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error('Error!', error)
        })
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/user/update', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error('Error!', error)
        })
    },
    onState () {
      let me = this
      if (this.form.state === 1) {
        axios
          .put(apiUrl + '/user/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-3'].hide()
          })
          .catch((error) => {
            // this.errorMessage = error.message;
            console.error('There was an error!', error)
          })
      } else {
        console.log('funciona')
        axios
          .put(apiUrl + '/user/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-4'].hide()
          })
          .catch((error) => {
            // this.errorMessage = error.message;
            console.error('There was an error!', error)
          })
      }
    },
    makeQueryParams (sortOrder, currentPage, perPage) {
      return sortOrder[0]
        ? {
          page: currentPage,
          limit: this.perPage
        }
        : {
          page: currentPage,
          limit: this.perPage
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
    changeTypeSearch (columna) {
      this.columna = columna
    },
    sendWaitList () {
      let me = this
      axios.put(apiUrl + '/consulta/sendWaitList', {
        id: me.form.id })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.$refs['modal1'].hide()
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha pasado el paciente a lista de espera exitosamente'
        })
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error('Error!', error)
        })
    },
    onDelete () {
      const me = this
      axios.delete(apiUrl + '/consulta/delete', {
        data: {
          id: me.form.id
        } })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.$refs['deleteModal'].hide()
          me.alertVariant = 'danger'
          me.showAlert()
          me.alertText = 'Se ha eliminado la cita exitosamente'
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    showAlert () {
      this.alertCountDown = this.alertSecs
    }
  }
}
</script>
