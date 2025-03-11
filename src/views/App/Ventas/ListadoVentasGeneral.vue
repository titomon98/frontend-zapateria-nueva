<template>
  <b-container fluid>
    <b-modal id="modal-pdf" ref="modal-pdf" title="Generar PDF" size="xl">
      <div id="previewContainer">
        <iframe :src="previewURL" width="100%" height="700px"></iframe>
      </div>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="descargarpdf()">Guardar</b-button>
        <b-button variant="danger" @click="closeModal('pdf')">Cancelar</b-button>
      </template>
    </b-modal>
    <b-modal id="modal-2" ref="modal-2" title="Venta individual">
      <b-alert :show="alertCountDownError" dismissible fade @dismissed="alertCountDownError=0"
        class="text-white bg-danger">
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
      <b-row class="ml-2">
        <b-col md="6">
          <strong><p style="color:black;">ESTO NO ES UNA FACTURA</p></strong>
        </b-col>
      </b-row>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('ver')">Cerrar</b-button>
      </template>
    </b-modal>
    <b-modal id="modal-3" ref="modal-return-sale" title="Desactivar venta">
      <b-alert :show="alertCountDownError" dismissible fade @dismissed="alertCountDownError=0"
        class="text-white bg-danger">
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <h6 class="my-4">
        ¿Desea devolver la venta: {{ form.numero }}? Esta acción no se puede deshacer
      </h6>
      <template #modal-footer="{}">
        <b-button type="submit" variant="primary" @click="onState()
          $bvModal.hide('modal-3')">Desactivar</b-button>
        <b-button variant="danger" @click="$bvModal.hide('modal-3')">Cancelar</b-button>
      </template>
    </b-modal>
    <b-modal id="modal-4" ref="modal-4" title="Pagar cuenta" size="xl">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <template>
        <div>
          <h6>Detalle de factura</h6>
          <b-card>
            <b-card-body>
              <b-table
                hover
                :items="cuentas"
                :fields="fieldsAccounts"
                :select-mode="'single'"
                selectable
              >
              </b-table>
              <b-form-group label="Seleccione métodos para pagar:" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selectedPayment"
                  :options="paymentOptions"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-1"
                ></b-form-checkbox-group>
              </b-form-group>
              <div v-if="selectedPayment.indexOf(1) !== -1">
                Efectivo
                <b-input :type="'number'" id="CashTypeInput" ref="CashTypeInput" v-model="paymentType.Efectivo" />
              </div>
              <div v-if="selectedPayment.indexOf(2) !== -1">
                Tarjeta
                <b-input :type="'number'" id="CardTypeInput" ref="CardTypeInput" v-model="paymentType.Tarjeta" />
              </div>
              <div v-if="selectedPayment.indexOf(3) !== -1">
                Depósito
                <b-input :type="'number'" id="DepositTypeInput" ref="DepositTypeInput" v-model="paymentType.Deposito" />
              </div>
              <div v-if="selectedPayment.indexOf(4) !== -1">
                Cheque
                <b-input :type="'number'" id="CheckTypeInput" ref="CheckTypeInput" v-model="paymentType.Cheque" />
              </div>
              <div>
                <strong> TOTAL INGRESADO: {{ parseFloat(this.paymentType.Efectivo) + parseFloat(this.paymentType.Tarjeta) + parseFloat(this.paymentType.Deposito) + parseFloat(this.paymentType.Cheque) }}</strong>
              </div>
              <div>
                <strong> TOTAL A PAGAR: {{ this.totalPayment }}</strong>
              </div>
            </b-card-body>
            <div>

            </div>
          </b-card>
        </div>
      </template>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="
          onPay()
        "
          >Aceptar</b-button
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
                  <b-dropdown id="ddown1" :text="columna.nombre" variant="outline-dark"
                    class="mr-1 float-md-left btn-group" size="xs">
                    <b-dropdown-item v-for="(search, index) in options" :key="index"
                      @click="changeTypeSearch(search)">{{ search.nombre }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:headerAction>
            <b-row style="padding-left: 20px;">
              <b-form-input type="date" v-model="selectedDate"></b-form-input>
              <b-button
                v-b-tooltip.top="'Reporte de tallas de zapato excel'"
                @click="setReporteExcel()"
                variant="success"
                ><i :class="'fas fa-table'"
              /></b-button>
              <b-button
                v-b-tooltip.top="'Reporte de tallas de zapato pdf'"
                @click="setReportePdf()"
                variant="danger"
                ><i :class="'fa fa-file-pdf-o'"
              /></b-button>
            </b-row>
          </template>
          <template v-slot:body>
            <datatable-heading :changePageSize="changePageSizes" :searchChange="searchChange" :from="from" :to="to"
              :total="total" :perPage="perPage">
            </datatable-heading>
            <vuetable ref="vuetable" class="table-divided order-with-arrow" :api-url="apiBase"
              :query-params="makeQueryParams" :per-page="perPage" :reactive-api-url="true" :fields="fields"
              pagination-path @vuetable:pagination-data="onPaginationData">
              <!-- Estado -->
              <div slot="estado" slot-scope="props">
                <h5 v-if="props.rowData.estado == 1">
                  <b-badge variant="light">
                    <h6 class="success"><strong>VENDIDO</strong></h6>
                  </b-badge>
                </h5>
                <h5 v-else-if="props.rowData.estado == 2">
                  <b-badge variant="light">
                    <h6 class="success"><strong>PENDIENTE DE COBRAR</strong></h6>
                  </b-badge>
                </h5>
                <h5 v-else-if="props.rowData.estado == 3">
                  <b-badge variant="light">
                    <h6 class="danger"><strong>PAGO PARCIAL</strong></h6>
                  </b-badge>
                </h5>
                <h5 v-else>
                  <b-badge variant="light">
                    <h6 class="danger"><strong>INACTIVO</strong></h6>
                  </b-badge>
                </h5>
              </div>
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button v-b-tooltip.top="'Ver detalles'" @click="seeSale(props.rowData)" v-b-modal.modal-2
                    class="mb-2" size="sm" variant="outline-success"><i :class="'fas fa-eye'" /></b-button>
                  <b-button v-b-tooltip.top="'Imprimir recibo de venta'" v-if="props.rowData.estado === 1"
                    @click="printFullSale(props.rowData)" class="mb-2" size="sm" variant="outline-dark"><i
                      :class="'fas fa-print'" /></b-button>
                  <b-button v-b-tooltip.top="'Imprimir anticipo de venta'" v-if="props.rowData.estado === 3"
                    @click="printSale(props.rowData)" class="mb-2" size="sm" variant="outline-info"><i
                      :class="'fas fa-print'" /></b-button>
                  <b-button v-b-tooltip.top="'Cobrar venta'" v-if="props.rowData.estado === 2 || props.rowData.estado === 3" class="mb-2" size="sm"
                    :variant="'outline-danger'" @click="
                      setData(props.rowData)
                      $bvModal.show('modal-4')
                    ">
                    <i :class="'fas fa-money-bill'" />
                  </b-button>
                </b-button-group>
              </template>
              <!-- Paginacion -->
            </vuetable>
            <vuetable-pagination-bootstrap ref="pagination" @vuetable-pagination:change-page="onChangePage" />
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
import ExcelJS from 'exceljs'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
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
      selectedPayment: [],
      totalPayment: 0,
      paymentOptions: [
        { text: 'Efectivo', value: 1 },
        { text: 'Tarjeta', value: 2 },
        { text: 'Depósito', value: 3 },
        { text: 'Cheque', value: 4 },
        { text: 'Transferencia', value: 5 }
      ],
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
      pdfTitle: '',
      selectedDate: '',
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
        state: '',
        numero: 0
      },
      fieldsAccounts: [
        {
          key: 'numero',
          label: 'Numero',
          sortable: true
        },
        {
          key: 'fecha',
          label: 'Fecha',
          sortable: true
        },
        {
          key: 'por_pagar',
          label: 'Total a pagar',
          sortable: true
        },
        {
          key: 'total',
          label: 'Total',
          sortable: true
        }
      ],
      paymentType: {
        Efectivo: 0,
        Tarjeta: 0,
        Deposito: 0,
        Cheque: 0,
        Seguro: 0,
        Transferencia: 0
      },
      paymentSum: 0,
      cuentas: [],
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
          title: 'Número de venta',
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
      this.cuentas[0] = data
      this.form.name = data.nombre
      this.form.state = data.estado
      this.form.id = data.id
      this.form.numero = data.numero
      this.totalPayment = data.por_pagar
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
      this.pdfTitle = 'Adelanto de venta'
      this.$refs['modal-pdf'].show()
      var altura = 1
      var ahora = new Date()
      const tienda = data.detalle_ventas[0].talla.tienda.nombre
      console.log(data)
      this.arrayDetalles = data.detalle_ventas
      this.encabezado.id = data.id
      this.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      this.encabezado.cliente = data.cliente.nombre
      this.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      this.encabezado.nit = data.cliente.nit
      this.encabezado.total = data.total

      this.pdf = new JsPDF({
        unit: 'cm',
        format: [14, 21.5],
        orientation: 'landscape'
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3
      this.pdf.addImage(imgData, 'PNG', 1.5, 0.75, 4.37, 1.87)
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      if (data.estado === 1) {
        this.pdf.text('Anticipo de venta No. ' + data.id, 7, altura)
        this.pdfName = 'ReciboVenta' + data.id + '.pdf'
      } else {
        this.pdf.text('Anticipo de venta No. ' + data.id, 7, altura)
        this.pdfName = 'AnticipoVenta' + data.id + '.pdf'
      }
      // Encabezado
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
      // Cuerpo de recibo
      altura = altura + 1
      this.pdf.text('Tienda: ' + tienda, 1.5, altura)
      altura = altura + 0.75
      this.pdf.setFontSize(14).setFont(undefined, 'normal')
      this.pdf.text('Total: ' + parseFloat(this.encabezado.total).toFixed(2), 1.5, altura)
      altura = altura + 0.5
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      this.pdf.text('ESTO NO ES UNA FACTURA', 1.5, altura)
      this.arrayDetalles.map(function (st) {
        st.subtotal = parseFloat(st.subtotal).toFixed(2)
      })
      // Tabla
      autoTable(this.pdf, {
        columns: [{ header: 'Descripción', dataKey: 'descripcion' }, { header: 'Cantidad', dataKey: 'cantidad' }, { header: 'Subtotal', dataKey: 'subtotal' }],
        body: this.arrayDetalles,
        margin: { top: 5 },
        headStyles: {
          fillColor: [21, 21, 21],
          textColor: [225, 225, 225],
          fontStyle: 'bold'
        }
      })
      var pdfData = this.pdf.output('blob')
      // Convert PDF to data URL
      var pdfURL = URL.createObjectURL(pdfData)
      this.previewURL = pdfURL
    },
    printFullSale (data) {
      this.pdfTitle = 'Recibo de venta'
      this.$refs['modal-pdf'].show()
      var altura = 1
      var ahora = new Date()
      const tienda = data.detalle_ventas[0].talla.tienda.nombre
      console.log(data)
      this.arrayDetalles = data.detalle_ventas
      this.encabezado.id = data.id
      this.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      this.encabezado.cliente = data.cliente.nombre
      this.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      this.encabezado.nit = data.cliente.nit
      this.encabezado.total = data.total

      this.pdf = new JsPDF({
        unit: 'cm',
        format: [14, 21.5],
        orientation: 'landscape'
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
      // Encabezado
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
      // Cuerpo de recibo
      altura = altura + 1
      this.pdf.text('Tienda: ' + tienda, 1.5, altura)
      altura = altura + 0.75
      this.pdf.setFontSize(14).setFont(undefined, 'normal')
      this.pdf.text('Total: ' + parseFloat(this.encabezado.total).toFixed(2), 1.5, altura)
      altura = altura + 0.5
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      this.pdf.text('ESTO NO ES UNA FACTURA', 1.5, altura)
      this.arrayDetalles.map(function (st) {
        st.subtotal = parseFloat(st.subtotal).toFixed(2)
      })
      // Tabla
      autoTable(this.pdf, {
        columns: [{ header: 'Descripción', dataKey: 'descripcion' }, { header: 'Cantidad', dataKey: 'cantidad' }, { header: 'Subtotal', dataKey: 'subtotal' }],
        body: this.arrayDetalles,
        margin: { top: 5 },
        headStyles: {
          fillColor: [21, 21, 21],
          textColor: [225, 225, 225],
          fontStyle: 'bold'
        }
      })
      var pdfData = this.pdf.output('blob')
      // Convert PDF to data URL
      var pdfURL = URL.createObjectURL(pdfData)
      this.previewURL = pdfURL
    },
    async setReporteExcel () {
      if (this.selectedDate) {
        await axios.get(apiUrl + '/ventas/reporte/total',
          {
            params: {
              date: this.selectedDate
            }
          }).then((response) => {
          this.tallas = response.data
          this.currentDate = new Date().toLocaleDateString('es-ES')
          // Inicio tamanio columnas
          const workbook = new ExcelJS.Workbook()
          const worksheet = workbook.addWorksheet('Reporte total de ventas')
          let column
          column = worksheet.getColumn('A')
          column.width = 20
          column = worksheet.getColumn('B')
          column.width = 20
          column = worksheet.getColumn('C')
          column.width = 20
          column = worksheet.getColumn('D')
          column.width = 20
          column = worksheet.getColumn('E')
          column.width = 20
          column = worksheet.getColumn('F')
          column.width = 20
          // Fin tamanio columnas
          worksheet.mergeCells('A1:F1')
          worksheet.mergeCells('A2:F2')
          worksheet.getCell('A1').value = 'Reporte de ventas'
          worksheet.getCell('A2').value = 'Generado por: ' + this.currentUser.user + ' con fecha ' + this.currentDate
          worksheet.getCell('A3').font = { bold: true }
          worksheet.getCell('B3').font = { bold: true }
          worksheet.getCell('C3').font = { bold: true }
          worksheet.getCell('D3').font = { bold: true }
          worksheet.getCell('E3').font = { bold: true }
          worksheet.getCell('F3').font = { bold: true }
          worksheet.getCell('A3').value = 'Número'
          worksheet.getCell('B3').value = 'Total'
          worksheet.getCell('C3').value = 'Fecha'
          worksheet.getCell('D3').value = 'Cliente'
          worksheet.getCell('E3').value = 'Tienda'
          worksheet.getCell('F3').value = 'Estado'
          // Cuerpo del reporte
          let fila = 4
          for (let i = 0; i < this.tallas.length; i++) {
            const element = this.tallas[i]
            worksheet.getCell('A' + fila).value = element.id
            worksheet.getCell('B' + fila).value = element.total
            worksheet.getCell('C' + fila).value = element.fecha
            worksheet.getCell('D' + fila).value = element.cliente.nombre
            worksheet.getCell('E' + fila).value = element.detalle_ventas[0].talla.tienda.nombre
            // worksheet.getCell('F' + fila).value = element.estado
            if (element.estado === 1) {
              worksheet.getCell('F' + fila).value = 'VENDIDO'
            } else if (element.estado === 2) {
              worksheet.getCell('F' + fila).value = 'PENDIENTE DE COBRAR'
            }
            if (element.estado === 3) {
              worksheet.getCell('F' + fila).value = 'PAGO PARCIAL'
            } else {
              worksheet.getCell('F' + fila).value = 'INACTIVO'
            }
            fila++
          }

          workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'reporte-ventas.xlsx'
            link.click()
          })
        })
      } else {
        this.alertText = 'Debe ingresar una fecha.'
        this.showAlert()
      }
    },
    async setReportePdf () {
      // console.log(data)
      if (this.selectedDate) {
        await axios.get(apiUrl + '/ventas/reporte/total',
          {
            params: {
              date: this.selectedDate
            }
          }).then((response) => {
          console.log(response.data)
          this.tallas = response.data
          this.$refs['modal-pdf'].show()
          var altura = 2
          var ahora = new Date()

          this.pdf = new JsPDF({
            unit: 'cm',
            format: [28, 21.5]
          })
          var ingreso = moment(ahora).format('DD/MM/YYYY')
          var imgData = this.logo3
          this.pdf.addImage(imgData, 'PNG', 1.5, 1, 4.37, 1.87)
          this.pdf.setFontSize(10).setFont(undefined, 'bold')
          this.pdf.text('Reporte de ventas', 6, altura)
          altura = altura + 0.5
          this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
          altura = altura + 0.5
          this.pdf.text('Generado por: ', 6, altura)
          this.pdf.setFontSize(10).setFont(undefined, 'normal')
          this.pdf.text(this.currentUser.user, 8.5, altura)
          altura = altura + 0.5
          this.pdf.setFontSize(10).setFont(undefined, 'bold')
          altura = altura + 2
          this.pdf.text('Número', 2, altura)
          this.pdf.text('Total', 4, altura)
          this.pdf.text('Fecha', 6, altura)
          this.pdf.text('Cliente', 9, altura)
          this.pdf.text('Tienda', 13, altura)
          this.pdf.text('Estado', 16, altura)
          this.pdf.setFontSize(10).setFont(undefined, 'normal')
          altura = altura + 0.5
          for (let i = 0; i < this.tallas.length; i++) {
            const element = this.tallas[i]
            const dataDate = new Date(element.fecha).toLocaleDateString()
            this.pdf.text((element.id).toString(), 2, altura)
            this.pdf.text((element.total).toString(), 4, altura)
            this.pdf.text((dataDate), 6, altura)
            this.pdf.text(element.cliente.nombre, 9, altura)
            this.pdf.text(element.detalle_ventas[0].talla.tienda.nombre, 13, altura)
            // this.pdf.text(element.estado, 20, altura)
            if (element.estado === 1) {
              this.pdf.text('VENDIDO', 16, altura)
            } else if (element.estado === 2) {
              this.pdf.text('PENDIENTE DE COBRO', 16, altura)
            }
            if (element.estado === 3) {
              this.pdf.text('PAGO PARCIAL', 16, altura)
            } else if (element.estado === 0) {
              this.pdf.text('INACTIVO', 16, altura)
            }
            altura = altura + 0.5
            if (altura > 25) {
              this.pdf.addPage()
              altura = 2
              this.pdf.setFontSize(12).setFont(undefined, 'bold')
              this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
              altura = altura + 0.5
              this.pdf.text('Generado por: ', 6, altura)
              this.pdf.setFontSize(10).setFont(undefined, 'normal')
              this.pdf.text(this.currentUser.user, 8.5, altura)
              altura = altura + 3
            }
          }
          altura = altura + 0.5
          var pdfData = this.pdf.output('blob')
          // Convert PDF to data URL
          var pdfURL = URL.createObjectURL(pdfData)
          this.previewURL = pdfURL
          this.pdfName = 'Reporte.pdf'
        })
      } else {
        this.alertText = 'Debe ingresar una fecha.'
        this.showAlert()
      }
    },
    descargarpdf () {
      this.pdf.save(this.pdfName)
    },
    onPay () {
      this.paymentSum = parseFloat(this.paymentType.Efectivo) + parseFloat(this.paymentType.Tarjeta) + parseFloat(this.paymentType.Deposito) + parseFloat(this.paymentType.Cheque)
      if (parseFloat(this.paymentSum) > parseFloat(this.totalPayment)) {
        this.alertErrorText = 'El total ingresado es mayor al total por pagar'
        this.showAlertError()
      } else if (parseFloat(this.paymentSum) < parseFloat(this.totalPayment)) {
        this.alertErrorText = 'El total ingresado es menor al total por pagar'
        this.showAlertError()
      } else {
        let me = this
        axios.post(apiUrl + '/ventas/pay',
          {
            id_venta: this.form.id,
            por_pagar: parseFloat(parseFloat(this.totalPayment) - parseFloat(this.paymentSum)),
            efectivo: this.paymentType.Efectivo,
            tarjeta: this.paymentType.Tarjeta,
            deposito: this.paymentType.Deposito,
            cheque: this.paymentType.Cheque,
            total: this.paymentSum,
            fecha: new Date().toJSON().slice(0, 10)
          })
          .then(
            this.paymentType.Efectivo = 0,
            this.paymentType.Tarjeta = 0,
            this.paymentType.Deposito = 0,
            this.paymentType.Cheque = 0,
            this.paymentType.Seguro = 0,
            this.paymentType.transferencia = 0,
            this.paymentSum = 0,
            this.$refs.vuetable.refresh()
          )
          .catch((error) => {
            console.error(error)
          })
        me.alertVariant = 'info'
        me.showAlert()
        me.alertText = 'Se ha cobrado de la venta no.' + me.form.numero + ' exitosamente'
        me.$refs.vuetable.refresh()
        me.$refs['modal-4'].hide()
      }
    }
  }
}
</script>
