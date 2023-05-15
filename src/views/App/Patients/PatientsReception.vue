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
    <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
    >
      <div class="iq-alert-text">{{ alertErrorText }}</div>
    </b-alert>
    <b-modal id="modal-1" ref="modal-1" title="Agregar paciente">
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
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar el nombre del paciente"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Apellido:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar el apellido del paciente"
          ></b-form-input>
          <div v-if="$v.form.secondName.required.$invalid" class="invalid-feedback">
            Debe ingresar el apellido
          </div>
        </b-form-group>
        <b-form-group label="Teléfono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar el teléfono del paciente"
          ></b-form-input>
          <div v-if="$v.form.phoneNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de teléfono
          </div>
          <div v-if="$v.form.phoneNumber.numeric.$invalid" class="invalid-feedback">
            Debe ingresar solamente números
          </div>
        </b-form-group>
        <b-form-group label="Correo:">
          <b-form-input
            v-model.trim="$v.form.email.$model"
            :state="!$v.form.email.$error"
            placeholder="Ingresar el correo del paciente"
          ></b-form-input>
          <div v-if="$v.form.email.email.$invalid" class="invalid-feedback">
            Debe ingresar un correo válido
          </div>
        </b-form-group>
        <b-form-group label="Número de expediente:">
          <b-form-input
            v-model.trim="$v.form.fileNumber.$model"
            :state="!$v.form.fileNumber.$error"
            placeholder="Ingresar el número de expediente"
          ></b-form-input>
          <div v-if="$v.form.fileNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de expediente
          </div>
        </b-form-group>
        <b-form-group label="CUI:">
          <b-form-input
            v-model.trim="$v.form.cui.$model"
            :state="!$v.form.cui.$error"
            placeholder="Ingresar el cui del paciente"
          ></b-form-input>
          <div v-if="$v.form.cui.required.$invalid" class="invalid-feedback">
            Debe ingresar el cui
          </div>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('save')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2" ref="modal-2" title="Editar paciente">
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
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar el nombre del paciente"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Apellido:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar el apellido del paciente"
          ></b-form-input>
          <div v-if="$v.form.secondName.required.$invalid" class="invalid-feedback">
            Debe ingresar el apellido
          </div>
        </b-form-group>
        <b-form-group label="Teléfono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar el teléfono del paciente"
          ></b-form-input>
          <div v-if="$v.form.phoneNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de teléfono
          </div>
          <div v-if="$v.form.phoneNumber.numeric.$invalid" class="invalid-feedback">
            Debe ingresar solamente números
          </div>
        </b-form-group>
        <b-form-group label="Correo:">
          <b-form-input
            v-model.trim="$v.form.email.$model"
            :state="!$v.form.email.$error"
            placeholder="Ingresar el correo del paciente"
          ></b-form-input>
          <div v-if="$v.form.email.email.$invalid" class="invalid-feedback">
            Debe ingresar un correo válido
          </div>
        </b-form-group>
        <b-form-group label="Número de expediente:">
          <b-form-input
            v-model.trim="$v.form.fileNumber.$model"
            :state="!$v.form.fileNumber.$error"
            placeholder="Ingresar el número de expediente"
          ></b-form-input>
          <div v-if="$v.form.fileNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de expediente
          </div>
        </b-form-group>
        <b-form-group label="CUI:">
          <b-form-input
            v-model.trim="$v.form.cui.$model"
            :state="!$v.form.cui.$error"
            placeholder="Ingresar el cui del paciente"
          ></b-form-input>
          <div v-if="$v.form.cui.required.$invalid" class="invalid-feedback">
            Debe ingresar el cui
          </div>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('update')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3" ref="modal-3" title="Desactivar paciente">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <h6 class="my-4">
        ¿Desea desactivar al paciente: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4" ref="modal-4" title="Activar paciente">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <h6 class="my-4">
        ¿Desea activar al paciente: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Pacientes</h4>
              <div class="iq-search-bar mt-2">
                <div class="row">
                  <div class="col-sm">
                    <b-form v-if="columna.value == 'fecha'" action="#" class="searchbox">
                      <b-row class="mb-3">
                        <b-col cols="6">
                          <label for="">Inicio</label>
                          <b-input v-model="startDate" id="search" type="date" @input="searchDate" />
                        </b-col>
                        <b-col cols="6">
                          <label for="">Fin</label>
                          <b-input v-model="endDate" id="search" type="date" @input="searchDate" />
                        </b-col>
                      </b-row>
                        <!-- <b-form-group class="col-6">
                        </b-form-group>
                        <b-form-group class="col-6">
                        </b-form-group> -->
                        <!-- <a class="search-link" href="#"><i class="ri-search-line"></i></a> -->
                    </b-form>
                    <b-form v-else action="#" class="searchbox">
                        <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                        <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                    </b-form>
                  </div>
                  <div class="col-sm">
                    <b-dropdown
                      id="ddown1"
                      :text="columna.nombre"
                      variant="outline-dark"
                      class="mr-1 float-md-left btn-group"
                      size="xs"
                    >
                      <b-dropdown-item
                        v-for="(search, index) in options"
                        :key="index"
                        @click="changeTypeSearch(search)"
                        >{{ search.nombre }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:headerAction>
              <router-link
                to='patient'
              >
                <b-button variant="primary">AGREGAR NUEVO</b-button>
              </router-link>
              <router-link
              to="quick"
              >
                  <b-button variant="primary" class="ml-2">AGREGAR PACIENTE</b-button>
                </router-link>
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
                    @click="pushUpdatePatient(props.rowData.id)"
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Vista de recepción'"
                    @click="pushReception(props.rowData.id)"
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-paste'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="
                      props.rowData.estado == 1 ? 'Desactivar' : 'Activar'"
                    @click="
                      setData(props.rowData);
                      props.rowData.estado == 1
                        ? $bvModal.show('modal-3')
                        : $bvModal.show('modal-4');
                    "
                    class="mb-2"
                    :variant="
                      props.rowData.estado == 1 ? 'outline-danger' : 'outline-info'">
                    <i
                      :class="
                        props.rowData.estado == 1
                          ? 'fas fa-trash-alt'
                          : 'fas fa-check'"
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
import useVuelidate from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import moment from 'moment'

export default {
  name: 'Patients',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  setup () {
    return { $v: useVuelidate() }
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
      startDate: '',
      endDate: '',
      form: {
        id: 0,
        name: '',
        secondName: '',
        phoneNumber: '',
        email: '',
        fileNumber: '',
        birth: '',
        cui: '',
        age: '',
        referrer: '',
        origin: '',
        state: 1
      },
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'apellidos', nombre: 'Apellido' },
        { value: 'cui', nombre: 'CUI' },
        { value: 'num_expediente', nombre: 'Expediente' },
        { value: 'telefono', nombre: 'Teléfono' },
        { value: 'fecha', nombre: 'Fecha' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/paciente/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'num_expediente',
          sortField: 'num_expediente',
          title: 'No. expediente',
          dataClass: 'list-item-heading'
        },
        {
          name: '',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            if (value.apellido_casada === null) {
              return `${value.nombre}  ${value.apellidos}`
            } else {
              return `${value.nombre}  ${value.apellidos}  ${value.apellido_casada}`
            }
          }
        },
        {
          name: 'nombre_encargado',
          sortField: 'nombre_encargado',
          title: 'Nombre del encargado',
          dataClass: 'list-item-heading'
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
          name: 'tipo_sangres.nombre',
          sortField: 'tipo_sangre.nombre',
          title: 'Tipo sangre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cui',
          sortField: 'cui',
          title: 'CUI',
          dataClass: 'list-item-heading'
        },
        {
          name: 'estado_civil',
          sortField: 'estado_civil',
          title: 'Estado civil',
          dataClass: 'list-item-heading'
        },
        {
          name: 'createdAt',
          sortField: 'createdAt',
          title: 'Fecha de creación',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return moment(value).format('YYYY-MM-DD')
          }
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted',
          width: '25%'
        }
      ]
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
        email: {
          email
        },
        fileNumber: {
          required
        },
        cui: {
          required, numeric
        }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.secondName = ''
          this.form.phoneNumber = ''
          this.form.email = ''
          this.form.fileNumber = ''
          this.form.cui = ''
          this.form.birth = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
      }
    },
    pushHistory (id) {
      this.$router.push({ name: 'patient.history', params: { id: id } })
    },
    pushReception (id) {
      this.$router.push({ name: 'patient.reception', params: { id: id } })
    },
    pushUpdatePatient (id) {
      this.$router.push({ name: 'patient.patientUpdate', params: { id: id } })
    },
    onValidate (action) {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'save') {
          this.onSave()
        } else if (action === 'update') {
          this.onUpdate()
        }
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    setData (data) {
      this.form.name = data.nombre
      this.form.secondName = data.apellidos
      this.form.phoneNumber = data.telefono
      this.form.email = data.correo
      this.form.fileNumber = data.num_expediente
      this.form.cui = data.cui
      this.form.state = data.estado
      this.form.birth = data.nacimiento
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/paciente/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el paciente ' + me.form.name + ' exitosamente'
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
      // this.$refs["modalSave"].hide();
      axios.put(apiUrl + '/paciente/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el paciente ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/paciente/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el paciente ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/paciente/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el paciente ' + me.form.name + ' exitosamente'
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
          columna: this.columna.value,
          startDate: this.startDate,
          endDate: this.endDate
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.value,
          startDate: this.startDate,
          endDate: this.endDate
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
    searchDate () {
      if (this.startDate === '') {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'Seleccione una fecha de inicio para aplicar el filtro'
      } else if (this.endDate === '') {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'Seleccione una fecha de fin para aplicar el filtro'
      } else {
        this.$refs.vuetable.refresh()
      }
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
    }
  }
}
</script>
