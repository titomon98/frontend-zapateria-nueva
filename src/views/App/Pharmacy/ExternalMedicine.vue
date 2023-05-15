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
    <b-modal id="modal-1" ref="modal-1" title="Agregar medicamento externo">
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
        <b-form-group label="Marca:">
            <v-select
              name="brand"
              v-model="$v.form.brand.$model"
              :options="brands"
              label="nombre"
              placeholder="Seleccione la marca"
            >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{'Nombre: '+ option.nombre + ' Casa medica: ' + option.casa_medica.nombre}}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{'Nombre: '+ option.nombre + ' Casa medica: ' + option.casa_medica.nombre}}
            </template>
            </v-select>
        </b-form-group>
        <b-form-group label="Tipo:">
            <v-select
              name="medicationType"
              v-model="$v.form.medicationType"
              :options="types"
              label="nombre"
              placeholder="Seleccione el tipo de medicamento"
            />
        </b-form-group>
        <b-form-group label="Presentacion:">
            <v-select
              name=""
              v-model="$v.form.presentation.$model"
              :options="presentations"
              label="nombre"
              placeholder="Seleccione la presentacion"
            />
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre del medicamento"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre del medicamento
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.code.$model"
            :state="!$v.form.code.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vue-barcode
            :value="form.code"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vue-barcode>
          <div v-if="$v.form.code.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
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
    <b-modal id="modal-2" ref="modal-2" title="Editar Medicamento externo">
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
        <b-form-group label="Marca:">
            <v-select
              name="brand"
              v-model="$v.form.brand.$model"
              :options="brands"
              label="nombre"
              placeholder="Seleccione la marca"
            >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{'Nombre: '+ option.nombre + ' Casa medica: ' + option.casa_medica.nombre}}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{'Nombre: '+ option.nombre + ' Casa medica: ' + option.casa_medica.nombre}}
            </template>
            </v-select>
        </b-form-group>
        <b-form-group label="Tipo:">
            <v-select
              name="medicationType"
              v-model="$v.form.medicationType"
              :options="types"
              label="nombre"
              placeholder="Seleccione el tipo de medicamento"
            />
        </b-form-group>
        <b-form-group label="Presentacion:">
            <v-select
              name=""
              v-model="$v.form.presentation.$model"
              :options="presentations"
              label="nombre"
              placeholder="Seleccione la presentacion"
            />
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre del medicamento"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre del medicamento
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.code.$model"
            :state="!$v.form.code.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vue-barcode
            :value="form.code"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vue-barcode>
          <div v-if="$v.form.code.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
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
    <b-modal id="modal-3" ref="modal-3" title="Desactivar medicamento externo">
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
        ¿Desea desactivar el medicamento: {{ form.name }} ?
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
    <b-modal id="modal-4" ref="modal-4" title="Activar medicamento externo">
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
        ¿Desea activar el medicamento: {{ form.name }} ?
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
              <h4 class="card-title mt-3">Medicamentos Externos</h4>
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
                    v-b-tooltip.top="'Editar'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
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
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import VueBarcode from 'vue-barcode'

export default {
  name: 'Medicine',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    'vue-barcode': VueBarcode
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    axios.get(apiUrl + '/marca/get').then((response) => {
      this.brands = response.data
    })
    axios.get(apiUrl + '/tipo_medicamento/get').then((response) => {
      this.types = response.data
    })
    axios.get(apiUrl + '/presentacion/get').then((response) => {
      this.presentations = response.data
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
        brand: [],
        medicationType: [],
        presentation: [],
        id: 0,
        name: '',
        code: '',
        state: 1
      },
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'codigo', nombre: 'Código' },
        { value: 'marca', nombre: 'Marca' },
        { value: 'tipo', nombre: 'Tipo' },
        { value: 'presentacion', nombre: 'Presentación' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      brands: [],
      types: [],
      presentations: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/medicamento_externo/list',
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
          name: 'codigo',
          sortField: 'code',
          title: 'Codigo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'marca',
          sortField: 'brand',
          title: 'marca',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            if (value) {
              return value.nombre + ' | Casa Medica: ' + value.casa_medica.nombre
            } else {
              return 'No especifica'
            }
          }
        },
        {
          name: 'tipo_medicamento.nombre',
          sortField: 'medicationType',
          title: 'Tipo de medicamento',
          dataClass: 'list-item-heading'
        },
        {
          name: 'presentacione.nombre',
          sortField: 'presentation',
          title: 'Presentacion',
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
        name: { required },
        code: { required },
        brand: { required },
        presentation: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.name = ''
          this.form.code = ''
          this.form.state = 1
          this.form.brand = []
          this.form.medicationType = []
          this.form.presentation = []
          break
        }
        case 'code': {
          this.form.code = ''
          var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          var charactersLength = characters.length
          for (var i = 0; i < 10; i++) {
            this.form.code += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            )
          }
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
          this.form.code = ''
          this.form.existence = ''
          this.form.state = 1
          this.form.brand = []
          this.form.medicationType = []
          this.form.presentation = []
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          this.form.medicalHouse = []
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
      console.log(data)
      this.form.name = data.nombre
      this.form.state = data.estado
      this.form.id = data.id
      this.form.code = data.codigo
      this.form.existence = data.existencia_total
      this.form.brand = data.marca
      this.form.medicationType = data.tipo_medicamento
      this.form.presentation = data.presentacione
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/medicamento_externo/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el medicamento externo ' + me.form.name + ' exitosamente'
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
      axios.put(apiUrl + '/medicamento_externo/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el medicamento externo ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/medicamento_externo/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el medicamento externo ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/medicamento_externo/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el medicamento externo ' + me.form.name + ' exitosamente'
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
    }
  }
}
</script>
