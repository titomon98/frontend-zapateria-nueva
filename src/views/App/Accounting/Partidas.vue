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
    <b-modal id="modal-ver" ref="modal-ver" title="Ver detalles">
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
        <b-col md="12">
          <b-form-group label="Descripcion">
            <h6>{{ encabezado.descripcion }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="4">
          <b-form-group label="Tipo">
            <h6>{{ encabezado.tipo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Total">
            <h6>{{ encabezado.total }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Moneda">
            <h6>{{ encabezado.moneda }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <br>
      <br>
      <table class="table table-hover product_item_list c_table theme-color mb-0">
        <thead>
            <tr>
                <th>Nomenclatura</th>
                <th>Debe</th>
                <th>Haber</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="details in arrayDetalles" :key="details.id">
              <td v-text="details.nomenclatura.nombre"></td>
              <td v-text="details.cantidad" v-if="details.posicion === 'DEBE'"></td>
              <td v-else>Q 0</td>
              <td v-text="details.cantidad" v-if="details.posicion === 'HABER'"></td>
              <td v-else>Q 0</td>

            </tr>
        </tbody>
      </table>
      <br>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('see')"
          >Cerrar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-mov-banc" ref="modal-mov-banc" title="Agregar movimiento bancario">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-form @submit="$event.preventDefault()">
        <b-form-group label="Referencia:">
          <b-form-input
            v-model.trim="form2.referencia"
            placeholder="Ingresar referencia del movimiento bancario"
          ></b-form-input>
          <div v-if="form2.error.referencia" class="invalid-feedback">
            Debe ingresar la referencia
          </div>
        </b-form-group>
        <b-form-group label="Cantidad:">
          <b-form-input
            type="number"
            v-model.trim="form2.cantidad"
            placeholder="Ingresar cantidad del movimiento bancario"
          ></b-form-input>
          <div v-if="form2.error.cantidad" class="invalid-feedback">
            Debe ingresar la cantidad
          </div>
        </b-form-group>
        <b-form-group label="Cuentas:">
          <v-select
            name="cuentas"
            v-model="form2.cuenta_bancaria"
            :options="cuentas"
            :filterable="false"
            placeholder="Seleccione la cuenta"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
          </v-select>
          <div v-if="form2.error.cuenta_bancaria" class="invalid-feedback-vselect">
            Debe seleccionar la cuenta
          </div>
         </b-form-group>
        <b-row class="ml-2">
          <b-form-group label="Tipo de movimiento:">
            <b-col md="4">
              <b-form-radio v-model="form2.tipo" value="DEBITO" name="customRadio2">Débito</b-form-radio>
            </b-col>
            <b-col md="4">
              <b-form-radio v-model="form2.tipo" value="CREDITO" name="customRadio2">Crédito</b-form-radio>
            </b-col>
          </b-form-group>
          <b-col md="4">
            <b-form-group label="Id de partida.">
              <h6>{{ encabezado.id }}</h6>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label="Descripcion">
              <h6>{{ encabezado.descripcion }}</h6>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidateBank('save-bank')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save-bank')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-lig-banc" ref="modal-lig-banc" title="Ver movimientos bancarios">
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
        <b-col md="12">
          <b-form-group label="Descripcion">
            <h6>{{ encabezado.descripcion }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="4">
          <b-form-group label="Tipo">
            <h6>{{ encabezado.tipo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Total">
            <h6>{{ encabezado.total }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Moneda">
            <h6>{{ encabezado.moneda }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <br>
      <br>
      <table class="table table-hover product_item_list c_table theme-color mb-0">
        <thead>
            <tr>
                <th>Referencia</th>
                <th>Tipo</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="details in movimientos" :key="details.id">
              <td v-text="details.numero_movimiento"></td>
              <td v-text="details.tipo"></td>
              <td v-text="'Q' + details.cantidad"></td>
            </tr>
        </tbody>
      </table>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('see-bank')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-partida" ref="modal-3-partida" title="Desactivar partida">
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
        ¿Desea desactivar la partida: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-partida')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-partida')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-partida" ref="modal-4-partida" title="Activar partida">
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
        ¿Desea activar la partida: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-partida')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-partida')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Partidas</h4>
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
                to='NuevasPartidas'
              >
                <b-button variant="primary" >AGREGAR NUEVO</b-button>
              </router-link>
              <b-button variant="dark" @click="PDF()">GENERAR PDF</b-button>
              <b-button variant="dark" @click="EXCEL()">GENERAR EXCEL</b-button>
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
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-b-tooltip.top="'Editar'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-2-partida
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
                        ? $bvModal.show('modal-3-partida')
                        : $bvModal.show('modal-4-partida');
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
              <!-- Botones -->
              <template slot="actions" slot-scope="props">
                <b-button-group>
                  <b-button
                    v-b-tooltip.top="'Editar'"
                    @click="editarPartida(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-warning"
                    ><i :class="'fas fa-pencil-alt'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Ver detalles'"
                    v-b-modal.modal-ver
                    @click="seePartida(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-eye'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Agregar movimiento bancario'"
                    @click="seePartida(props.rowData)"
                    v-b-modal.modal-mov-banc
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-plus'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Ver movimientos bancarios'"
                    v-b-modal.modal-lig-banc
                    @click="getPartidas(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-briefcase'"
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
                </b-button-group>
              </template>
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
  name: 'Partidas',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  setup () {
    return { $v: useVuelidate() }
  },
  beforeMount () {
    this.getCuentas()
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
        tipo: 'NORMAL',
        fecha: '',
        state: 1,
        total: 0.0
      },
      form2: {
        id: 0,
        referencia: '',
        state: 1,
        cantidad: 0,
        tipo: 'DEBITO',
        cuenta_bancaria: null,
        error: {
          referencia: false,
          cantidad: false,
          cuenta_bancaria: false
        }
      },
      cuentas: null,
      movimientos: null,
      encabezado: {
        id: 0,
        descripcion: '',
        tipo: '',
        total: 0,
        moneda: ''
      },
      arrayDetalles: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/partidas/list',
      options: [
        { value: 'descripcion', nombre: 'Descripción' },
        { value: 'total', nombre: 'Total' },
        { value: 'tipo', nombre: 'Tipo' }
      ],
      columna: { value: 'descripcion', nombre: 'Descripción' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'descripcion',
          sortField: 'descripcion',
          title: 'Descripción',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo',
          sortField: 'tipo',
          title: 'Partida',
          dataClass: 'list-item-heading'
        },
        {
          name: 'fecha',
          sortField: 'fecha',
          title: 'Fecha',
          dataClass: 'list-item-heading'
        },
        {
          name: 'total',
          sortField: 'total',
          title: 'Total',
          dataClass: 'list-item-heading'
        },
        {
          name: 'iva',
          sortField: 'iva',
          title: 'IVA',
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
        total: { required },
        fecha: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-partida'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
        case 'save-bank': {
          this.$v.$reset()
          this.$refs['modal-mov-banc'].hide()
          this.form2.id = 0
          this.form2.referencia = ''
          this.form2.cantidad = 0
          this.form2.cuenta_bancaria = ''
          this.form2.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-partida'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
        case 'see': {
          this.$v.$reset()
          this.$refs['modal-ver'].hide()
          this.encabezado.id = 0
          this.encabezado.tipo = ''
          this.encabezado.descripcion = ''
          this.encabezado.total = 0
          this.encabezado.moneda = ''
          break
        }
        case 'see-bank': {
          this.$v.$reset()
          this.$refs['modal-lig-banc'].hide()
          this.encabezado.id = 0
          this.encabezado.descripcion = ''
          this.encabezado.total = 0
          this.encabezado.moneda = ''
          this.movimientos = null
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
    onValidateBank (action) {
      let me = this
      if (me.form2.cantidad === 0) {
        me.form2.error.cantidad = true
      }
      if (me.form2.referencia === '') {
        me.form2.error.referencia = true
      }
      if (me.form2.cuenta_bancaria === null) {
        me.form2.error.cuenta_bancaria = true
      }
      if (me.form2.error.cantidad === true || me.form2.error.referencia === true || me.form2.error.cuenta_bancaria === true) {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      } else {
        this.onSaveBank()
      }
    },
    setData (data) {
      this.form.name = data.nombre
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/partidas/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la partida ' + me.form.name + ' exitosamente'
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
    onSaveBank () {
      const me = this
      axios.post(apiUrl + '/movimiento/create_partida', {
        form: me.form2,
        id_partida: me.encabezado.id })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el movimiento con referencia ' + me.form2.referencia + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('save-bank')
          me.getCuentas()
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
      axios.put(apiUrl + '/partidas/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la partida ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/partidas/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la partida ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-partida'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/partidas/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado la partida ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-partida'].hide()
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
          columna: this.columna.value,
          search: this.search
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          columna: this.columna.value,
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
    PDF () {

    },
    EXCEL () {

    },
    seePartida (data) {
      let me = this
      me.arrayDetalles = data.detalle_partidas
      me.encabezado.id = data.id
      me.encabezado.total = data.total
      me.encabezado.descripcion = data.descripcion
      me.encabezado.tipo = data.tipo
      me.encabezado.moneda = data.moneda
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searching (search, loading) {
      axios.get(apiUrl + '/cuenta_bancaria/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.cuentas = response.data
        loading(false)
      })
    },
    async getCuentas () {
      let me = this
      await axios.get(apiUrl + `/cuenta_bancaria/get`)
        .then(function (response) {
          me.cuentas = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getPartidas (data) {
      let me = this
      me.arrayDetalles = data.detalle_partidas
      me.encabezado.id = data.id
      me.encabezado.total = data.total
      me.encabezado.descripcion = data.descripcion
      me.encabezado.tipo = data.tipo
      me.encabezado.moneda = data.moneda
      await axios.get(apiUrl + `/movimiento/getPartidas`, {
        params: {
          id_partida: data.id
        } })
        .then(function (response) {
          console.log(response.data)
          me.movimientos = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editarPartida (rowData) {
      this.$router.push({ name: 'accounting.EditPartida', params: { id: rowData.id } })
    }
  }
}
</script>
