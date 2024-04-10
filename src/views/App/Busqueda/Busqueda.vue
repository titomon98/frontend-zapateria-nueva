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
    <b-modal id="modal-solicitar" ref="modal-solicitar" size="xl" title="Solicitar zapatos">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-row class="ml-2">
        <b-col md="6" v-if="check===false">
          <b-form-group label="Tienda de origen:">
            <v-select
              name="tienda1"
              v-model="$v.tienda1.$model"
              :state="!$v.tienda1.$error"
              :options="tiendas"
              :filterable="false"
              :disabled="true"
              placeholder="Seleccione la tienda"
              @search="onSearchTiendas"
            >
              <template v-slot:spinner="{ loading }">
                <div v-show="loading">Cargando...</div>
              </template>
              <template v-slot:option="option">
                {{ option.nombre + " existencia en tienda: " + tienda1.cantidad }}
              </template>
              <template slot="selected-option" slot-scope="option">
                {{ option.nombre + " existencia en tienda: " + tienda1.cantidad }}
              </template>
            </v-select>
            <div v-if="$v.tienda1.$error" class="invalid-feedback-vselect">
              Debe seleccionar la tienda
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Tienda de destino:">
            <v-select
              name="tienda2"
              v-model="$v.tienda2.$model"
              :state="!$v.tienda2.$error"
              :options="tiendas"
              :filterable="false"
              placeholder="Seleccione la tienda"
              @search="onSearchTiendas"
            >
              <template v-slot:spinner="{ loading }">
                <div v-show="loading">Cargando...</div>
              </template>
              <template v-slot:option="option">
                {{ option.nombre }}
              </template>
              <template slot="selected-option" slot-scope="option">
                {{ option.nombre }}
              </template>
            </v-select>
            <div v-if="$v.tienda2.$error" class="invalid-feedback-vselect">
              Debe seleccionar la tienda
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="6" v-if="check===false">
          <b-form-group label="Responsable de envío:">
            <v-select
              name="responsable"
              v-model="$v.responsable.$model"
              :state="!$v.responsable.$error"
              :options="responsables"
              :filterable="false"
              placeholder="Seleccione responsable de envío"
              @search="onSearchPersonas"
            >
              <template v-slot:spinner="{ loading }">
                <div v-show="loading">Cargando...</div>
              </template>
              <template v-slot:option="option">
                {{ option.nombre + ' ' + option.apellidos }}
              </template>
              <template slot="selected-option" slot-scope="option">
                {{ option.nombre + ' ' + option.apellidos }}
              </template>
            </v-select>
            <div v-if="$v.responsable.$error" class="invalid-feedback-vselect">
              Debe seleccionar el responsable
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Cantidad solicitada:">
            <b-form-input
            type="number"
              v-model.trim="$v.cantidad.$model"
              :state="!$v.cantidad.$error"
              placeholder="Ingresar cantidad"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.cantidad.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad del traslado
          </div>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="6">
          <b-form-group label="Descripción:">
            <b-form-input
              v-model.trim="$v.descripcion.$model"
              :state="!$v.descripcion.$error"
              placeholder="Ingresar descripcion"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.descripcion.$invalid" class="invalid-feedback">
            Debe ingresar la descripción del traslado
          </div>
        </b-col>
        <b-col md="6">
          <b-form-group label="Ancitipo:">
            <b-form-input
              type="number"
              v-model.trim="anticipo"
              placeholder="Ingresar anticipo"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal()"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Búsqueda de producto</h4>
              <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                  <b-form-group>
                    <b-input id="search" placeholder="Ingrese código..." @input="(val) => searchChange(val)" />
                  </b-form-group>
                  <b-form-group>
                      <b-form-radio v-model="selectedOption" value="1" @change="manejarRadio">Código</b-form-radio>
                      <b-form-radio v-model="selectedOption" value="2" @change="manejarRadio">Nombre</b-form-radio>
                  </b-form-group>
                  <a class="search-link" href="#"><i class="ri-search-line"></i></a>
              </b-form>
              </div>
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
                <button v-if="props.rowData.cantidad < 2" type="button" class="btn btn-danger" disabled>POCA EXISTENCIA</button>
                <button v-if="props.rowData.cantidad < 5 && props.rowData.cantidad >1" type="button" class="btn btn-success" disabled>POCA EXISTENCIA</button>
                <button v-if="props.rowData.cantidad > 4" type="button" class="btn btn-warning" disabled>POCA EXISTENCIA</button>
              </div>
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-b-tooltip.top="'Solicitar'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-solicitar
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
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
import { apiUrl } from '../../../config/constant'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'ListadoTallas',
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
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      id_usuario: 0,
      tienda1: null,
      tienda2: null,
      responsable: null,
      tiendas: [],
      responsables: [],
      descripcion: null,
      anticipo: null,
      cantidad: null,
      check: false,
      selectedOption: 1,
      enviarForm: 0,
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        codigo: '',
        cantidad: 0,
        state: 1
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/tallas/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'zapato.estilo',
          sortField: 'zapato.estilo',
          title: 'Zapato',
          dataClass: 'list-item-heading'
        },
        {
          name: 'talla',
          sortField: 'talla',
          title: 'Talla',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad',
          sortField: 'cantidad',
          title: 'Cantidad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'codigo',
          sortField: 'codigo',
          title: 'Codigo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tienda.nombre',
          sortField: 'tienda.nombre',
          title: 'Tienda',
          dataClass: 'list-item-heading'
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted'
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        codigo: { required },
        cantidad: { required }
      },
      tienda1: { required },
      tienda2: { required },
      descripcion: { required },
      cantidad: { required },
      responsable: { required }
    }
  },
  methods: {
    setData (data) {
      this.tienda1 = {
        id: data.tienda.id,
        nombre: data.tienda.nombre,
        cantidad: data.cantidad
      }
      this.form.id = data.id
    },
    resetData () {
      this.tienda1 = null
      this.tienda2 = null
      this.responsable = null
      this.descripcion = null
      this.cantidad = null
    },
    makeQueryParams (sortOrder, currentPage, perPage) {
      return sortOrder[0]
        ? {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          enviar: this.enviarForm
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          enviar: this.enviarForm
        }
    },
    changePageSizes (perPage) {
      this.perPage = perPage
      this.$refs.vuetable.refresh()
    },
    searchChange (val) {
      this.search = val.toLowerCase()
      this.enviarForm = 1
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
    manejarRadio () {
      this.enviarForm = 1
    },
    searchingTiendas (search, loading) {
      axios.get(apiUrl + '/tiendas/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.tiendas = response.data
        loading(false)
      })
    },
    onSearchTiendas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingTiendas(search, loading)
      }
    },
    searchingPersonas (search, loading) {
      axios.get(apiUrl + '/usuarios/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.responsables = response.data
        loading(false)
      })
    },
    onSearchPersonas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingPersonas(search, loading)
      }
    },
    closeModal () {
      this.$v.$reset()
      this.resetData()
      this.$refs['modal-solicitar'].hide()
    },
    onValidate () {
      this.id_usuario = this.currentUser.id
      let me = this
      if (this.tienda1.id === this.tienda2.id) {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'La tienda de origen no puede ser igual a la tienda de destino'
      } else if (parseInt(me.cantidad) > parseInt(me.tienda1.cantidad)) {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'La tienda de origen no cuenta con suficiente existencia'
      } else {
        axios.post(apiUrl + '/traslados/createRapido', {
          tienda1: me.tienda1,
          tienda2: me.tienda2,
          cantidad: me.cantidad,
          responsable: me.responsable,
          descripcion: me.descripcion,
          anticipo: me.anticipo,
          id_usuario: me.id_usuario,
          id: this.form.id,
          currentUser: this.currentUser
        })
          .then((response) => {
            me.alertVariant = 'success'
            me.showAlert()
            me.alertText = 'Se ha creado el traslado exitosamente'
            me.closeModal()
            me.arrayDetalles = []
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertText = error.response.data.msg
            console.error('Error!', error)
          })
      }
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
