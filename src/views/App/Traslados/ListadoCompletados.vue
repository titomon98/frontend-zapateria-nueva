<template>
  <b-container fluid>
    <b-modal id="modal-1" ref="modal-1" title="Cambio de estado de traslado" size="xl">
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
        <b-row class="ml-2">
          <b-col md="3">
            <b-form-group label="Registro interno:">
              <h6>{{ encabezado.id }}</h6>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Zapato a trasladar:">
              <h6>{{ encabezado.zapato }}</h6>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Talla a trasladar:">
              <h6>{{ encabezado.talla }}</h6>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Anticipo:">
              <h6>{{ encabezado.anticipo }}</h6>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="ml-2">
          <b-col md="3">
            <b-form-group label="Estado:">
              <b-form-radio v-model="selectedOption" value="1">Recibo completo</b-form-radio>
              <b-form-radio v-model="selectedOption" value="3">En camino</b-form-radio>
              <b-form-radio v-model="selectedOption" value="4">Recibido incompleto</b-form-radio>
              <b-form-radio v-model="selectedOption" value="5">Cancelado</b-form-radio>
              <b-form-radio v-model="selectedOption" value="6">No hay existencia física</b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="9">
            <b-form-group label="Comentario:">
              <b-form-textarea
                v-model.trim="descripcion"
                placeholder="Agregar comentario"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="cambiarEstado()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('especifico')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2" ref="modal-2" title="Traslado individual" size="xl">
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
        <b-col md="3">
          <b-form-group label="Registro interno:">
            <h6>{{ encabezado.id }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Zapato a trasladar:">
            <h6>{{ encabezado.zapato }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Talla a trasladar:">
            <h6>{{ encabezado.talla }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Anticipo:">
            <h6>{{ encabezado.anticipo }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="3">
          <b-form-group label="Estado:">
            <h6>{{ encabezado.estado }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Comentario:">
            <h6>{{ encabezado.descripcion }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Fecha de última actualización:">
            <h6>{{ encabezado.fecha }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('ver')"
          >Cerrar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Listado de traslados completados</h4>
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
              <router-link
                to='traslados'
              >
                <b-button variant="primary">AGREGAR NUEVO</b-button>
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
                    ><h6 class="success"><strong>RECIBIDO COMPLETO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 2">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>SOLICITADO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 3">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>EN CAMINO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 4">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>RECIBIDO INCOMPLETO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 5">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>CANCELADO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 6">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>NO HAY EXISTENCIA FÍSICA</strong></h6></b-badge
                  >
                </h5>
              </div>
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-if="props.rowData.estado !== 1 && props.rowData.estado !== 4 && props.rowData.estado !== 5 && props.rowData.estado !== 6"
                    v-b-tooltip.top="'Cambiar estado de traslado'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-1
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-check'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Ver detalles'"
                    @click="seeTraslado(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-eye'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Imprimir traslado'"
                    @click="printSale(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-print'"
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
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { mapGetters } from 'vuex'

export default {
  name: 'SalesList',
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
    this.getSalesToday()
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      descripcion: null,
      localeData: {
        direction: 'ltr',
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Aceptar',
        cancelLabel: 'Cancelar',
        weekLabel: 'W',
        daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        monthNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        firstDay: 0
      },
      selectedOption: 1,
      selectedDates: {
        start: null,
        end: null
      },
      startText: 'Fecha de inicio',
      endText: 'Fecha final',
      showDropdowns: false,
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        fecha1: null,
        fecha2: null
      },
      arrayDetalles: [],
      arrayToday: [],
      arrayEspecifico: [],
      encabezado: {
        id: 0,
        fecha: null,
        zapato: null,
        talla: null,
        descripcion: null,
        ancitipo: null
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/traslados/listCompletados',
      options: [
        { value: '1', nombre: 'Descripción' }
      ],
      columna: { value: '1', nombre: 'Descripción' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'id',
          sortField: 'id',
          title: 'Número interno',
          dataClass: 'list-item-heading'
        },
        {
          name: 'fecha',
          sortField: 'fecha',
          title: 'Fecha solicitud de traslado',
          dataClass: 'list-item-heading'
        },
        {
          name: 'descripcion',
          sortField: 'descripcion',
          title: 'Descripción',
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
        id: { required }
      }
    }
  },
  methods: {
    seeTraslado (data) {
      let me = this
      me.encabezado.id = data.id
      me.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      me.encabezado.zapato = data.detalle_traslados[0].talla.zapato.estilo
      me.encabezado.talla = data.detalle_traslados[0].talla.talla
      me.encabezado.descripcion = data.descripcion
      me.encabezado.anticipo = data.anticipo
      if (data.estado === 1) {
        me.encabezado.estado = 'RECIBIDO COMPLETO'
      } else if (data.estado === 2) {
        me.encabezado.estado = 'SOLICITADO'
      } else if (data.estado === 3) {
        me.encabezado.estado = 'EN CAMINO'
      } else if (data.estado === 4) {
        me.encabezado.estado = 'RECIBIDO INCOMPLETO'
      } else if (data.estado === 5) {
        me.encabezado.estado = 'CANCELADO'
      } else if (data.estado === 6) {
        me.encabezado.estado = 'NO HAY EXISTENCIA FÍSICA EN TIENDA'
      }
    },
    getSalesToday () {
      axios.get(apiUrl + '/traslados/getToday'
      ).then((response) => {
        this.arrayToday = response.data
      })
    },
    printSale (data) {
      let me = this
      me.arrayDetalles = data.detalle_ventas
      me.encabezado.id = data.id
      me.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      me.encabezado.cliente = data.client
      me.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      me.encabezado.nit = data.nit
      me.encabezado.total = data.total
      me.encabezado.anticipo = data.anticipo
      this.$refs['modal-2'].show()
    },
    closeModal (action) {
      switch (action) {
        case 'especifico': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
        case 'ver': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.arrayDetalles = null
          this.encabezado.id = null
          this.encabezado.fecha = null
          this.encabezado.cliente = null
          this.encabezado.usuario = null
          this.encabezado.total = null
          break
        }
      }
    },
    setData (data) {
      this.encabezado.id = data.id
      this.encabezado.zapato = data.detalle_traslados[0].talla.zapato.estilo
      this.encabezado.talla = data.detalle_traslados[0].talla.talla
      this.encabezado.descripcion = data.descripcion
      this.encabezado.anticipo = data.anticipo
    },
    resetData () {
      this.encabezado.id = null
      this.encabezado.zapato = null
      this.encabezado.talla = null
      this.encabezado.descripcion = null
      this.selectedOption = 1
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/traslados/update', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    cambiarEstado () {
      let me = this
      axios
        .put(apiUrl + '/traslados/cambiar', {
          encabezado: this.encabezado,
          descripcion: this.descripcion,
          estado: this.selectedOption,
          currentUser: this.currentUser
        })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.$refs['modal-1'].hide()
          me.resetData()
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
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
    },
    changeTypeSearch (columna) {
      this.columna = columna
    }
  }
}
</script>
