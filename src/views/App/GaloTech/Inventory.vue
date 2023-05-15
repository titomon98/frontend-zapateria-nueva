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
    <b-modal id="modal-1-inventory" ref="modal-1-inventory" size="xl" title="Agregar al inventario">
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
         <b-form-group label="Equipo:">
          <v-select
            name="equipment"
            v-model="$v.form.equipment.$model"
            :state="!$v.form.equipment.$error"
            :options="equipments"
            :filterable="false"
            placeholder="Seleccione el equipo"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ 'Nombre: '+ option.nombre +' Código: '+ option.codigo +  ' Tipo: ' + option.tipo_equipo.nombre }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ 'Nombre: '+ option.nombre +' Código: '+ option.codigo +  ' Tipo: ' + option.tipo_equipo.nombre }}
            </template>
          </v-select>
          <div v-if="$v.form.equipment.$error" class="invalid-feedback-vselect">
            Debe seleccionar el equipo
          </div>
         </b-form-group>
        <b-form-group label="Existencia:">
          <b-form-input
            v-model.trim="$v.form.stock.$model"
            :state="!$v.form.stock.$error"
            placeholder="Ingresar existencias"
          ></b-form-input>
          <div v-if="$v.form.stock.required.$invalid" class="invalid-feedback">
            Debe ingresar la existencia
          </div>
        </b-form-group>
        <b-form-group label="Existencia minima:">
          <b-form-input
            v-model.trim="$v.form.minimalStock.$model"
            :state="!$v.form.minimalStock.$error"
            placeholder="Ingresar la existencia minima"
          ></b-form-input>
          <div v-if="$v.form.minimalStock.required.$invalid" class="invalid-feedback">
            Debe ingresar la existencia minima
          </div>
        </b-form-group>
        <b-form-group label="Precio costo:">
           <masked-input
            v-model.trim="$v.form.costPrice.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el precio costo"
            class="form-control"
          />
          <div v-if="$v.form.costPrice.$error" class="invalid-feedback-vselect">
            Debe ingresar el precio
          </div>
        </b-form-group>
        <b-form-group label="Precio publico:">
          <masked-input
            v-model.trim="$v.form.publicPrice.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el precio público"
            class="form-control"
          />
          <div v-if="$v.form.publicPrice.$error" class="invalid-feedback-vselect">
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
    <b-modal id="modal-2-inventory" ref="modal-2-inventory" size="xl" title="Editar inventario">
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
         <b-form-group label="Equipo:">
          <v-select
            name="equipment"
            v-model="$v.form.equipment.$model"
            :state="!$v.form.equipment.$error"
            :options="equipments"
            :filterable="false"
            placeholder="Seleccione el equipo"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ 'Nombre: '+ option.nombre +' Código: '+ option.codigo +  ' Tipo: ' + option.tipo_equipo.nombre }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ 'Nombre: '+ option.nombre +' Código: '+ option.codigo +  ' Tipo: ' + option.tipo_equipo.nombre }}
            </template>
          </v-select>
          <div v-if="$v.form.equipment.$error" class="invalid-feedback-vselect">
            Debe seleccionar el equipo
          </div>
         </b-form-group>
        <b-form-group label="Existencia:">
          <b-form-input
            v-model.trim="$v.form.stock.$model"
            :state="!$v.form.stock.$error"
            placeholder="Ingresar existencias"
          ></b-form-input>
          <div v-if="$v.form.stock.required.$invalid" class="invalid-feedback">
            Debe ingresar la existencia
          </div>
        </b-form-group>
        <b-form-group label="Existencia minima:">
          <b-form-input
            v-model.trim="$v.form.minimalStock.$model"
            :state="!$v.form.minimalStock.$error"
            placeholder="Ingresar la existencia minima"
          ></b-form-input>
          <div v-if="$v.form.minimalStock.required.$invalid" class="invalid-feedback">
            Debe ingresar la existencia minima
          </div>
        </b-form-group>
        <b-form-group label="Precio costo:">
           <masked-input
            v-model.trim="$v.form.costPrice.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el precio costo"
            class="form-control"
          />
          <div v-if="$v.form.costPrice.$error" class="invalid-feedback-vselect">
            Debe ingresar el precio
          </div>
        </b-form-group>
        <b-form-group label="Precio publico:">
          <masked-input
            v-model.trim="$v.form.publicPrice.$model"
            :mask="mask_quetzal"
            :guide="false"
            :keep-char-positions="true"
            :show-mask="true"
            type="text"
            placeholder="Ingresar el precio público"
            class="form-control"
          />
          <div v-if="$v.form.publicPrice.$error" class="invalid-feedback-vselect">
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
    <b-modal id="modal-3-inventory" ref="modal-3-inventory" title="Desactivar del inventario">
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
        ¿Desea desactivar del inventario: {{ form.equipment.nombre }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-inventory')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-inventory')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-inventory" ref="modal-4-inventory" title="Activar del inventario">
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
        ¿Desea activar del inventario: {{ form.equipment.nombre }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-inventory')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-inventory')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Inventario</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-inventory>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-inventory
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
                        ? $bvModal.show('modal-3-inventory')
                        : $bvModal.show('modal-4-inventory');
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

export default {
  name: 'Inventory',
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
        stock: '',
        minimalStock: '',
        costPrice: '',
        publicPrice: '',
        equipment: [],
        state: 1
      },
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'codigo', nombre: 'Código' }
        // { value: 'precio_costo', nombre: 'Precio Costo' },
        // { value: 'precio_publico', nombre: 'Precio publico' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      equipments: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/inventario_galo_tech/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'equipo_galo_tech',
          sortField: 'equipo_galo_tech',
          title: 'Equipo',
          dataClass: 'list-item-heading',
          callback: function (value) {
            return value.nombre + ' | Código: ' + value.codigo + ' | Tipo: ' + value.tipo_equipo.nombre
          },
          width: '20%'
        },
        {
          name: 'existencia',
          sortField: 'existence',
          title: 'Existencia',
          dataClass: 'list-item-heading'
        },
        {
          name: 'existencia_minima',
          sortField: 'minimalExistence',
          title: 'Existencia minima',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_costo',
          sortField: 'costPrice',
          title: 'Precio costo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_publico',
          sortField: 'publicPrice',
          title: 'Precio publico',
          dataClass: 'list-item-heading'
        },
        {
          name: '__slot:estado',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted'
        }
      ],
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
      form: {
        stock: {
          required
        },
        minimalStock: {
          required
        },
        costPrice: {
          required
        },
        publicPrice: {
          required
        },
        equipment: {
          required
        }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.stock = ''
          this.form.minimalStock = ''
          this.form.costPrice = ''
          this.form.publicPrice = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-inventory'].hide()
          this.form.id = 0
          this.form.stock = ''
          this.form.minimalStock = ''
          this.form.costPrice = ''
          this.form.publicPrice = ''
          this.form.state = 1
          this.form.equipment = []
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-inventory'].hide()
          this.form.id = 0
          this.form.stock = ''
          this.form.minimalStock = ''
          this.form.costPrice = ''
          this.form.publicPrice = ''
          this.form.state = 1
          this.form.equipment = []
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
      this.form.stock = data.existencia
      this.form.minimalStock = data.existencia_minima
      this.form.costPrice = data.precio_costo
      this.form.publicPrice = data.precio_publico
      this.form.equipment = data.equipo_galo_tech
      this.form.id = data.id
      this.form.state = data.estado
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/inventario_galo_tech/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el inventario ' + me.form.equipment.nombre + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          console.log('error')
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
      axios.put(apiUrl + '/inventario_galo_tech/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el inventario ' + me.form.equipment.nombre + ' exitosamente'
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
          .put(apiUrl + '/inventario_galo_tech/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el inventario ' + me.form.equipment.nombre + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-inventory'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/inventario_galo_tech/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el inventario ' + me.form.equipment.nombre + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-inventory'].hide()
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
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searching (search, loading) {
      axios.get(apiUrl + '/equipo_galo_tech/getSearch',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.equipments = response.data
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
