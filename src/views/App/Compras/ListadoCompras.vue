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
        <b-button variant="primary" @click="generarEspecifico()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('especifico')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2" ref="modal-2" title="Compra individual">
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
          <b-form-group label="Fecha de compra:">
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
        ¿Desea desactivar la compra: {{ form.id }}? Esta acción no se puede deshacer
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
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Listado de compras</h4>
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
                to='Purchases'
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
                    v-b-tooltip.top="'Imprimir compra'"
                    @click="printPurchase(props.rowData)"
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
                    v-b-tooltip.top="
                      props.rowData.estado == 1 ? 'Desactivar' : 'Activar'"
                    v-if="props.rowData.estado === 1"
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
import moment from 'moment'
import JsPDF from 'jspdf'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name: 'PurchasesList',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    DateRangePicker
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    this.getPurchasesToday()
  },
  data () {
    return {
      pdf: new JsPDF(),
      pdfName: '',
      previewURL: '',
      selectedDates: {
        start: null,
        end: null
      },
      startText: 'Fecha de inicio',
      endText: 'Fecha final',
      showDropdowns: false,
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
      apiBase: apiUrl + '/compras/list',
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
          title: 'Número',
          dataClass: 'list-item-heading'
        },
        {
          name: 'fecha',
          sortField: 'fecha',
          title: 'Fecha de compra',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return new Date().toLocaleDateString('es-us', value.fecha)
          }
        },
        {
          name: 'razon_social',
          sortField: 'razon_social',
          title: 'Razón social',
          dataClass: 'list-item-heading'
        },
        {
          name: 'proveedore.nombre',
          sortField: 'proveedore.nombre',
          title: 'Proveedor',
          dataClass: 'list-item-heading'
        },
        {
          name: 'contribuyente.nombre',
          sortField: 'contribuyente.nombre',
          title: 'Contribuyente',
          dataClass: 'list-item-heading'
        },
        {
          name: 'destino.nombre',
          sortField: 'destino.nombre',
          title: 'Destino',
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
        fecha1: {
          required
        },
        fecha2: {
          required
        }
      }
    }
  },
  methods: {
    generarEspecifico () {
      let start = moment(this.selectedDates.startDate).format('YYYY-MM-DD')
      let end = moment(this.selectedDates.endDate).format('YYYY-MM-DD')

      axios.get(apiUrl + '/compras/especifico?start=' + start + '&end=' + end
      ).then((response) => {
        console.log(response.data)
        this.arrayEspecifico = response.data
        this.closeModal('especifico')
      }).catch((error) => {
        console.error('There was an error!', error)
      })

      let me = this
      var altura = 2
      var ahora = new Date()
      this.pdf = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      this.pdf.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      this.pdf.setFontSize(10).setFont(undefined, 'bold')
      this.pdf.text('Cierre diario de ventas', 6, altura)
      altura = altura + 0.5
      this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
      altura = altura + 0.5
      this.pdf.text('Generado por: Juanita Cortez', 6, altura)
      altura = altura + 2.5
      this.pdf.text('No.', 2, altura)
      this.pdf.text('Nit', 3, altura)
      this.pdf.text('Nombre de cliente', 4, altura)
      this.pdf.text('Total', 12, altura)
      this.pdf.text('Referencia SAT', 14, altura)
      altura = altura + 1
      this.pdf.setFontSize(10).setFont(undefined, 'normal')
      for (let i = 0; i < me.arrayEspecifico.length; i++) {
        this.pdf.text(me.arrayEspecifico[i].id.toString(), 2, altura)
        this.pdf.text(me.arrayEspecifico[i].nit, 3, altura)
        this.pdf.text(me.arrayEspecifico[i].client, 4, altura)
        this.pdf.text(me.arrayEspecifico[i].total, 12, altura)
        if (me.arrayEspecifico[i].referencia_factura !== null) {
          this.pdf.text(me.arrayEspecifico[i].referencia_factura, 14, altura)
        } else {
          this.pdf.text('No ingresada', 14, altura)
        }
        altura = altura + 0.5
        if (altura > 25) {
          this.pdf.addPage()
          altura = 2
          this.pdf.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
          this.pdf.setFontSize(12).setFont(undefined, 'bold')
          this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
          altura = altura + 0.5
          this.pdf.text('Generado por: Juanita Cortez', 6, altura)
          altura = altura + 3
        }
      }

      var pdfData = this.pdf.output('blob')

      // Convert PDF to data URL
      var pdfURL = URL.createObjectURL(pdfData)
      this.previewURL = pdfURL
      this.$refs['modal-pdf'].show()
      this.pdfName = 'CierreCompras.pdf'
      // doc.save('CierreVentas.pdf')
    },
    getPurchasesToday () {
      axios.get(apiUrl + '/compras/getToday'
      ).then((response) => {
        this.arrayToday = response.data
      })
    },
    seeSale (data) {
      let me = this
      me.arrayDetalles = data.detalle_compras
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
    printPurchase (data) {
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
        case 'pdf': {
          this.$refs['modal-pdf'].hide()
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      //  tratamiento de fechas
      if (this.$v.$error !== true) {
        if (action === 'especifico') {
          if (this.fecha1 === this.fecha2) {
            this.alertErrorText = 'Las fechas son iguales, se generará un cierre diario'
            this.showAlertError()
          } else if (this.fecha2 > this.fecha1) {
            this.alertErrorText = 'La fecha final es mayor a la inicial, por favor corrobora la información'
            this.showAlertError()
          } else {
            this.generarEspecifico()
          }
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
      axios.put(apiUrl + '/compras/update', {
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
          .put(apiUrl + '/compras/deactivate', {
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
    descargarpdf () {
      this.pdf.save(this.pdfName)
    }
  }
}
</script>
