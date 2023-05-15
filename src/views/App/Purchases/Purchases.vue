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
    <b-modal id="modal-2" ref="modal-2" title="Agregar medicamento">
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
        <b-form-group label="Medicamento:">
          <v-select
            name="medicine"
            v-model="$v.formMedicamento.medicine.$model"
            :state="!$v.formMedicamento.medicine.$error"
            :options="medicines"
            :filterable="false"
            placeholder="Seleccione el medicamento"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ 'Nombre: '+ option.nombre +' Precio de compra: '+ option.precio_costo +  ' Existencia: '+ option.existencia_total}}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ 'Nombre: '+ option.nombre +' Precio de compra: '+ option.precio_costo +  ' Existencia: '+ option.existencia_total}}
            </template>
          </v-select>
          <div v-if="$v.formMedicamento.medicine.$error" class="invalid-feedback-vselect">
            Debe seleccionar el medicamento
          </div>
         </b-form-group>
        <div v-if="$v.formMedicamento.medicine.$invalid" class="invalid-feedback">
          Debe ingresar el medicamento
        </div>
        <b-form-group label="Cantidad:">
          <b-form-input
            type="number"
            v-model.trim="$v.formMedicamento.cantidad.$model"
            :state="!$v.formMedicamento.cantidad.$error"
            placeholder="Ingresar Cantidad"
          ></b-form-input>
        </b-form-group>
        <div v-if="$v.formMedicamento.cantidad.$invalid" class="invalid-feedback">
          Debe ingresar la cantidad
        </div>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('medicamento')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('medicamento')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-1" ref="modal-1" title="Agregar consumible">
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
        <b-form-group label="Descripción:">
          <b-form-input
            v-model.trim="$v.formConsumible.descripcion.$model"
            :state="!$v.formConsumible.descripcion.$error"
            placeholder="Ingresar descripción"
          ></b-form-input>
        </b-form-group>
        <div v-if="$v.formConsumible.descripcion.$invalid" class="invalid-feedback">
          Debe ingresar la descripción
        </div>
        <b-form-group label="Total:">
          <b-form-input
            type="number"
            v-model.trim="$v.formConsumible.total.$model"
            :state="!$v.formConsumible.total.$error"
            placeholder="Ingresar total"
          ></b-form-input>
        </b-form-group>
        <div v-if="$v.formConsumible.total.$invalid" class="invalid-feedback">
          Debe ingresar el total
        </div>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('consumible')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('consumible')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Compras</h4>
            </template>
          <template v-slot:body>
            <b-row class="ml-2">
              <b-col md="3">
                <b-form-group label="Proveedor:">
                  <v-select
                    name="medicine"
                    v-model="$v.formCompra.proveedor.$model"
                    :state="!$v.formCompra.proveedor.$error"
                    :options="proveedores"
                    :filterable="false"
                    placeholder="Seleccione el proveedor"
                    @search="onSearchProviders"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                  </v-select>
                  <div v-if="$v.formCompra.proveedor.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el proveedor
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Tipo de contribuyente:">
                  <v-select
                    name="medicine"
                    v-model="$v.formCompra.contribuyente.$model"
                    :state="!$v.formCompra.contribuyente.$error"
                    :options="contribuyentes"
                    :filterable="false"
                    placeholder="Seleccione el contribuyente"
                    @search="onSearchContribuyentes"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                  </v-select>
                  <div v-if="$v.formCompra.contribuyente.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el contribuyente
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Área de destino:">
                  <v-select
                    name="medicine"
                    v-model="$v.formCompra.destino.$model"
                    :state="!$v.formCompra.destino.$error"
                    :options="destinos"
                    :filterable="false"
                    placeholder="Seleccione el área de destino"
                    @search="onSearchDestinys"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ 'Nombre: '+ option.nombre }}
                    </template>
                  </v-select>
                  <div v-if="$v.formCompra.destino.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el área de destino
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
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
            </b-row>
            <b-row class="ml-2">
              <b-col md="3">
                <b-form-group label="Razón social:">
                  <b-form-input
                    v-model.trim="$v.razon_social"
                    placeholder="Ingresar razón social"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Agregar medicamento:">
                  <b-button variant="info" v-b-modal.modal-2>AGREGAR MEDICAMENTO</b-button>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Agregar consumible:">
                  <b-button variant="info" v-b-modal.modal-1>AGREGAR CONSUMIBLE</b-button>
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
                      <th>Total</th>
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
            <b-button variant="warning" v-if="arrayDetalles.length > 0" @click="onValidateAll()">AGREGAR COMPRA</b-button>
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
  name: 'Purchases',
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
      id_usuario: 0,
      direccion: 'Ciudad',
      razon_social: '',
      actividad_recreativa: '',
      formMedicamento: {
        id: 0,
        cantidad: null,
        medicine: [],
        total: '',
        is_medicine: null
      },
      formCompra: {
        proveedor: '',
        contribuyente: '',
        destino: ''
      },
      formConsumible: {
        id: 0,
        descripcion: '',
        total: null
      },
      medicine: [],
      existencia_medicina: 0,
      arrayDetalles: [],
      medicines: [],
      proveedores: [],
      contribuyentes: [],
      destinos: [],
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
      formMedicamento: {
        medicine: {
          required
        },
        cantidad: {
          required
        }
      },
      formCompra: {
        proveedor: {
          required
        },
        contribuyente: {
          required
        },
        destino: {
          required
        }
      },
      formConsumible: {
        descripcion: {
          required
        },
        total: {
          required
        }
      },
      direccion: { required }
    }
  },
  methods: {
    addConsumible () {
      let me = this
      me.total_array = me.total_array + 1
      let consumible = {
        cantidad: 1,
        descripcion: me.formConsumible.descripcion,
        total: me.formConsumible.total,
        id: me.total_array
      }
      me.arrayDetalles.push(consumible)
      me.closeModal('consumible')
    },
    addMedicine () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formMedicamento.medicine.precio_publico) * me.formMedicamento.cantidad)
      let medicamento = {
        cantidad: me.formMedicamento.cantidad,
        descripcion: me.formMedicamento.medicine.nombre,
        total: nuevoTotal,
        id: me.total_array,
        is_medicine: 1,
        id_medicine: me.formMedicamento.medicine.id,
        existencia_actual: me.formMedicamento.medicine.existencia_total
      }
      me.arrayDetalles.push(medicamento)
      me.closeModal('medicamento')
    },
    deleteDetail (id) {
      let me = this
      const objWithIdIndex = me.arrayDetalles.findIndex((obj) => obj.id === id)
      if (objWithIdIndex > -1) {
        me.arrayDetalles.splice(objWithIdIndex, 1)
      }
    },
    closeModal (action) {
      switch (action) {
        case 'medicamento': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.resetData()
          break
        }
        case 'consumible': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          this.resetData()
          break
        }
        case 'save': {
          this.$v.$reset()
          this.resetData()
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      if (action === 'consumible') {
        this.formMedicamento.medicine = 'Consulta'
        this.formMedicamento.cantidad = 'Consulta'
      } else if (action === 'medicamento') {
        this.formConsumible.descripcion = 'Medicamento'
        this.formConsumible.total = 'Medicamento'
      }
      if (this.$v.$error !== true) {
        if (action === 'medicamento') {
          if (this.formMedicamento.cantidad > 0) {
            this.addMedicine()
          } else {
            this.alertErrorText = 'La cantidad del producto debe ser mayor a 0'
            this.showAlertError()
          }
        }
        if (action === 'consumible') {
          if (this.formConsumible.total > 0) {
            this.addConsumible()
          } else {
            this.alertErrorText = 'El total del consumible debe ser mayor a 0'
            this.showAlertError()
          }
        }
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    onValidateAll () {
      this.$v.$touch()
      this.id_usuario = this.currentUser.id
      this.formMedicamento.medicine = 'General'
      this.formMedicamento.cantidad = 'General'
      this.formConsumible.total = 'General'
      this.formConsumible.descripcion = 'General'
      if (this.$v.$error !== true) {
        this.onSave()
      } else {
        this.alertText = 'Ha ocurrido un error en la compra'
        this.showAlertError()
      }
    },
    setData () {
      this.formCompra.proveedor = ''
      this.formCompra.contribuyente = ''
      this.formCompra.destino = ''
    },
    resetData () {
      this.formMedicamento.medicine = null
      this.formMedicamento.cantidad = null
      this.formMedicamento.total = null
      this.formMedicamento.is_medicine = null
      this.formMedicamento.id = null
      this.formConsumible.id = 0
      this.formConsumible.descripcion = ''
      this.formConsumible.total = null
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/compras/create', {
        direccion: me.direccion,
        detalle: me.arrayDetalles,
        proveedor: me.formCompra.proveedor,
        contribuyente: me.formCompra.contribuyente,
        destino: me.formCompra.destino,
        id_usuario: me.id_usuario,
        razon_social: me.razon_social
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la compra exitosamente'
          me.closeModal('save')
          me.arrayDetalles = []
          me.setData()
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
    searching (search, loading) {
      axios.get(apiUrl + '/medicamento/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.medicines = response.data
        loading(false)
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searchingProviders (search, loading) {
      axios.get(apiUrl + '/proveedor/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.proveedores = response.data
        loading(false)
      })
    },
    onSearchProviders (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingProviders(search, loading)
      }
    },
    searchingContribuyentes (search, loading) {
      axios.get(apiUrl + '/contribuyente/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.contribuyentes = response.data
        loading(false)
      })
    },
    onSearchContribuyentes (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingContribuyentes(search, loading)
      }
    },
    searchingDestinys (search, loading) {
      axios.get(apiUrl + '/destino/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.destinos = response.data
        loading(false)
      })
    },
    onSearchDestinys (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingDestinys(search, loading)
      }
    }
  }
}
</script>
