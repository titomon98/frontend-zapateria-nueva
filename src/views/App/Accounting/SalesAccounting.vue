<template>
  <b-container fluid>
    <b-modal id="modal-2" ref="modal-2" title="Envío de venta a contabilidad">
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
      <p>Aqui poner un vueselect para los rubros</p>
      <b-form-group label="Descripción">
        <b-form-input
          v-model.trim="$v.form.descripcion.$model"
          :state="!$v.form.descripcion.$error"
          placeholder="Ingresar descripción de partida"
        ></b-form-input>
        <div v-if="$v.form.descripcion.required.$invalid" class="invalid-feedback">
          Debe ingresar la descripción
        </div>
      </b-form-group>
      <p>Aqui poner checkbuttons para los libros</p>
      <br>
      <br>
      <br>
      <b-row class="ml-2">
        <b-col md="6">
          <h5>Total sin IVA: {{ (encabezado.total - (encabezado.total * 0.12)) }}</h5>
          <h5>Total IVA: {{ (encabezado.total * 0.12) }}</h5>
          <h5>Total: {{ (encabezado.total) }}</h5>
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
              <h4 class="card-title mt-3">Listado de ventas pendientes de contabilidad</h4>

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
                <h5 v-if="props.rowData.estado == 2">
                  <b-badge variant="light"
                    ><h6 class="success"><strong>PENDIENTE DE CONTABILIDAD</strong></h6></b-badge
                  >
                </h5>
              </div>
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-b-tooltip.top="'Comprobar contabilidad'"
                    @click="seeSale(props.rowData)"
                    v-b-modal.modal-2
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-arrow-right'"
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
export default {
  name: 'SalesList',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
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
        fecha2: null,
        descripcion: ''
      },
      arrayDetalles: [],
      arrayToday: [],
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
      apiBase: apiUrl + '/ventas/listAccounting',
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
        id: { required },
        descripcion: { required }
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
      me.form.descripcion = 'Partida No. ' + data.id + ' para el cliente ' + data.client + ' por un valor de ' + data.total
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
      }
    },
    onValidate (action) {
      this.$v.$touch()
      //  tratamiento de fechas
      console.log(this.selectedDates)
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
    generarEspecifico () {
      console.log('Llega aqui')
    }
  }
}
</script>
