<template>
  <b-container fluid>
    <b-alert
      :show="alertCountDownError"
      dismissible
      fade
      @dismissed="alertCountDownError=0"
      class="text-white bg-danger"
    >
      <div class="iq-alert-text">{{ alertText }}</div>
    </b-alert>
    <b-alert
      :show="alertCountDown"
      dismissible
      fade
      @dismissed="alertCountDown=0"
      class="text-white bg-success"
    >
      <div class="iq-alert-text">{{ alertText }}</div>
    </b-alert>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Editar partida</h4>
            </template>
            <template v-slot:headerAction>
              <router-link
                to='Partidas'
              >
                <b-button variant="primary">VER LISTADO DE PARTIDAS</b-button>
              </router-link>
          </template>
          <template v-slot:body>
            <b-row class = "ml-2">
                <b-col md="12">
                  <b-form-group label="Descripción">
                  <b-form-input
                    v-model.trim="$v.form.name.$model"
                    :state="!$v.form.name.$error"
                    placeholder="Ingresar descripción de partida"
                  ></b-form-input>
                  <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
                    Debe ingresar la descripción
                  </div>
                </b-form-group>
                </b-col>
            </b-row>
            <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Fecha de partida:">
                  <b-form-input
                    type="date"
                    v-model.trim="$v.form.fecha.$model"
                    :state="!$v.form.fecha.$error"
                    placeholder="Ingresar fecha"
                  ></b-form-input>
                  <div v-if="$v.form.fecha.required.$invalid" class="invalid-feedback">
                    Debe ingresar la fecha
                  </div>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Área de destino:">
                  <v-select
                    name="destino"
                    v-model="$v.form.destino.$model"
                    :state="!$v.form.destino.$error"
                    :options="destinos"
                    :filterable="false"
                    placeholder="Seleccione el área de destino"
                    @search="onSearch"
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
                </b-form-group>

              </b-col>
              <b-col md="2">
                <b-form-radio v-model="form.tipo" value="APERTURA" name="customRadio1">Apertura</b-form-radio>
                <b-form-radio v-model="form.tipo" value="NORMAL" name="customRadio1">Normal</b-form-radio>
                <b-form-radio v-model="form.tipo" value="CIERRE" name="customRadio1">Cierre</b-form-radio>
                <b-form-radio v-model="form.tipo" value="AJUSTE" name="customRadio1">Ajuste</b-form-radio>
              </b-col>
              <b-col md="3">
                <b-form-radio v-model="form.moneda" value="QUETZALES" name="customRadio2">Quetzales</b-form-radio>
                <b-form-radio v-model="form.moneda" value="DÓLARES" name="customRadio2">Dólares</b-form-radio>
                <b-form-group label="Tasa de cambio:" v-if="form.moneda === 'DÓLARES'">
                  <b-form-input

                    v-if="form.moneda === 'DÓLARES'"
                    type="number"
                    v-model.trim="form.tasa"
                    placeholder="Tasa de cambio"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- <b-row class="ml-2">
              <b-col md="4">
                <b-form-group label="Nomenclatura/rubro:">
                  <v-select
                    name="nomenclatura"
                    v-model="form.nomenclatura"
                    :options="nomenclaturas"
                    :filterable="false"
                    placeholder="Seleccione la nomenclatura"
                    @search="onSearchNomenclatura"
                  >
                    <template v-slot:spinner="{ loading }">
                      <div v-show="loading">Cargando...</div>
                    </template>
                    <template v-slot:option="option">
                      {{ option.codigo + ' - ' + option.nombre }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ option.codigo + ' - ' + option.nombre }}
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Debe:">
                  <b-form-input
                    type="number"
                    v-model.trim="form.debe"
                    placeholder="Ingresar Debe"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Haber:">
                  <b-form-input
                    type="number"
                    v-model.trim="form.haber"
                    placeholder="Ingresar Haber"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group label="Acciones:">
                  <b-button  variant="success" @click="addDetail()"
                    >+</b-button
                  >
                </b-form-group>

              </b-col>
            </b-row> -->
            <!-- Aqui comenzar con detalles -->
            <br>
            <br>
            <table class="table table-hover product_item_list c_table theme-color mb-0">
              <thead>
                  <tr>
                      <!-- <th>Acciones</th> -->
                      <th>Nomenclatura</th>
                      <th>Debe</th>
                      <th>Haber</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="details in arrayDetalles" :key="details.id">
                    <!-- <td>
                        <template>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteDetail(details.id, details)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </template>
                    </td> -->
                    <td v-text="details.nomenclatura.nombre"></td>
                    <td> {{ formatQuetzales(details.debe) }}</td>
                    <td> {{ formatQuetzales(details.haber) }}</td>
                  </tr>
              </tbody>
            </table>
            <br>
            <br>
            <table class="table table-hover product_item_list c_table theme-color mb-0" v-if="arrayDetalles.length > 0">
              <thead>
                  <tr>
                      <th>Total Debe: </th>
                      <th>{{ formatQuetzales(form.total_debe) }}</th>
                      <th>Total Haber: </th>
                      <th>{{ formatQuetzales(form.total_haber)}}</th>
                  </tr>
              </thead>
            </table>
            <!-- <b-button variant="warning" v-if="arrayDetalles.length > 0" @click="onValidateAll()">AGREGAR PARTIDA</b-button> -->
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
  name: 'EditPartida',
  components: {
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
  },
  beforeMount () {
    // console.log(this.id)
    console.log(this.$route.params.id)
    // this.form.name = 'Partida correspondiente a '
    this.getPartida(this.$route.params.id)
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
      id_usuario: 0,
      form: {
        id: 0,
        name: '',
        tipo: 'NORMAL',
        fecha: null,
        destino: null,
        debe: 0,
        haber: 0,
        nomenclatura: null,
        moneda: 'QUETZALES',
        total_debe: 0.0,
        total_haber: 0.0,
        tasa: null
      },
      destinos: [],
      nomenclaturas: [],
      arrayDetalles: [],
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
        integerLimit: 10,
        allowNegative: false,
        allowLeadingZeroes: false
      })
    }
  },
  validations () {
    return {
      form: {
        tipo: {
          required
        },
        name: {
          required
        },
        fecha: {
          required
        },
        destino: {
          required
        },
        moneda: {
          required
        },
        total_debe: {
          required
        },
        total_haber: {
          required
        }
      }
    }
  },
  methods: {
    addDetail () {
      let me = this
      let insertar = {
        nomenclatura: me.form.nomenclatura,
        debe: me.form.debe,
        haber: me.form.haber
      }
      if (insertar.nomenclatura === null) {
        me.alertVariant = 'danger'
        me.showAlertError()
        me.alertText = 'Ingrese una nomenclatura'
      } else if (parseFloat(insertar.debe) === parseFloat(insertar.haber)) {
        me.alertVariant = 'danger'
        me.showAlertError()
        me.alertText = 'Ingrese una cantidad en debe o haber'
      } else {
        me.form.total_debe += parseFloat(insertar.debe)
        me.form.total_haber += parseFloat(insertar.haber)
        me.arrayDetalles.push(insertar)
        me.clearData()
      }
    },
    clearData () {
      let me = this
      me.form.nomenclatura = null
      me.form.debe = 0.0
      me.form.haber = 0.0
    },
    deleteDetail (id, details) {
      let me = this
      if (details.debe === 0) {
        me.form.total_haber -= parseFloat(details.haber)
      } else if (details.haber === 0) {
        me.form.total_debe -= parseFloat(details.debe)
      }

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
      // Agregar validacion
    },
    onValidateAll () {
      this.$v.$touch()
      this.id_usuario = this.currentUser.id
      if (this.$v.$error !== true) {
        if (this.form.total_debe === this.form.total_haber) {
          this.onSave()
        } else {
          this.alertText = 'La suma total de DEBE y HABER no cuadra'
          this.showAlertError()
        }
      } else {
        if (this.form.fecha === null) {
          this.alertText = 'No se ha ingresado fecha'
          this.showAlertError()
        }
        if (this.form.destino === null) {
          this.alertText = 'No se ha ingresado área de destino'
          this.showAlertError()
        }
      }
    },
    setData (data) {

    },
    resetData () {
      this.form.tipo = 'NORMAL'
      this.form.total_debe = 0
      this.form.total_haber = 0
      this.form.tasa = null
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/partidas/create', {
        cabecera: me.form,
        detalle: me.arrayDetalles,
        id_usuario: me.id_usuario
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = response.data.msg
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
    onSearch (search, loading) {
      if (search) {
        loading(true)
        this.searching(search, loading)
      }
    },
    onSearchNomenclatura (search, loading) {
      if (search) {
        loading(true)
        this.searchingNomenclatura(search, loading)
      }
    },
    formatQuetzales (amount) {
      let num = parseFloat(amount)
      let formatted
      let devolver
      formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      if (this.form.moneda === 'QUETZALES') {
        devolver = amount = 'Q ' + formatted
      } else if (this.form.moneda === 'DÓLARES') {
        devolver = amount = '$ ' + formatted
      }
      return devolver
    },
    formatDolares (amount) {
      let num = parseFloat(amount)
      let formatted
      formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      return (amount = '$ ' + formatted)
    },
    searching (search, loading) {
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
    searchingNomenclatura (search, loading) {
      axios.get(apiUrl + '/nomenclatura/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.nomenclaturas = response.data
        loading(false)
      })
    },
    getPartida (id) {
      console.log('enviando')
      axios.get(apiUrl + '/partidas/find',
        {
          params: {
            id: id
          }
        }
      ).then(response => {
        let data = response.data
        console.log(data)
        // id: 0,
        // name: '',
        // tipo: 'NORMAL',
        // fecha: null,
        // destino: null,
        // debe: 0,
        // haber: 0,
        // nomenclatura: null,
        // moneda: 'QUETZALES',
        // total_debe: 0.0,
        // total_haber: 0.0,
        // tasa: null
        this.form.id = data.id
        this.form.name = data.descripcion
        this.form.tipo = data.tipo
        this.form.fecha = data.fecha
        this.form.moneda = data.moneda
        this.arrayDetalles = data.detalle_partidas.map(detail => {
          if (detail.posicion === 'DEBE') {
            this.form.total_debe += parseFloat(detail.cantidad)
            return {
              nomenclatura: detail.nomenclatura,
              debe: detail.cantidad,
              haber: 0
            }
          } else {
            this.form.total_haber += parseFloat(detail.cantidad)
            return {
              nomenclatura: detail.nomenclatura,
              debe: 0,
              haber: detail.cantidad
            }
          }
        })

        // this.form.destino =
      })
    }
  }
}
</script>
