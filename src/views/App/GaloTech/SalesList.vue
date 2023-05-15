<template>
  <b-container fluid>
    <b-modal id="modal-1" ref="modal-1" title="Agregar fechas">
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
        <b-form-group label="Fecha inicial:">
          <date-range-picker
            ref="picker"
            v-model="selectedDates"
            :singleDatePicker="'range'"
            :range="true"
            :ranges="false"
            :start-text="startText"
            :end-text="endText"
            :show-dropdowns=showDropdowns
            :locale-data="localeData"
          />
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="generarEspecifico()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('especifico')"
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
                    ><h6 class="success"><strong>ACTIVO</strong></h6></b-badge
                  >
                </h5>
                <h5 v-else-if="props.rowData.estado == 2">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>PENDIENTE DE CONTABILIDAD</strong></h6></b-badge
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
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
                  /></b-button>
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
                    v-b-tooltip.top="'Imprimir venta'"
                    @click="printSale(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-print'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Añadir documento'"
                    @click="addDocument(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-file'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Desactivar'"
                    v-if="props.rowData.estado === 1"
                    class="mb-2"
                    size="sm"
                    @click="
                      setData(props.rowData);
                      $bvModal.show('modal-3');
                    "
                    :variant="'outline-danger'"
                  >
                  <i :class="'fas fa-trash-alt'"
                  />
                  </b-button>
                  <b-button
                    v-b-tooltip.top="'Comprobar contabilidad'"
                    v-if="props.rowData.estado === 2"
                    class="mb-2"
                    size="sm"
                    :variant="'outline-success'"
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
          <template v-slot:footerAction>
            <b-button variant="dark" v-b-modal.modal-1>GENERAR CIERRE</b-button>
            <b-button variant="dark" @click="cierreDiario()">GENERAR CIERRE DE HOY</b-button>
            <b-button variant="dark" @click="cierreDiarioExcel()">GENERAR CIERRE DE HOY EXCEL</b-button>
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
import moment from 'moment'
import JsPDF from 'jspdf'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import ExcelJS from 'exceljs'
export default {
  name: 'SalesList',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    DateRangePicker
  },
  props: {
    logo3: { type: String, default: require('./4x4.png') }
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    this.getSalesToday()
  },
  data () {
    return {
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
          name: 'fecha',
          sortField: 'fecha',
          title: 'Fecha de venta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'client',
          sortField: 'client',
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
      me.arrayDetalles = data.detalle_ventas
      me.encabezado.id = data.id
      me.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      me.encabezado.cliente = data.client
      me.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      me.encabezado.nit = data.nit
      me.encabezado.total = data.total
      this.$refs['modal-2'].show()
    },
    getSalesToday () {
      axios.get(apiUrl + '/ventas/getToday'
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
      this.$refs['modal-2'].show()
    },
    addDocument (data) {
      // Añadir documento
      let me = this
      me.arrayDetalles = data.detalle_ventas
      me.encabezado.id = data.id
      me.encabezado.fecha = new Date().toLocaleDateString('es-us', data.fecha)
      me.encabezado.cliente = data.client
      me.encabezado.usuario = data.usuario.nombre + ' ' + data.usuario.apellidos
      me.encabezado.nit = data.nit
      me.encabezado.total = data.total
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
    async generarEspecifico () {
      let start = moment(this.selectedDates.startDate).format('YYYY-MM-DD')
      let end = moment(this.selectedDates.endDate).format('YYYY-MM-DD')

      await axios.get(apiUrl + '/ventas/especifico?start=' + start + '&end=' + end
      ).then((response) => {
        this.arrayEspecifico = response.data
        this.closeModal('especifico')
      }).catch((error) => {
        console.error('There was an error!', error)
      })

      let me = this
      var altura = 2
      var ahora = new Date()
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Cierre diario de ventas', 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de generación: ' + ingreso, 6, altura)
      altura = altura + 0.5
      doc.text('Generado por: Juanita Cortez', 6, altura)
      altura = altura + 2.5
      doc.text('No.', 2, altura)
      doc.text('Nit', 3, altura)
      doc.text('Nombre de cliente', 4, altura)
      doc.text('Total', 12, altura)
      doc.text('Referencia SAT', 14, altura)
      altura = altura + 1
      doc.setFontSize(10).setFont(undefined, 'normal')
      for (let i = 0; i < me.arrayEspecifico.length; i++) {
        doc.text(me.arrayEspecifico[i].id.toString(), 2, altura)
        doc.text(me.arrayEspecifico[i].nit, 3, altura)
        doc.text(me.arrayEspecifico[i].client, 4, altura)
        doc.text(me.arrayEspecifico[i].total, 12, altura)
        if (me.arrayEspecifico[i].referencia_factura !== null) {
          doc.text(me.arrayEspecifico[i].referencia_factura, 14, altura)
        } else {
          doc.text('No ingresada', 14, altura)
        }
        altura = altura + 0.5
        if (altura > 25) {
          doc.addPage()
          altura = 2
          doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
          doc.setFontSize(12).setFont(undefined, 'bold')
          doc.text('Fecha de generación: ' + ingreso, 6, altura)
          altura = altura + 0.5
          doc.text('Generado por: Juanita Cortez', 6, altura)
          altura = altura + 3
        }
      }
      doc.save('CierreVentas.pdf')
    },
    cierreDiario () {
      let me = this
      var altura = 2
      var ahora = new Date()
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Cierre diario de ventas', 6, altura)
      altura = altura + 0.5
      doc.text('Fecha de generación: ' + ingreso, 6, altura)
      altura = altura + 0.5
      doc.text('Generado por: Juanita Cortez', 6, altura)
      altura = altura + 2.5
      doc.text('No.', 2, altura)
      doc.text('Nit', 3, altura)
      doc.text('Nombre de cliente', 4, altura)
      doc.text('Total', 12, altura)
      doc.text('Referencia SAT', 14, altura)
      altura = altura + 1
      doc.setFontSize(10).setFont(undefined, 'normal')
      for (let i = 0; i < me.arrayToday.length; i++) {
        doc.text(me.arrayToday[i].id.toString(), 2, altura)
        doc.text(me.arrayToday[i].nit, 3, altura)
        doc.text(me.arrayToday[i].client, 4, altura)
        doc.text(me.arrayToday[i].total, 12, altura)
        if (me.arrayToday[i].referencia_factura !== null) {
          doc.text(me.arrayToday[i].referencia_factura, 14, altura)
        } else {
          doc.text('No ingresada', 14, altura)
        }
        altura = altura + 0.5
        if (altura > 25) {
          doc.addPage()
          altura = 2
          doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
          doc.setFontSize(12).setFont(undefined, 'bold')
          doc.text('Fecha de generación: ' + ingreso, 6, altura)
          altura = altura + 0.5
          doc.text('Generado por: Juanita Cortez', 6, altura)
          altura = altura + 3
        }
      }
      doc.save('CierreDeHoyVentas.pdf')
    },
    cierreDiarioExcel () {
      const me = this
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Cierre Diario')
      worksheet.addRow(['No.', 'Nit', 'Nombre cliente', 'Total', 'Referencia SAT'])
      for (let i = 0; i < me.arrayToday.length; i++) {
        worksheet.addRow([me.arrayToday[i].id.toString(), me.arrayToday[i].nit, me.arrayToday[i].client, me.arrayToday[i].total, me.arrayToday[i].referencia_factura === null ? 'No ingresada' : me.arrayToday[i].referencia_factura])
      }
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'CierreDeHoyVentas.xlsx'
        link.click()
      })
    }
  }
}
</script>
