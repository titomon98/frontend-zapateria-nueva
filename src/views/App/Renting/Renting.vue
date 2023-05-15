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
    <b-modal id="modal-1-renting" ref="modal-1-renting" title="Agregar arrendamiento">
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
        <b-form-group label="Médico:">
          <v-select
            name="medic"
            v-model="$v.form.medic.$model"
            :state="!$v.form.medic.$error"
            :options="medics"
            :filterable="false"
            placeholder="Buscar doctor/a"
            @search="onSearch"
          >
          <template v-slot:spinner="{ loading }">
            <div v-show="loading">Cargando...</div>
          </template>
          <template v-slot:option="option">
            {{'Dr/Dra: '+ option.nombre +' '+ option.apellido + ' Colegiado: ' + option.colegiado +' Especialidad: '+ option.especialidade.nombre }}
          </template>
          <template slot="selected-option" slot-scope="option">
            {{'Dr/Dra: '+ option.nombre +' '+ option.apellido + ' Colegiado: ' + option.colegiado +' Especialidad: '+ option.especialidade.nombre }}
          </template>
          </v-select>
          <div v-if="$v.form.medic.$error" class="invalid-feedback-vselect">
            Debe seleccionar el médico
          </div>
         </b-form-group>
         <b-form-group label="Clínica:">
          <v-select
            name="clinic"
            v-model="$v.form.clinic.$model"
            :state="!$v.form.clinic.$error"
            :options="clinics"
            :filterable="false"
            placeholder="Buscar clinica"
            @search="onSearchClinic"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{'Clínica: '+ option.numero +' '+ ' Centro: '+ option.centro.nombre }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{'Clínica: '+ option.numero +' '+ ' Centro: '+ option.centro.nombre }}
            </template>
          </v-select>
          <div v-if="$v.form.clinic.$error" class="invalid-feedback-vselect">
            Debe seleccionar la clínica
          </div>
         </b-form-group>
         <b-form-group label="Inicio de contrato:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.start.$model"
            :state="!$v.form.start.$error"
            placeholder="Ingresar el inicio de contrato"
          ></b-form-input>
          <div v-if="$v.form.start.$error" class="invalid-feedback-vselect">
            Debe seleccionar el inicio
          </div>
        </b-form-group>
        <b-form-group label="Fin de contrato:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.end.$model"
            :state="!$v.form.end.$error"
            placeholder="Ingresar el fin de contrato"
          ></b-form-input>
          <div v-if="$v.form.end.$error" class="invalid-feedback-vselect">
            Debe seleccionar el fin
          </div>
        </b-form-group>
        <b-form-group label="Precio:">
          <masked-input
            v-model.trim="$v.form.price.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el monto a pagar"
            class="form-control"
          />
          <div v-if="$v.form.price.$error" class="invalid-feedback-vselect">
            Debe ingresar el precio
          </div>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('save')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2-renting" ref="modal-2-renting" title="Editar arrendamiento">
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
        <b-form-group label="Médico:">
          <v-select
            name="medic"
            v-model="$v.form.medic.$model"
            :state="!$v.form.medic.$error"
            :options="medics"
            :filterable="false"
            placeholder="Buscar doctor/a"
            @search="onSearch"
          >
          <template v-slot:spinner="{ loading }">
            <div v-show="loading">Cargando...</div>
          </template>
           <template v-slot:option="option">
            {{'Dr/Dra: '+ option.nombre +' '+ option.apellido + ' Colegiado: ' + option.colegiado +' Especialidad: '+ option.especialidade.nombre }}
          </template>
          <template slot="selected-option" slot-scope="option">
            {{'Dr/Dra: '+ option.nombre +' '+ option.apellido + ' Colegiado: ' + option.colegiado +' Especialidad: '+ option.especialidade.nombre }}
          </template>
          </v-select>
          <div v-if="$v.form.medic.$error" class="invalid-feedback-vselect">
            Debe seleccionar el médico
          </div>
         </b-form-group>
         <b-form-group label="Clínica:">
          <v-select
            name="clinic"
            v-model="$v.form.clinic.$model"
            :state="!$v.form.clinic.$error"
            :options="clinics"
            :filterable="false"
            placeholder="Buscar clinica"
            @search="onSearchClinic"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{'Clínica: '+ option.numero +' '+ ' Centro: '+ option.centro.nombre }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{'Clínica: '+ option.numero +' '+ ' Centro: '+ option.centro.nombre }}
            </template>
          </v-select>
          <div v-if="$v.form.clinic.$error" class="invalid-feedback-vselect">
            Debe seleccionar la clínica
          </div>
         </b-form-group>
         <b-form-group label="Inicio de contrato:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.start.$model"
            :state="!$v.form.start.$error"
            placeholder="Ingresar el inicio de contrato"
          ></b-form-input>
          <div v-if="$v.form.start.$error" class="invalid-feedback-vselect">
            Debe seleccionar el inicio
          </div>
        </b-form-group>
        <b-form-group label="Fin de contrato:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.end.$model"
            :state="!$v.form.end.$error"
            placeholder="Ingresar el fin de contrato"
          ></b-form-input>
          <div v-if="$v.form.end.$error" class="invalid-feedback-vselect">
            Debe seleccionar el fin
          </div>
        </b-form-group>
        <b-form-group label="Precio:">
          <masked-input
            v-model.trim="$v.form.price.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el monto a pagar"
            class="form-control"
          />
          <div v-if="$v.form.price.$error" class="invalid-feedback-vselect">
            Debe ingresar el precio
          </div>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('update')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-renting" ref="modal-3-renting" title="Desactivar arrendamiento">
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
        ¿Desea desactivar la clinica: {{ form.number }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-renting')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-renting')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-renting" ref="modal-4-renting" title="Activar arrendamiento">
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
        ¿Desea activar la clinica: {{ form.number }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-renting')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-renting')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Arrendamientos</h4>
              <div class="iq-search-bar mt-2">
                <div class="row">
                      <div class="col-sm">
                        <b-form action="#" class="searchbox">
                            <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                            <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                        </b-form>
                      </div>
                      <div class="col-sm">
                        <!-- <b-form-select plain v-model="selected3" :options="options3" size="sm" class="mb-3">
                          <template v-slot:first>
                            <b-form-select-option :value="1">Usuario</b-form-select-option>
                          </template>
                        </b-form-select> -->
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
            <b-button variant="primary"  v-b-modal.modal-1-renting>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-renting
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
                        ? $bvModal.show('modal-3-renting')
                        : $bvModal.show('modal-4-renting');
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
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import moment from 'moment'

export default {
  name: 'Renting',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    'masked-input': MaskedInput
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    axios.get(apiUrl + '/medic/get').then((response) => {
      this.centros = response.data
    })
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
        start: '',
        end: '',
        price: '',
        state: 1,
        clinic: [],
        medic: []
      },
      options: [
        { value: '1', nombre: 'Nombre Dr/a', val: 'nombre' },
        { value: '1', nombre: 'Apellido Dr/a', val: 'apellido' },
        { value: '1', nombre: 'Colegiado Dr/a', val: 'colegiado' },
        { value: '2', nombre: 'Clinica', val: 'clinica' }
      ],
      columna: { value: '1', nombre: 'Nombre Dr/a', val: 'nombre' },
      clinics: [],
      medics: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/arrendamiento/list',
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
      }),
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'inicio',
          sortField: 'inicio',
          title: 'Inicio',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return moment(value).format('DD/MM/YYYY')
          }
        },
        {
          name: 'fin',
          sortField: 'fin',
          title: 'Fin',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return moment(value).format('DD/MM/YYYY')
          }
        },
        {
          name: 'costo',
          sortField: 'costo',
          title: 'Costo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'medico',
          sortField: 'medico',
          title: 'Médico',
          titleClass: '',
          dataClass: 'list-item-heading',
          callback: function (value) {
            return value.nombre + ' ' + value.apellido + ' col: ' + value.colegiado + ' esp: ' + value.especialidade.nombre
          }
        },
        {
          name: 'clinica',
          sortField: 'clinica',
          title: 'Clinica',
          dataClass: 'list-item-heading',
          callback: function (value) {
            return value.numero + ' ' + value.centro.nombre
          }
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted'
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        start: { required },
        end: { required },
        price: { required },
        clinic: { required },
        medic: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.number = ''
          this.form.state = 1
          this.form.start = ''
          this.form.end = ''
          this.form.price = ''
          this.form.clinic = []
          this.form.medic = []
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-renting'].hide()
          this.form.id = 0
          this.form.number = ''
          this.form.state = 1
          this.form.start = ''
          this.form.end = ''
          this.form.price = ''
          this.form.clinic = []
          this.form.medic = []
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-renting'].hide()
          this.form.id = 0
          this.form.number = ''
          this.form.state = 1
          this.form.start = ''
          this.form.end = ''
          this.form.price = ''
          this.form.clinic = []
          this.form.medic = []
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
    setData (data) {
      this.form.start = data.inicio
      this.form.end = data.fin
      this.form.price = data.costo
      this.form.clinic = data.clinica
      this.form.medic = data.medico
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      me.converMaskToNumber(me.form.price)
      console.log(me.form)
      axios.post(apiUrl + '/arrendamiento/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la clinca ' + me.form.number + ' exitosamente'
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
    /* Guardar */
    onUpdate () {
      const me = this
      // this.$refs["modalSave"].hide();
      axios.put(apiUrl + '/arrendamiento/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la arrendamiento ' + me.form.number + ' exitosamente'
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
          .put(apiUrl + '/arrendamiento/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el arrendamiento ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-renting'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/arrendamiento/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado arrendamiento ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-renting'].hide()
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
          search: this.search,
          columna: this.columna.val
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.val
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
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searching (search, loading) {
      axios.get(apiUrl + '/medico/getSearch',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        console.log('medicos ', response.data)
        this.medics = response.data
        loading(false)
      })
    },
    onSearchClinic (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingClinic(search, loading)
      }
    },
    searchingClinic (search, loading) {
      axios.get(apiUrl + '/clinica/getSearch',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        console.log('clinicas ', response.data)
        this.clinics = response.data
        loading(false)
      })
    },
    converMaskToNumber (number) {
      console.log(number)
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
    }
  }
}
</script>
