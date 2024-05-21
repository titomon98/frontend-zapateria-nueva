<template>
  <b-container fluid>
    <b-modal id="modal-pdf" ref="modal-pdf" title="Generar PDF" size="xl">
      <div id="previewContainer">
        <iframe :src="previewURL" width="100%" height="700px"></iframe>
      </div>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="descargarpdf()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('pdf')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2" ref="modal-2" title="Venta individual">
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
        <b-col md="4">
          <b-form-group label="Número de factura:">
            <h6>{{ encabezado.id }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Cliente:">
            <h6>{{ encabezado.cliente }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Nit:">
            <h6>{{ encabezado.nit }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="4">
          <b-form-group label="Fecha de venta:">
            <h6>{{ encabezado.fecha }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Usuario que registró:">
            <h6>{{ encabezado.usuario }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <br>
      <br>
      <table class="table table-hover product_item_list c_table theme-color mb-0">
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="details in arrayDetalles" :key="details.id">
              <td v-text="details.descripcion"></td>
              <td v-text="details.cantidad"></td>
              <td v-text="details.subtotal"></td>
            </tr>
        </tbody>
      </table>
      <br>
      <b-row class="ml-2">
        <b-col md="6">
          <h5>Total factura: {{ encabezado.total }}</h5>
        </b-col>
      </b-row>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('ver')"
          >Cerrar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3" ref="modal-3" title="Desactivar venta">
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
        ¿Desea desactivar la venta: {{ form.id }}? Esta acción no se puede deshacer
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
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Listado de ventas</h4>
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
                to='Sales'
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
                    ><h6 class="success"><strong>VENDIDO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 2">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>PENDIENTE DE COBRAR</strong></h6></b-badge
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
                    v-b-tooltip.top="'Ver detalles'"
                    @click="seeSale(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-eye'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Imprimir recibo de venta'"
                    v-if="props.rowData.estado === 1"
                    @click="printSale(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-print'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Imprimir anticipo de venta'"
                    v-if="props.rowData.estado === 2"
                    @click="printSale(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-print'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Cobrar venta'"
                    v-if="props.rowData.estado === 2"
                    class="mb-2"
                    size="sm"
                    :variant="'outline-danger'"
                  >
                  <i :class="'fas fa-arrow-right'"
                  />
                  </b-button>
                  <b-button
                    v-b-tooltip.top="'Devolución de venta'"
                    v-if="props.rowData.estado === 1"
                    class="mb-2"
                    size="sm"
                    :variant="'outline-warning'"
                  >
                  <i :class="'fas fa-arrow-right'"
                  />
                  </b-button>
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
import JsPDF from 'jspdf'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'SalesList',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  props: {
    logo3: { type: String, default: require('./14x6.png') }
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
      report: 0,
      pdf: new JsPDF(),
      pdfName: '',
      previewURL: '',
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
        cliente: null,
        nit: null,
        usuario: null,
        total: null
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/ventas/list',
      options: [
        { value: '1', nombre: 'Cliente' }
      ],
      columna: { value: '1', nombre: 'Cliente' },
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
          name: 'total',
          sortField: 'total',
          title: 'Total',
          dataClass: 'list-item-heading'
        },
        {
          name: 'fecha',
          sortField: 'fecha',
          title: 'Fecha de venta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cliente.nombre',
          sortField: 'cliente.nombre',
          title: 'Cliente',
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
    seeSale (data) {
      let me = this
      console.log(data)
      me.arrayDetalles = data.detalle_ventas
      me.encabezado.id = data.id
      me.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      me.encabezado.cliente = data.cliente.nombre
      me.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      me.encabezado.nit = data.cliente.nit
      me.encabezado.total = data.total
      this.$refs['modal-2'].show()
    },
    getSalesToday () {
      axios.get(apiUrl + '/ventas/getToday'
      ).then((response) => {
        this.arrayToday = response.data
      })
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
        case 'pdf': {
          this.$refs['modal-pdf'].hide()
          break
        }
      }
    },
    setData (data) {
      this.form.name = data.nombre
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/ventas/update', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    onState () {
      let me = this
      if (this.form.state === 1) {
        axios
          .put(apiUrl + '/ventas/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-3'].hide()
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
    },
    printSale (data) {
      this.$refs['modal-pdf'].show()
      var altura = 1
      var ahora = new Date()
      const dia = ahora.getDay()
      const mes = ahora.getMonth()
      const tienda = data.detalle_ventas[0].talla.tienda.nombre

      this.pdf = new JsPDF({
        unit: 'cm',
        format: [14, 21.5],
        orientation: 'landscape',
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3
      this.pdf.addImage(imgData, 'PNG', 1.5, 0.75, 4.37, 1.87)
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      if (data.estado === 1) {
        this.pdf.text('Recibo de venta No. ' + data.id, 7, altura)
        this.pdfName = 'ReciboVenta' + data.id + '.pdf'
      } else {
        this.pdf.text('Anticipo de venta No. ' + data.id, 7, altura)
        this.pdfName = 'AnticipoVenta' + data.id + '.pdf'
      }
      //Encabezado
      altura = altura + 0.5
      this.pdf.text('Fecha de generación: ' + ingreso, 7, altura)
      altura = altura + 0.5
      this.pdf.text('Recibo generado por: ', 7, altura)
      this.pdf.setFontSize(10).setFont(undefined, 'normal')
      this.pdf.text(this.currentUser.user, 10.75, altura)
      altura = altura + 0.5
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      this.pdf.text('Venta registrada por: ', 7, altura)
      this.pdf.setFontSize(10).setFont(undefined, 'normal')
      this.pdf.text(data.usuario.nombre + ' ' + data.usuario.apellidos, 10.65, altura)
      //Cuerpo de recibo
      altura = altura + 1
      this.pdf.text(tienda, 1.5, altura)

      var pdfData = this.pdf.output('blob')
      // Convert PDF to data URL
      var pdfURL = URL.createObjectURL(pdfData)
      this.previewURL = pdfURL
    },
    descargarpdf () {
      this.pdf.save(this.pdfName)
    }
  }
}
</script>
