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
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Ventas GaloTech</h4>
            </template>
          <template v-slot:body>
            <b-row class="ml-2">
              <b-col md="2">
                <b-form-group label="Nit:">
                  <b-form-input
                    v-model.trim="$v.nit.$model"
                    :state="!$v.nit.$error"
                    placeholder="Ingresar nit"
                  ></b-form-input>
                </b-form-group>
                <div v-if="$v.nit.$invalid" class="invalid-feedback">
                  Debe ingresar el nit
                </div>
              </b-col>
              <b-col md="2">
                <b-form-group label="Cliente:">
                  <b-form-input
                    v-model.trim="$v.cliente.$model"
                    :state="!$v.cliente.$error"
                    placeholder="Ingresar cliente"
                  ></b-form-input>
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
                <b-form-group label="Número de factura:">
                  <b-form-input
                    v-model.trim="$v.serie.$model"
                    :state="!$v.serie.$error"
                    placeholder="Ingresar número"
                  ></b-form-input>
                </b-form-group>
                <div v-if="$v.serie.$invalid" class="invalid-feedback">
                  Debe ingresar número
                </div>
              </b-col>
              <b-col md="4">
                <b-form-group label="Tipo de cobro:">
                  <v-select
                    name="tipo_cobro"
                    v-model="$v.tipo_cobro.$model"
                    :state="!$v.tipo_cobro.$error"
                    :options="tipos_de_cobro"
                    :filterable="false"
                    placeholder="Seleccione el tipo de cobro"
                    @search="onSearchPayment"
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
                  <div v-if="$v.tipo_cobro.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el tipo de cobro
                  </div>
                </b-form-group>

              </b-col>

            </b-row>
            <b-row class="ml-2">
              <b-col md="6">
                <b-form-group label="Producto:">
                  <v-select
                    name="equipo"
                    v-model="$v.equipo.$model"
                    :state="!$v.equipo.$error"
                    :options="equipos"
                    :filterable="false"
                    placeholder="Seleccione el producto"
                    @search="onSearchProducts"
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
                  <div v-if="$v.equipo.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el equipo
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Tipo de consumo:">
                <b-form-radio v-model="consumo" value="0" name="customRadio2">Interno</b-form-radio>
                <b-form-radio v-model="consumo" value="1" name="customRadio2">Venta</b-form-radio>
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
  name: 'SalesGT',
  components: {
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
  },
  beforeDestroy () {
    console.log('Aqui vamos a meter la validacion')
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
      search_exam: '',
      nit: 'CF',
      tipo_cobro: null,
      consumo: 0,
      equipo: null,
      serie: '1',
      id_usuario: 0,
      cliente: 'CF',
      direccion: 'Ciudad',
      formConsulta: {
        id: 0,
        descripcion: '',
        total: null
      },
      formExamen: {
        id: 0,
        descripcion: '',
        cantidad: null,
        total: ''
      },
      formMedicamento: {
        id: 0,
        cantidad: null,
        medicine: [],
        total: '',
        is_medicine: null
      },
      medicine: [],
      existencia_medicina: 0,
      exams: [],
      therapys: [],
      services: [],
      tipos_de_cobro: [],
      equipos: [],
      arrayDetalles: [],
      medicines: [],
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

      nit: { required },
      cliente: { required },
      direccion: { required },
      tipo_cobro: { required },
      serie: { required },
      equipo: { required }
    }
  },
  methods: {
    addConsult () {
      let me = this
      me.total_array = me.total_array + 1
      let consulta = {
        cantidad: 1,
        descripcion: me.formConsulta.descripcion,
        total: me.formConsulta.total,
        id: me.total_array
      }
      me.arrayDetalles.push(consulta)
      me.closeModal('consulta')
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
    addExam () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formExamen.descripcion.precio) * me.formExamen.cantidad)
      let examen = {
        cantidad: me.formExamen.cantidad,
        descripcion: (me.formExamen.descripcion.nombre + ' ' + me.formExamen.descripcion.tipo_examene.nombre),
        total: nuevoTotal,
        id: me.total_array
      }
      me.arrayDetalles.push(examen)
      me.closeModal('examen')
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
        case 'consulta': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          this.resetData()
          break
        }
        case 'medicamento': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          this.resetData()
          break
        }
        case 'examen': {
          this.$v.$reset()
          this.$refs['modal-3'].hide()
          this.resetData()
          break
        }
        case 'servicios': {
          this.$v.$reset()
          this.$refs['modal-4'].hide()
          this.resetData()
          break
        }
        case 'terapias': {
          this.$v.$reset()
          this.$refs['modal-5'].hide()
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
      if (action === 'consulta') {
        this.formMedicamento.medicine = 'Consulta'
        this.formMedicamento.cantidad = 'Consulta'
        this.formExamen.descripcion = 'Consulta'
        this.formExamen.cantidad = 'Consulta'
      } else if (action === 'medicamento') {
        this.formExamen.descripcion = 'Medicamento'
        this.formExamen.cantidad = 'Medicamento'
        this.formConsulta.descripcion = 'Medicamento'
        this.formConsulta.total = 'Medicamento'
      } else if (action === 'examen') {
        this.formConsulta.descripcion = 'Examen'
        this.formConsulta.total = 'Examen'
        this.formMedicamento.medicine = 'Examen'
        this.formMedicamento.cantidad = 'Examen'
      } else if (action === 'servicios') {
        this.formConsulta.descripcion = 'Examen'
        this.formConsulta.total = 'Examen'
        this.formMedicamento.medicine = 'Examen'
        this.formMedicamento.cantidad = 'Examen'
      } else if (action === 'terapias') {
        this.formConsulta.descripcion = 'Examen'
        this.formConsulta.total = 'Examen'
        this.formMedicamento.medicine = 'Examen'
        this.formMedicamento.cantidad = 'Examen'
      }
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'consulta') {
          if (this.formConsulta.total > 0) {
            this.addConsult()
          } else {
            this.alertErrorText = 'El total de la consulta debe ser mayor a 0'
            this.showAlertError()
          }
        } else if (action === 'medicamento') {
          if (this.formMedicamento.cantidad > 0) {
            if (parseInt(this.formMedicamento.cantidad) <= parseInt(this.formMedicamento.medicine.existencia_total)) {
              this.addMedicine()
            } else {
              this.alertErrorText = 'No hay suficiente existencia del producto'
              this.showAlertError()
            }
          } else {
            this.alertErrorText = 'La cantidad del producto debe ser mayor a 0'
            this.showAlertError()
          }
        } else if (action === 'examen') {
          this.addExam()
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
      this.formExamen.descripcion = 'General'
      this.formExamen.cantidad = 'General'
      this.formConsulta.descripcion = 'General'
      this.formConsulta.total = 'General'
      if (this.$v.$error !== true) {
        this.onSave()
      } else {
        this.alertText = 'Ha ocurrido un error en la venta'
        this.showAlertError()
      }
    },
    setData (data) {

    },
    resetData () {
      this.formConsulta.descripcion = ''
      this.formConsulta.total = null
      this.formConsulta.id = null
      this.formMedicamento.medicine = null
      this.formMedicamento.cantidad = null
      this.formMedicamento.total = null
      this.formMedicamento.is_medicine = null
      this.formMedicamento.id = null
      this.formExamen.descripcion = ''
      this.formExamen.cantidad = null
      this.formExamen.total = null
      this.formExamen.id = null
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/ventas/create', {
        nit: me.nit,
        direccion: me.direccion,
        cliente: me.cliente,
        detalle: me.arrayDetalles,
        serie: me.serie,
        tipo_cobro: me.tipo_cobro,
        id_usuario: me.id_usuario
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la venta exitosamente'
          me.closeModal('save')
          me.arrayDetalles = []
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
          search_exam: this.search_exam,
          columna: this.columna.value
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          search_exam: this.search_exam,
          columna: this.columna.value
        }
    },
    changePageSizes (perPage) {
      this.perPage = perPage
      this.$refs.vuetable.refresh()
    },
    searchChange (val) {
      this.search = val.toLowerCase()
      this.search_exam = val.toLowerCase()
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
    onSearchPayment (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingPayments(search, loading)
      }
    },
    onSearchProducts (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingProducts(search, loading)
      }
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
    searchingPayments (search, loading) {
      axios.get(apiUrl + '/tipo_cobro/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.tipos_de_cobro = response.data
        loading(false)
      })
    },
    searchingProducts (search, loading) {
      axios.get(apiUrl + '/equipo_galo_tech/getSearch',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.equipos = response.data
        loading(false)
      })
    }
  }
}
</script>
