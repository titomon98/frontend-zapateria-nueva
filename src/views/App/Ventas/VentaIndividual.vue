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
    <b-modal id="modal-1" ref="modal-1" title="Agregar cliente">
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
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="formCliente.name"
            placeholder="Ingresar nombre de cliente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="formCliente.telefono"
            placeholder="Ingresar telefono de cliente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="formCliente.nit"
            placeholder="Ingresar nit de cliente"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('cliente')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('cliente')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3" ref="modal-3" size="xl" title="Agregar zapatos">
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
            <b-form-group label="Tipo de búsqueda:">
              <b-form-radio v-model="tipo_busqueda" value="CODIGO" name="customRadio">Código</b-form-radio>
              <b-form-radio v-model="tipo_busqueda" value="ESTILO" name="customRadio">Estilo</b-form-radio>
            </b-form-group>

          </b-col>
          <b-col md="12" v-if="tipo_busqueda === 'CODIGO'">
            <b-form-input
              type="text"
              v-model.trim="codigo"
              :state="!$v.zapato.$error"
              placeholder="Ingresar código"
              @input="cambioCodigo"
            ></b-form-input>
            <br>
          </b-col>
          <b-col md="12" v-else-if="tipo_busqueda === 'ESTILO'">
            <b-form-group label="Zapatos:">
            <v-select
              name="zapatos"
              v-model="$v.zapato.$model"
              :state="!$v.zapato.$error"
              :options="zapatos"
              :filterable="false"
              placeholder="Seleccione el zapato a vender"
              @search="onSearch"
            >
              <template v-slot:spinner="{ loading }">
                <div v-show="loading">Cargando...</div>
              </template>
              <template v-slot:option="option">
                {{ 'Nombre: '+ option.zapato.estilo + ' Talla: '+ option.talla + ' Color: '+ option.zapato.colore.nombre }}
              </template>
              <template slot="selected-option" slot-scope="option">
                {{ 'Nombre: '+ option.zapato.estilo + ' Color: '+ option.talla + ' Color: '+ option.zapato.colore.nombre }}
              </template>
            </v-select>
            <div v-if="$v.zapato.$error" class="invalid-feedback-vselect">
              Debe seleccionar el zapato
            </div>
          </b-form-group>
          <div v-if="$v.zapato.$invalid" class="invalid-feedback">
            Debe ingresar el zapato
          </div>
          </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="6">
          <b-form-group label="Nombre de zapato:">
            <h6>{{ zapato.zapato.estilo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Talla:">
            <h6>{{ zapato.talla }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Color:">
            <h6>{{ zapato.zapato.colore.nombre }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="4">
          <b-form-group label="Precio de venta:">
            <h6>{{ zapato.zapato.precio_venta }}</h6>
          </b-form-group>

        </b-col>
        <b-col md="4">
          <b-form-group label="Precio mínimo:">
            <h6>{{ zapato.zapato.precio_minimo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Existencia actual:">
            <h6>{{ zapato.cantidad }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="6">
          <b-form-group label="Cantidad:">
            <b-form-input
              type="number"
              v-model.trim="$v.formZapato.cantidad.$model"
              :state="!$v.formZapato.cantidad.$error"
              placeholder="Ingresar cantidad a vender"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.formZapato.cantidad.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad
          </div>
        </b-col>
        <b-col md="6">
          <b-form-group label="Precio a vender:">
            <b-form-input
              type="number"
              v-model.trim="$v.formZapato.precio.$model"
              :state="!$v.formZapato.precio.$error"
              placeholder="Ingresar precio a vender"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.formZapato.precio.$invalid" class="invalid-feedback">
            Debe ingresar el precio
          </div>
        </b-col>
      </b-row>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('zapato')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('zapato')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Caja</h4>
            </template>
            <template v-slot:headerAction>
              <b-button variant="dark" v-b-modal.modal-1>AGREGAR CLIENTE</b-button>
            </template>
          <template v-slot:body>
            <h5 class="card-title mt-3">Datos de generales de cobro</h5>
            <hr>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Cliente:">
                  <v-select
                    name="clientes"
                    v-model="$v.cliente.$model"
                    :state="!$v.cliente.$error"
                    :options="clientes"
                    :filterable="false"
                    placeholder="Seleccione el cliente"
                    @search="onSearchClients"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ 'Nombre: '+ option.nombre + ' Teléfono: '+ option.telefono + ' Nit: '+ option.nit }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ 'Nombre: '+ option.nombre + ' Teléfono: '+ option.telefono + ' Nit: '+ option.nit }}
                    </template>
                  </v-select>
                  <div v-if="$v.tipo_cobro.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el cliente
                  </div>
                </b-form-group>
                <div v-if="$v.cliente.$invalid" class="invalid-feedback">
                  Debe ingresar el cliente
                </div>
              </b-col>
              <b-col md="2">
                <b-form-group label="Dirección:">
                  <b-form-input
                    v-model.trim="$v.direccion.$model"
                    :state="!$v.direccion.$error"
                    placeholder="Ingresar dirección"
                  ></b-form-input>
                </b-form-group>
                <div v-if="$v.direccion.$invalid" class="invalid-feedback">
                  Debe ingresar la dirección
                </div>
              </b-col>
              <b-col md="2">
                <b-form-group label="Tipo de cobro:">
                  <v-select v-model="tipo_cobro" :options="tipos_de_cobro" label="nombre" placeholder="Selecciona una opción" />
                  <div v-if="$v.tipo_cobro.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el tipo de cobro
                  </div>
                </b-form-group>

              </b-col>
              <b-col md="2">
                <b-form-group label="Agregar zapatos:">
                  <b-button variant="info" v-b-modal.modal-3>AGREGAR ZAPATOS</b-button>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Número de factura:">
                  <b-form-input
                    v-model.trim="numero"
                    placeholder="Ingresar número"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Aqui comenzar con detalles -->
            <br>
            <br>
            <table class="table table-hover product_item_list c_table theme-color mb-0">
              <thead>
                  <tr>
                      <th>Acciones</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="details in arrayDetalles" :key="details.id">
                    <td>
                        <template>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteDetail(details.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </template>
                    </td>
                    <td v-text="details.descripcion"></td>
                    <td v-text="details.cantidad"></td>
                    <td v-text="details.total"></td>
                  </tr>
              </tbody>
            </table>
            <br>
            <br>
            <table class="table table-hover product_item_list c_table theme-color mb-0" v-if="arrayDetalles.length > 0">
              <thead>
                  <tr>
                      <th>Total vendido: </th>
                      <th>{{ formatQuetzales(total) }}</th>
                  </tr>
              </thead>
            </table>
            <b-button variant="warning" v-if="arrayDetalles.length > 0" @click="onValidateAll()">AGREGAR VENTA</b-button>
          </template>

        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { mapGetters } from 'vuex'

export default {
  name: 'Sales',
  components: {
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
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      tipo_cobro: null,
      serie: '',
      tipo_busqueda: 'CODIGO',
      codigo: '',
      numero: '',
      id_usuario: 0,
      cliente: null,
      direccion: 'Ciudad',
      zapato: {
        talla: '',
        zapato: {
          cantidad: 0,
          estilo: '',
          colore: {
            nombre: ''
          },
          precio_venta: 0,
          precio_minimo: 0
        }
      },
      formZapato: {
        id: 0,
        estilo: '',
        cantidad: null,
        descripcion: '',
        total: 0,
        precio: null
      },
      formCliente: {
        name: null,
        telefono: null,
        nit: null,
        tipo_cliente: {
          id: 1
        }
      },
      checkText: 'Cliente externo',
      check: false,
      tipos_de_cobro: [
        { id: 1, nombre: 'EFECTIVO' },
        { id: 2, nombre: 'TRANSFERENCIA' },
        { id: 3, nombre: 'TARJETA' },
        { id: 4, nombre: 'PAGARE' }
      ],
      arrayDetalles: [],
      zapatos: [],
      clientes: [],
      total_array: 0,
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
          title: 'Descripcion',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad',
          sortField: 'cantidad',
          title: 'Cantidad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'total',
          sortField: 'total',
          title: 'Total',
          dataClass: 'list-item-heading'
        }
      ],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      mask_quetzal: createNumberMask({
        prefix: 'Q ',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2, // how many digits allowed after the decimal
        integerLimit: 10, // limit length of integer numbers
        allowNegative: false,
        allowLeadingZeroes: false
      })
    }
  },
  validations () {
    return {
      cliente: { required },
      direccion: { required },
      tipo_cobro: { required },
      formZapato: {
        cantidad: { required },
        precio: { required }
      },
      zapato: { required }
    }
  },
  methods: {
    addZapato () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formZapato.precio) * parseInt(me.formZapato.cantidad))
      let shoe = {
        descripcion: me.zapato.zapato.estilo + ' talla ' + me.zapato.talla,
        cantidad: me.formZapato.cantidad,
        precio: me.formZapato.precio,
        total: nuevoTotal,
        existencia_actual: me.zapato.cantidad,
        id: me.total_array,
        id_talla: me.zapato.id
      }
      me.total = (parseFloat(me.total) + parseFloat(nuevoTotal))
      me.arrayDetalles.push(shoe)
      me.closeModal('zapato')
    },
    addCliente () {
      const me = this
      axios.post(apiUrl + '/clientes/create', {
        form: me.formCliente })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el cliente ' + me.formCliente.name + ' exitosamente'
          me.closeModal('saveCliente')
        })
        .catch((error) => {
          console.log(error)
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    deleteDetail (id) {
      let me = this
      const objWithIdIndex = me.arrayDetalles.findIndex((obj) => obj.id === id)
      if (objWithIdIndex > -1) {
        me.arrayDetalles.splice(objWithIdIndex, 1)
      }
      me.total = 0.0
      me.arrayDetalles.forEach(element => {
        me.total = (parseFloat(me.total) + parseFloat(element.total))
      })
    },
    closeModal (action) {
      switch (action) {
        case 'zapato': {
          this.$v.$reset()
          this.$refs['modal-3'].hide()
          this.resetData()
          break
        }
        case 'save': {
          this.$v.$reset()
          this.resetData()
          break
        }
        case 'saveCliente': {
          this.$v.$reset()
          this.resetData()
          this.$refs['modal-1'].hide()
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      if (action === 'zapato') {
        if (this.formZapato.cantidad > 0) {
          if (parseInt(this.formZapato.cantidad) <= parseInt(this.zapato.cantidad)) {
            if (parseFloat(this.formZapato.precio) >= parseFloat(this.zapato.zapato.precio_minimo) && parseFloat(this.formZapato.precio) <= parseFloat(this.zapato.zapato.precio_venta)) {
              this.addZapato()
            } else {
              this.alertErrorText = 'El precio de venta del producto debe estar dentro del rango de precios aprobado'
              this.showAlertError()
            }
          } else {
            this.alertErrorText = 'No hay suficiente existencia del producto'
            this.showAlertError()
          }
        } else {
          this.alertErrorText = 'La cantidad del producto debe ser mayor a 0'
          this.showAlertError()
        }
      } else if (action === 'cliente') {
        if (this.formCliente.nombre !== null && this.formCliente.telefono !== null && this.formCliente.nit !== null) {
          this.addCliente()
        } else {
          this.alertErrorText = 'Por favor ingrese datos de cliente'
          this.showAlertError()
        }
      }
    },
    onValidateAll () {
      this.$v.$touch()
      this.id_usuario = this.currentUser.id
      this.formZapato.cantidad = 0
      this.formZapato.precio = 0
      if (this.$v.$error !== true) {
        this.onSave()
      } else {
        this.alertVariant = 'danger'
        this.showAlert()
        this.alertText = 'Ha ocurrido un error en la venta'
      }
    },
    resetData () {
      this.formZapato.descripcion = ''
      this.formZapato.cantidad = null
      this.formZapato.total = null
      this.formZapato.precio = null
      this.formZapato.id = null
      this.formCliente.name = null
      this.formCliente.telefono = null
      this.formCliente.nit = null
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/ventas/create', {
        direccion: me.direccion,
        cliente: me.cliente,
        detalle: me.arrayDetalles,
        numero: me.numero,
        tipo_cobro: me.tipo_cobro,
        total: me.total,
        id_usuario: me.id_usuario
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la venta exitosamente'
          me.closeModal('save')
          me.arrayDetalles = []
          me.total = 0
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertText = error.response.data.msg
          console.error('Error!', error)
        })
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
    },
    converMaskToNumber (number) {
      var myNumber = ''
      for (var i = 0; i < number.length; i += 1) {
        if (
          number.charAt(i) === 'Q' ||
          number.charAt(i) === '€' ||
          number.charAt(i) === '$' ||
          number.charAt(i) === '%' ||
          number.charAt(i) === ',' ||
          number.charAt(i) === ' '
        ) {
          continue
        } else {
          myNumber += number.charAt(i)
        }
      }
      return parseFloat(myNumber).toFixed(2)
    },
    formatQuetzales (amount) {
      let num = parseFloat(amount)
      let formatted
      formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      return (amount = 'Q ' + formatted)
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searching (search, loading) {
      axios.get(apiUrl + '/zapatos/getSelect',
        {
          params: {
            search: search,
            tienda: this.currentUser.tienda
          }
        }
      ).then((response) => {
        this.zapatos = response.data
        loading(false)
      })
    },
    onSearchClients (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingClients(search, loading)
      }
    },
    searchingClients (search, loading) {
      axios.get(apiUrl + '/clientes/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.clientes = response.data
        loading(false)
      })
    },
    cambioCodigo () {
      axios.get(apiUrl + '/tallas/getByCode',
        {
          params: {
            codigo: this.codigo
          }
        }
      ).then((response) => {
        if (response.data == '' && this.codigo != '') {
          this.alertErrorText = 'El código no fue encontrado'
          this.showAlertError()
        } else if (response.data == '' && this.codigo == '') {
          this.alertErrorText = 'El código está vacío'
          this.showAlertError()
        } else {
          this.zapato = response.data
        }
      })
    }
  }
}
</script>
