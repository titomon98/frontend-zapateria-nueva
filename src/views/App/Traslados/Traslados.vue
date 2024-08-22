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

          <b-col md="12">
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
                {{ 'Nombre: '+ option.zapato.estilo + ' Talla: '+ option.talla + ' Color: '+ option.zapato.colore.nombre }}
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
          <b-form-group label="Motivo de traslado:">
            <b-form-input
              type="text"
              v-model.trim="$v.formZapato.motivo.$model"
              :state="!$v.formZapato.motivo.$error"
              placeholder="Ingresar motivo de traslado"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.formZapato.motivo.$invalid" class="invalid-feedback">
            Debe ingresar el motivo
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
              <b-col md="4" v-if="check===false">
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
              <b-col md="4">
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
              <b-col md="4">
                <b-form-group label="Agregar zapatos:">
                  <b-button variant="info" @click="onAgregarZapato()">AGREGAR ZAPATOS</b-button>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="6" v-if="check===false">
                <b-form-group label="Responsable de envío:">
                  <v-select
                    name="responsable"
                    v-model="$v.responsable.$model"
                    :state="!$v.responsable.$error"
                    :options="responsables"
                    :filterable="false"
                    placeholder="Seleccione responsable de envío"
                    @search="onSearchPersonas"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ option.nombre + ' ' + option.apellidos }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ option.nombre + ' ' + option.apellidos }}
                    </template>
                  </v-select>
                  <div v-if="$v.responsable.$error" class="invalid-feedback-vselect">
                    Debe seleccionar el responsable
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Descripción:">
                  <b-form-textarea
                    v-model.trim="$v.descripcion.$model"
                    :state="!$v.descripcion.$error"
                    placeholder="Ingresar descripcion"
                  ></b-form-textarea>
                </b-form-group>
                <div v-if="$v.descripcion.$invalid" class="invalid-feedback">
                  Debe ingresar la descripción del traslado
                </div>
              </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="6">
                <b-form-group label="Anticipo:">
                  <b-form-input
                    type="number"
                    v-model.trim="$v.adelanto.$model"
                    :state="!$v.adelanto.$error"
                    placeholder="Ingresar anticipo"
                  ></b-form-input>
                </b-form-group>
                <div v-if="$v.adelanto.$invalid" class="invalid-feedback">
                  Debe ingresar la anticipo para el traslado
                </div>
              </b-col>
            </b-row>
            <!-- Aqui comenzar con detalles -->
            <br>
            <br>
            <table class="table table-hover product_item_list c_table theme-color mb-0">
              <thead>
                  <tr>
                      <th>Acciones</th>
                      <th>Detalle</th>
                      <th>Motivo</th>
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
                    <td v-text="details.nombre_zapato"></td>
                    <td v-text="details.motivo"></td>
                    <td v-text="details.cantidad"></td>
                    <td v-text="details.total"></td>
                  </tr>
              </tbody>
            </table>
            <br>
            <br>
            <b-button variant="warning" v-if="arrayDetalles.length > 0" @click="onValidateAll()">AGREGAR TRASLADO</b-button>
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
      paciente: null,
      id_usuario: 0,
      tienda1: null,
      tienda2: null,
      responsable: null,
      adelanto: null,
      isButtonEnabled: false,
      tiendas: [],
      descripcion: null,
      zapato: {
        talla: '',
        id: 0,
        zapato: {
          id: 0,
          cantidad: 0,
          estilo: '',
          existencias: 0,
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
        motivo: null
      },
      checkText: 'Cliente externo',
      check: false,
      arrayDetalles: [],
      zapatos: [],
      responsables: [],
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
      descripcion: { required },
      responsable: { required },
      adelanto: { required },
      formZapato: {
        cantidad: { },
        motivo: { }
      },
      zapato: { required }
    }
  },
  methods: {
    deleteDetail (id) {
      let me = this
      const objWithIdIndex = me.arrayDetalles.findIndex((obj) => obj.id === id)
      if (objWithIdIndex > -1) {
        me.arrayDetalles.splice(objWithIdIndex, 1)
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.resetData()
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'zapato') {
          this.onSaveShoe()
        }
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    onSaveShoe () {
      const detalle = {
        estilo: '',
        cantidad: '',
        motivo: '',
        total: 0,
        zapato: 0,
        talla: '',
        id_talla: 0,
        nombre_zapato: '',
        existencias: 0
      }
      if (parseInt(this.zapato.cantidad) >= parseInt(this.formZapato.cantidad)) {
        detalle.estilo = this.formZapato.estilo
        detalle.cantidad = this.formZapato.cantidad
        detalle.motivo = this.formZapato.motivo
        detalle.total = this.formZapato.total
        detalle.zapato = this.zapato.zapato.id
        detalle.nombre_zapato = this.zapato.zapato.estilo + ' - Talla: ' + this.zapato.talla
        detalle.id_talla = this.zapato.id
        detalle.talla = this.zapato.talla
        detalle.existencias = this.zapato.cantidad
        detalle.total = parseFloat(this.formZapato.cantidad) * this.zapato.zapato.precio_venta
        this.arrayDetalles.push(detalle)
      } else {
        this.alertErrorText = 'La cantidad a trasladar no puede ser mayor a la cantidad en existencia'
        this.showAlertError()
      }
      this.formZapato.estilo = ''
      this.formZapato.cantidad = ''
      this.formZapato.motivo = ''
      this.formZapato.total = ''
      /*
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
        motivo: null
      },
      */
    },
    onAgregarZapato () {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        this.$refs['modal-3'].show()
      } else {
        if (this.descripcion && this.tienda1 && this.tienda2 && this.responsable && this.adelanto) {
          this.$refs['modal-3'].show()
        } else {
          this.alertText = 'Debe llenar todos los campos antes de agregar zapatos.'
          this.showAlert()
        }
      }
    },
    onValidateAll () {
      this.$v.$touch()
      this.id_usuario = this.currentUser.id
      if (this.$v.$error !== true) {
        this.onSave()
      } else {
        if (this.descripcion && this.tienda1 && this.tienda2 && this.responsable && this.adelanto) {
          this.onSave()
        } else {
          this.alertText = 'Debe llenar todos los datos del traslado y agregar zapatos a este.'
          this.showAlert()
        }
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
      if (this.descripcion && this.tienda1 && this.tienda2 && this.responsable && this.adelanto) {
        var today = new Date()
        const me = this
        console.log(me.arrayDetalles)
        axios.post(apiUrl + '/traslados/create', {
          detalle: me.arrayDetalles,
          fecha: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
          descripcion: me.descripcion,
          id_tienda_envio: me.tienda1.id,
          id_tienda_recibe: me.tienda2.id,
          id_responsable_envio: me.responsable,
          id_usuario: me.id_usuario,
          adelanto: me.adelanto,
          pertenencia: 'CENTRO GALO'
        })
          .then((response) => {
            me.alertVariant = 'success'
            me.showAlert()
            me.arrayDetalles = []
            me.fecha = ''
            me.id_tienda_envio = null
            me.id_tienda_recibe = null
            me.id_responsable_envio = null
            me.adelanto = ''
            me.descripcion = ''
            me.alertText = 'Se ha agregado el traslado exitosamente'
            me.closeModal('save')
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertText = error.response.data.msg
            console.error('Error!', error)
            me.arrayDetalles = []
            me.fecha = ''
            me.id_tienda_envio = ''
            me.id_tienda_recibe = ''
            me.id_responsable_envio = ''
            me.adelanto = ''
            me.descripcion = ''
          })
      } else {
        this.alertErrorText = 'Debe llenar todos los datos'
        this.showAlertError()
      }
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
    onSearchPersonas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingPersonas(search, loading)
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
    },
    searchingPersonas (search, loading) {
      axios.get(apiUrl + '/usuarios/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.responsables = response.data
        loading(false)
      })
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
    }
  }
}
</script>
