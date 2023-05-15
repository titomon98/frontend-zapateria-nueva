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
    <b-modal id="modal-1" ref="modal-1" title="Agregar paciente rapido">
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
            placeholder="Ingresar nombre para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Apellidos:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar apellidos para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Numero de telefono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar numero de telefono para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Edad:">
          <b-form-input
            v-model.trim="$v.form.age.$model"
            :state="!$v.form.age.$error"
            placeholder="Ingresar edad del paciente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Fecha de nacimiento:">
          <b-form-input
          type="date"
            v-model.trim="$v.form.born.$model"
            :state="!$v.form.born.$error"
            placeholder="Ingresar fecha de nacimiento para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Referente:">
          <b-form-input
            v-model.trim="$v.form.referrer.$model"
            :state="!$v.form.referrer.$error"
            placeholder="Ingresar nombre del referido para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Procendete:">
          <b-form-input
            v-model.trim="$v.form.origin.$model"
            :state="!$v.form.origin.$error"
            placeholder="Ingresar procedencia para paciente rapido"
          ></b-form-input>
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
    <b-modal id="modal-2" ref="modal-2" title="Editar paciente rapido">
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
            placeholder="Ingresar nombre para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Apellidos:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar apellidos para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Numero de telefono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar numero de telefono para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Edad:">
          <b-form-input
            v-model.trim="$v.form.age.$model"
            :state="!$v.form.age.$error"
            placeholder="Ingresar edad del paciente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Fecha de nacimiento:">
          <b-form-input
          type="date"
            v-model.trim="$v.form.born.$model"
            :state="!$v.form.born.$error"
            placeholder="Ingresar fecha de nacimiento para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Referente:">
          <b-form-input
            v-model.trim="$v.form.referrer.$model"
            :state="!$v.form.referrer.$error"
            placeholder="Ingresar nombre del referido para paciente rapido"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Procendete:">
          <b-form-input
            v-model.trim="$v.form.origin.$model"
            :state="!$v.form.origin.$error"
            placeholder="Ingresar procedencia para paciente rapido"
          ></b-form-input>
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
    <b-modal id="modal-3" ref="modal-3" title="Desactivar paciente rapido">
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
        ¿Desea desactivar paciente rapido: {{ form.name }} ?
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
    <b-modal id="modal-4" ref="modal-4" title="Activar paciente rapido">
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
        ¿Desea activar al paciente rapido: {{ form.name }} ?
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
              <h4 class="card-title mt-3">Paciente rapido</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
            <b-button variant="primary"  v-b-modal.modal-1>AGREGAR NUEVO</b-button>
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
                    @click="pushUpdatePatient(props.rowData.id)"
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-pencil-alt'"
                  /></b-button>
                  <b-button
                    @click="setData(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
                  /></b-button>
                  <b-button
                    @click="
                      setData(props.rowData);
                      props.rowData.estado == 1
                        ? $bvModal.show('modal-3')
                        : $bvModal.show('modal-4');
                    "
                    class="mb-2"
                    size="sm"
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
import axios from 'axios'
import { apiUrl } from '../../../config/constant'

export default {
  name: 'PatientExpress',
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
      form: {
        id: 0,
        name: '',
        secondName: '',
        phoneNumber: '',
        born: '',
        age: '',
        referrer: '',
        origin: '',
        state: 1
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/paciente_express/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nombre',
          sortField: 'name',
          title: 'Nombre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'apellidos',
          sortField: 'secondName',
          title: 'Apellido',
          dataClass: 'list-item-heading'
        },
        {
          name: 'telefono',
          sortField: 'phoneNumber',
          title: 'Numero de telefono',
          dataClass: 'list-item-heading'
        },
        {
          name: 'nacimiento',
          sortField: 'born',
          title: 'Fecha de Nacimiento',
          dataClass: 'list-item-heading'
        },
        {
          name: 'referente',
          sortField: 'referrer',
          title: 'Referente',
          dataClass: 'list-item-heading'
        },
        {
          name: 'procedencia',
          sortField: 'origin',
          title: 'Procedencia',
          dataClass: 'list-item-heading'
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
        name: { },
        secondName: { },
        phoneNumber: { },
        born: { },
        age: { },
        referrer: { },
        origin: { }
      }
    }
  },
  methods: {
    pushUpdatePatient (id) {
      this.$router.push({ name: 'patient.patientUpdate', params: { id: id } })
    },
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.name = ''
          this.form.seconName = ''
          this.form.phoneNumber = ''
          this.form.age = ''
          this.form.born = ''
          this.form.referrer = ''
          this.form.origin = ''
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
          this.form.seconName = ''
          this.form.phoneNumber = ''
          this.form.age = ''
          this.form.born = ''
          this.form.referrer = ''
          this.form.origin = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.seconName = ''
          this.form.phoneNumber = ''
          this.form.age = ''
          this.form.born = ''
          this.form.referrer = ''
          this.form.origin = ''
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
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    setData (data) {
      this.form.name = data.nombre
      this.form.secondName = data.apellidos
      this.form.phoneNumber = data.telefono
      this.form.age = data.edad
      this.form.born = data.nacimiento
      this.form.referrer = data.referente
      this.form.origin = data.procedencia
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/paciente_express/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el paciente rapido ' + me.form.name + ' exitosamente'
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
      axios.put(apiUrl + '/paciente_express/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el paciente rapido ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/paciente_express/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el paciente rapido ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/paciente_express/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el paciente express ' + me.form.name + ' exitosamente'
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
          search: this.search
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search
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
    }
  }
}
</script>
