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
    <b-modal id="modal-1" ref="modal-1" title="Agregar seguro">
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
        <b-form-group label="Seguro:">
          <b-form-input
            v-model.trim="$v.form.insurance.$model"
            :state="!$v.form.insurance.$error"
            placeholder="Ingresar seguro"
          ></b-form-input>
          <div v-if="$v.form.insurance.required.$invalid" class="invalid-feedback">
            Debe ingresar el Seguro
          </div>
        </b-form-group>
        <b-form-group label="Prioridad:">
          <v-select
            v-model="$v.form.priority.$model"
            :state="!$v.form.priority.$error"
            :options="priorities"
            label="name"
            placeholder="Seleccione prioridad"
          />
          <div v-if="$v.form.priority.$error" class="invalid-feedback-vselect">
            Debe seleccionar una prioridad
          </div>
        </b-form-group>
        <b-form-group label="Activo:">
          <v-select
            v-model="$v.form.active.$model"
            :state="!$v.form.active.$error"
            :options="actives"
            label="name"
            placeholder="Seleccione una opción"
          />
          <div v-if="$v.form.active.$error" class="invalid-feedback-vselect">
            Debe seleccionar una opción
          </div>
        </b-form-group>
        <b-form-group label="Fecha de contratación:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.date.$model"
            :state="!$v.form.date.$error"
            placeholder="Ingresar fecha"
          ></b-form-input>
          <div v-if="$v.form.date.$error" class="invalid-feedback-vselect">
            Debe ingresar la fecha
          </div>
        </b-form-group>
        <b-form-group label="Valido hasta:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.valid.$model"
            :state="!$v.form.valid.$error"
            placeholder="Ingresar la ultima fecha valida"
          ></b-form-input>
          <div v-if="$v.form.valid.$error" class="invalid-feedback-vselect">
            Debe ingresar una ultima fecha
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
    <b-modal id="modal-2" ref="modal-2" title="Actualizar seguro">
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
        <b-form-group label="Seguro:">
          <b-form-input
            v-model.trim="$v.form.insurance.$model"
            :state="!$v.form.insurance.$error"
            placeholder="Ingresar seguro"
          ></b-form-input>
          <div v-if="$v.form.insurance.required.$invalid" class="invalid-feedback">
            Debe ingresar el Seguro
          </div>
        </b-form-group>
        <b-form-group label="Prioridad:">
          <v-select
            v-model="$v.form.priority.$model"
            :state="!$v.form.priority.$error"
            :options="priorities"
            label="name"
            placeholder="Seleccione prioridad"
          />
          <div v-if="$v.form.priority.$error" class="invalid-feedback-vselect">
            Debe seleccionar una prioridad
          </div>
        </b-form-group>
        <b-form-group label="Activo:">
          <v-select
            v-model="$v.form.active.$model"
            :state="!$v.form.active.$error"
            :options="actives"
            label="name"
            placeholder="Seleccione una opción"
          />
          <div v-if="$v.form.active.$error" class="invalid-feedback-vselect">
            Debe seleccionar una opción
          </div>
        </b-form-group>
        <b-form-group label="Fecha de contratación:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.date.$model"
            :state="!$v.form.date.$error"
            placeholder="Ingresar fecha"
          ></b-form-input>
          <div v-if="$v.form.date.$error" class="invalid-feedback-vselect">
            Debe ingresar la fecha
          </div>
        </b-form-group>
        <b-form-group label="Valido hasta:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.valid.$model"
            :state="!$v.form.valid.$error"
            placeholder="Ingresar la ultima fecha valida"
          ></b-form-input>
          <div v-if="$v.form.valid.$error" class="invalid-feedback-vselect">
            Debe ingresar una ultima fecha
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
    <b-modal id="modal-3" ref="modal-3" title="Desactivar ">
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
        ¿Desea desactivar el seguro  {{ form.insurance }} ?
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
    <b-modal id="modal-4" ref="modal-4" title="Activar">
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
        ¿Desea activar el seguro  {{ form.insurance }} ?
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
              <h4 class="card-title mt-3">Seguros </h4>
              <div class="iq-search-bar mt-2">
                <div class="row">
                  <div class="col-sm">
                    <b-form action="#" class="searchbox">
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
            <b-button variant="primary" @click="openModal('save')">AGREGAR SEGURO</b-button>
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
                    @click="
                      setData(props.rowData);
                      openModal('update');
                    "
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
import { xray } from '../../../../config/pluginInit'
import DatatableHeading from '../../../Tables/DatatableHeading'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../../components/common/VuetablePaginationBootstrap'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../config/constant'
import { mapGetters } from 'vuex'

export default {
  name: 'Insurance',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  props: [
    'patientId'
  ],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
  setup () {
    return { $v: useVuelidate() }
  },
  beforeMount () {
    this.form.userId = this.currentUser.uid
    this.form.patientId = this.patientId
  },
  mounted () {
    xray.index()
    // <---Aqui se recibe el id de paciente
  },
  data: () => {
    return {
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        active: '',
        priority: '',
        insurance: '',
        date: '',
        valid: '',
        state: 1
      },
      apiBase: apiUrl + '/seguros/list',
      typeOptions: [],
      options: [
        { value: 'seguro', nombre: 'Seguro' },
        { value: 'prioridad', nombre: 'Prioridad' },
        { value: 'activo', nombre: 'Activo ' }
      ],
      columna: { value: 'seguro', nombre: 'Seguro' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
          // width: "15%",
        },
        {
          name: 'seguro',
          sortField: 'insurance',
          title: 'Seguro',
          dataClass: 'list-item-heading'
        },
        {
          name: 'prioridad',
          sortField: 'priority',
          title: 'Prioridad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'activo',
          sortField: 'asset',
          title: 'Activo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'fecha',
          sortField: 'date',
          title: 'Fecha',
          dataClass: 'list-item-heading'
        },
        {
          name: 'valido_hasta',
          sortField: 'valid',
          title: 'Valido Hasta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'usuario',
          sortField: 'user',
          title: 'Usuario',
          dataClass: 'list-item-heading',
          callback: function (value) {
            return `${value.nombre} ${value.apellidos}`
          }
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted'
        }
      ],
      priorities: [
        { value: 'Alta', name: 'Alta' },
        { value: 'Baja', name: 'Baja' }
      ],
      actives: [
        { value: 'Si', name: 'Si' },
        { value: 'No', name: 'No' }
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
        active: { required },
        priority: { required },
        insurance: { required },
        date: { required },
        valid: { required }
      }
    }
  },
  methods: {
    pacienteNull () {
      if (this.product.id === undefined) {
        // En caso de que el paciente no este
        this.$router.push({ name: 'Paciente'
        })
      } else {
        this.fetchData(1, this.product.id, this.search, this.checkboxmanual)
        this.idproduct = this.product.id
      }
    },
    getPatient (id) {
      let me = this
      axios.get(`patient/getById?id=${id}`)
        .then(function (response) {
          me.product = response.data.product[0]
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1'].show()
          this.form.id = 0
          this.form.priority = ''
          this.form.insurance = ''
          this.form.date = ''
          this.form.active = ''
          this.form.valid = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].show()
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
          this.form.priority = ''
          this.form.insurance = ''
          this.form.date = ''
          this.form.active = ''
          this.form.valid = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.form.id = 0
          this.form.priority = ''
          this.form.insurance = ''
          this.form.date = ''
          this.form.active = ''
          this.form.valid = ''
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
      this.form.priority = data.prioridad
      this.form.insurance = data.seguro
      this.form.date = data.fecha
      this.form.valid = data.valido_hasta
      this.form.active = data.activo
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/seguros/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el seguro ' + me.form.insurance + ' exitosamente'
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
      axios.put(apiUrl + '/seguros/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el seguro ' + me.form.insurance + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    onState () {
      let me = this
      if (this.form.state === 1) {
        axios
          .put(apiUrl + '/seguros/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-3'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/seguros/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-4'].hide()
          })
          .catch((error) => {
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
          patientId: this.patientId,
          columna: this.columna.value
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          patientId: this.patientId,
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
    changeTypeSearch (columna) {
      this.columna = columna
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
