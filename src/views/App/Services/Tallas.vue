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
    <b-modal id="modal-1-tallas" size="lg" ref="modal-1-tallas" title="Agregar tallas">
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
        <b-row class="ml-2">
          <b-col md="4">
            <b-form-group label="Tienda:">
              <v-select
                name="tienda"
                v-model="form.tienda"
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
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-radio v-model="form.corrida" value="PRIMERA" name="customRadio1">Primera corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="SEGUNDA" name="customRadio1">Segunda corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="TERCERA" name="customRadio1">Tercera corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="CUARTA1" name="customRadio1">Cuarta corrida dama</b-form-radio>
            <b-form-radio v-model="form.corrida" value="CUARTA2" name="customRadio1">Cuarta corrida caballero</b-form-radio>
            <b-form-radio v-model="form.corrida" value="QUINTA" name="customRadio1">Quinta corrida caballero</b-form-radio>
          </b-col>
          <b-col md="4">
            <b-button  variant="dark" @click="addTallas()"
              >Generar tallas</b-button
            >
          </b-col>
        </b-row>
        <b-row class="ml-2">
          <br>
          <br>
          <table class="table table-hover product_item_list c_table theme-color mb-0">
            <thead>
                <tr>
                    <th>Talla</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="details in corridas" :key="details.id">
                  <td v-text="details.talla"></td>
                  <td>
                    <b-form-input
                      v-model="details.cantidad"
                      placeholder="Ingresar cantidad"
                    ></b-form-input>
                  </td>
                </tr>
            </tbody>
          </table>
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidate('save')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2-tallas" ref="modal-2-tallas" size="lg" title="Ver tallas">
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
        <b-col md="6">
          <b-form-group label="Estilo:">
            <h6>{{ form.estilo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Color:">
            <h6>{{ form.color }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col md="6">
          <b-form-group label="Precio costo:">
            <h6>{{ form.precio_costo }}</h6>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Precio venta:">
            <h6>{{ form.precio_venta }}</h6>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="ml-2">
          <br>
          <br>
          <table class="table table-hover product_item_list c_table theme-color mb-0">
            <thead>
                <tr>
                    <th>Talla</th>
                    <th>Código</th>
                    <th>Cantidad en existencia</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="details in tallas" :key="details.id">
                  <td v-text="details.talla"></td>
                  <td v-text="details.codigo"></td>
                  <td v-text="details.cantidad"></td>
                </tr>
            </tbody>
          </table>
        </b-row>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal('close')"
          >Cerrar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-tallas" ref="modal-3-tallas" title="Desactivar talla">
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
        ¿Desea desactivar la talla: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-tallas')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-tallas')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-tallas" ref="modal-4-tallas" title="Activar talla">
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
        ¿Desea activar la talla: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-tallas')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-tallas')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Tallas</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
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
                    v-b-tooltip.top="'Ver tallas'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-2-tallas
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-eye'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Agregar tallas'"
                    @click="setData(props.rowData)"
                    v-b-modal.modal-1-tallas
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-plus'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="
                      props.rowData.estado == 1 ? 'Desactivar' : 'Activar'"
                    @click="
                      setData(props.rowData);
                      props.rowData.estado == 1
                        ? $bvModal.show('modal-3-tallas')
                        : $bvModal.show('modal-4-tallas');
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

export default {
  name: 'Tallas',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
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
      corridas: [],
      tiendas: [],
      tallas: [],
      form: {
        id: 0,
        estilo: '',
        corrida: 'PRIMERA',
        tienda: null,
        state: 1,
        precio_costo: '',
        precio_venta: '',
        color: ''
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/zapatos/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'estilo',
          sortField: 'estilo',
          title: 'Estilo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_costo',
          sortField: 'precio_costo',
          title: 'Costo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_venta',
          sortField: 'precio_venta',
          title: 'Precio venta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_minimo',
          sortField: 'precio_minimo',
          title: 'Precio minimo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_mayorista',
          sortField: 'precio_mayorista',
          title: 'Precio mayorista',
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
        corrida: { required }
      }
    }
  },
  methods: {
    addTallas () {
      let me = this
      if (me.form.corrida === 'PRIMERA') {
        me.corridas = [
          { id: 1, talla: '14', cantidad: 0 },
          { id: 2, talla: '15', cantidad: 0 },
          { id: 3, talla: '16', cantidad: 0 },
          { id: 4, talla: '17', cantidad: 0 },
          { id: 5, talla: '18', cantidad: 0 },
          { id: 6, talla: '19', cantidad: 0 },
          { id: 7, talla: '20', cantidad: 0 },
          { id: 8, talla: '21', cantidad: 0 }
        ]
      } else if (me.form.corrida === 'SEGUNDA') {
        me.corridas = [
          { id: 1, talla: '22', cantidad: 0 },
          { id: 2, talla: '23', cantidad: 0 },
          { id: 3, talla: '24', cantidad: 0 },
          { id: 4, talla: '25', cantidad: 0 },
          { id: 5, talla: '26', cantidad: 0 }
        ]
      } else if (me.form.corrida === 'TERCERA') {
        me.corridas = [
          { id: 1, talla: '27', cantidad: 0 },
          { id: 2, talla: '28', cantidad: 0 },
          { id: 3, talla: '29', cantidad: 0 },
          { id: 4, talla: '30', cantidad: 0 },
          { id: 5, talla: '31', cantidad: 0 },
          { id: 6, talla: '32', cantidad: 0 }
        ]
      } else if (me.form.corrida === 'CUARTA1') {
        me.corridas = [
          { id: 1, talla: '33', cantidad: 0 },
          { id: 2, talla: '34', cantidad: 0 },
          { id: 3, talla: '35', cantidad: 0 },
          { id: 4, talla: '36', cantidad: 0 },
          { id: 5, talla: '37', cantidad: 0 },
          { id: 6, talla: '38', cantidad: 0 },
          { id: 7, talla: '39', cantidad: 0 },
          { id: 8, talla: '40', cantidad: 0 }
        ]
      } else if (me.form.corrida === 'CUARTA2') {
        me.corridas = [
          { id: 1, talla: '33', cantidad: 0 },
          { id: 2, talla: '34', cantidad: 0 },
          { id: 3, talla: '35', cantidad: 0 },
          { id: 4, talla: '36', cantidad: 0 }
        ]
      } else if (me.form.corrida === 'QUINTA') {
        me.corridas = [
          { id: 1, talla: '37', cantidad: 0 },
          { id: 2, talla: '38', cantidad: 0 },
          { id: 3, talla: '39', cantidad: 0 },
          { id: 4, talla: '40', cantidad: 0 },
          { id: 5, talla: '41', cantidad: 0 },
          { id: 6, talla: '42', cantidad: 0 },
          { id: 7, talla: '43', cantidad: 0 },
          { id: 8, talla: '44', cantidad: 0 }
        ]
      }
    },
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.name = ''
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-tallas'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          break
        }
        case 'close': {
          this.$v.$reset()
          this.$refs['modal-2-tallas'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          this.tallas = []
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
      this.form.estilo = data.estilo
      this.form.precio_costo = data.precio_costo
      this.form.precio_venta = data.precio_venta
      this.form.state = data.estado
      this.form.color = data.colore.nombre
      this.form.id = data.id
      this.getTallas(data.id)
    },
    onSave () {
      const me = this
      axios.post(apiUrl + '/tallas/create', {
        form: me.form,
        corridas: me.corridas
      })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la talla ' + me.form.name + ' exitosamente'
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
    onUpdate () {
      const me = this
      // this.$refs["modalSave"].hide();
      axios.put(apiUrl + '/tallas/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la talla ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/tallas/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la talla ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-tallas'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/tallas/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado la talla ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-tallas'].hide()
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
    onSearchTiendas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingTiendas(search, loading)
      }
    },
    getTallas (id) {
      axios.get(apiUrl + '/tallas/get',
        {
          params: {
            id: id
          }
        }
      ).then((response) => {
        this.tallas = response.data
      })
    }
  }
}
</script>
