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
              <h4 class="card-title mt-3">Traslado entre tiendas</h4>
            </template>
            <template v-slot:headerAction>
              <router-link
                to='listadotraslados'
              >
                <b-button variant="primary">VER LISTADO DE TRASLADOS</b-button>
              </router-link>
          </template>
          <template v-slot:body>
            <h5 class="card-title mt-3">Datos de generales de traslado</h5>
            <hr>
            <b-row class="ml-2">
              <b-col md="3" v-if="check===false">
                <b-form-group label="Tienda de origen:">
                  <v-select
                    name="tienda1"
                    v-model="$v.tienda1.$model"
                    :state="!$v.tienda1.$error"
                    :options="tiendas"
                    :filterable="false"
                    placeholder="Seleccione la tienda"
                    @search="onSearchTiendas"
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
                  <div v-if="$v.tienda1.$error" class="invalid-feedback-vselect">
                    Debe seleccionar la tienda
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Tienda de destino:">
                  <v-select
                    name="tienda2"
                    v-model="$v.tienda2.$model"
                    :state="!$v.tienda2.$error"
                    :options="tiendas"
                    :filterable="false"
                    placeholder="Seleccione la tienda"
                    @search="onSearchTiendas"
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
                  <div v-if="$v.tienda2.$error" class="invalid-feedback-vselect">
                    Debe seleccionar la tienda
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Descripción:">
                  <b-form-input
                    v-model.trim="$v.descripcion.$model"
                    :state="!$v.descripcion.$error"
                    placeholder="Ingresar descripcion"
                  ></b-form-input>
                </b-form-group>
                <div v-if="$v.descripcion.$invalid" class="invalid-feedback">
                  Debe ingresar la descripción del traslado
                </div>
              </b-col>
              <b-col md="3">
                <b-form-group label="Agregar zapatos:">
                  <b-button variant="info" v-b-modal.modal-1>AGREGAR ZAPATOS</b-button>
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
  name: 'Sales',
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
      paciente: null,
      id_usuario: 0,
      tienda1: null,
      tienda2: null,
      tiendas: [],
      descripcion: null,
      formServicio: {
        id: 0,
        descripcion: '',
        cantidad: null,
        total: 0,
        is_genetic: null,
        is_therapy: null,
        is_service: null
      },
      checkText: 'Cliente externo',
      check: false,
      medicine: [],
      existencia_medicina: 0,
      exams: [],
      therapys: [],
      services: [],
      geneticas: [],
      tipos_de_cobro: [],
      arrayDetalles: [],
      medicines: [],
      pacientes: [],
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
      tienda1: { required },
      tienda2: { required },
      descripcion: { required }
    }
  },
  methods: {
    addService () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formServicio.descripcion.precio) * me.formServicio.cantidad)
      let servicio = {
        cantidad: me.formServicio.cantidad,
        descripcion: me.formServicio.descripcion.nombre,
        total: nuevoTotal,
        id: me.total_array,
        is_service: 1
      }
      me.arrayDetalles.push(servicio)
      me.closeModal('servicios')
    },
    addTherapy () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formServicio.descripcion.precio) * me.formServicio.cantidad)
      let terapias = {
        cantidad: me.formServicio.cantidad,
        descripcion: me.formServicio.descripcion.nombre,
        total: nuevoTotal,
        id: me.total_array,
        is_therapy: 1
      }
      me.arrayDetalles.push(terapias)
      me.closeModal('terapias')
    },
    addGenetic () {
      let me = this
      me.total_array = me.total_array + 1
      let nuevoTotal = (parseFloat(me.formServicio.descripcion.precio) * me.formServicio.cantidad)
      let geneticas = {
        cantidad: me.formServicio.cantidad,
        descripcion: me.formServicio.descripcion.nombre,
        total: nuevoTotal,
        id: me.total_array,
        is_genetic: 1
      }
      me.arrayDetalles.push(geneticas)
      me.closeModal('geneticas')
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
        is_exam: 1,
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
        case 'geneticas': {
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
      if (action === 'medicamento') {
        this.formExamen.descripcion = 'Medicamento'
        this.formExamen.cantidad = 'Medicamento'
        this.formServicio.descripcion = 'Medicamento'
        this.formServicio.cantidad = 'Medicamento'
        this.formServicio.total = 'Medicamento'
      } else if (action === 'examen') {
        this.formMedicamento.medicine = 'Examen'
        this.formMedicamento.cantidad = 'Examen'
        this.formServicio.descripcion = 'Examen'
        this.formServicio.cantidad = 'Examen'
        this.formServicio.total = 'Examen'
      } else if (action === 'servicios') {
        this.formMedicamento.medicine = 'Servicios'
        this.formMedicamento.cantidad = 'Servicios'
        this.formExamen.descripcion = 'Servicios'
        this.formExamen.cantidad = 'Servicios'
      } else if (action === 'terapias') {
        this.formMedicamento.medicine = 'Terapias'
        this.formMedicamento.cantidad = 'Terapias'
        this.formExamen.descripcion = 'Terapias'
        this.formExamen.cantidad = 'Terapias'
      } else if (action === 'geneticas') {
        this.formMedicamento.medicine = 'Geneticas'
        this.formMedicamento.cantidad = 'Geneticas'
        this.formExamen.descripcion = 'Geneticas'
        this.formExamen.cantidad = 'Geneticas'
      }
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'medicamento') {
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
        } else if (action === 'servicios') {
          this.addService()
        } else if (action === 'terapias') {
          this.addTherapy()
        } else if (action === 'geneticas') {
          this.addGenetic()
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
      this.formServicio.descripcion = 'General'
      this.formServicio.cantidad = 'General'
      this.formServicio.total = 'General'
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
      this.formMedicamento.medicine = null
      this.formMedicamento.cantidad = null
      this.formMedicamento.total = null
      this.formMedicamento.is_medicine = null
      this.formMedicamento.id = null
      this.formExamen.descripcion = ''
      this.formExamen.cantidad = null
      this.formExamen.total = null
      this.formExamen.id = null
      this.formExamen.is_exam = null
      this.formServicio.is_genetic = null
      this.formServicio.is_service = null
      this.formServicio.is_therapy = null
      this.formServicio.descripcion = null
      this.formServicio.cantidad = null
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
        numero: me.numero,
        tipo_cobro: me.tipo_cobro,
        id_usuario: me.id_usuario,
        pertenencia: 'CENTRO GALO'
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
    onSearchTiendas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingTiendas(search, loading)
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
    searchingTiendas (search, loading) {
      axios.get(apiUrl + '/tiendas/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.tiendas = response.data
        loading(false)
      })
    }
  }
}
</script>
