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
    <b-modal id="modal-1-zapatos" size="lg" ref="modal-1-zapatos" title="Agregar zapato">
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
        <b-form-group label="Estilo:">
          <b-form-input
            v-model.trim="$v.form.estilo.$model"
            :state="!$v.form.estilo.$error"
            placeholder="Ingresar estilo del zapato"
          ></b-form-input>
          <div v-if="$v.form.estilo.required.$invalid" class="invalid-feedback">
            Debe ingresar el estilo
          </div>
        </b-form-group>
        <b-form-group label="Características:">
          <b-form-input
            v-model.trim="$v.form.caracteristicas.$model"
            :state="!$v.form.caracteristicas.$error"
            placeholder="Ingresar caracteristicas del zapato"
          ></b-form-input>
          <div v-if="$v.form.caracteristicas.required.$invalid" class="invalid-feedback">
            Debe ingresar caracteristicas
          </div>
        </b-form-group>
        <b-row>
          <b-col md="3">
            <b-form-group label="Precio costo:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_costo"
                placeholder="Ingresar precio costo"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio venta:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_venta"
                placeholder="Ingresar precio venta"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio mínimo:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_minimo"
                placeholder="Ingresar precio mínimo"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio mayorista:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_mayorista"
                placeholder="Ingresar precio mayorista"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group label="Color:">
              <v-select
                name="colores"
                v-model="form.color"
                :options="colores"
                :filterable="false"
                placeholder="Seleccione el color"
                @search="onSearchColors"
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
            <b-form-group label="Marca:">
              <v-select
                name="marcas"
                v-model="form.marca"
                :options="marcas"
                :filterable="false"
                placeholder="Seleccione la marca"
                @search="onSearchMarcas"
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
            <b-form-group label="Clasificaciones:">
              <v-select
                name="clasificaciones"
                v-model="form.clasificacion"
                :options="clasificaciones"
                :filterable="false"
                placeholder="Seleccione la clasificacion"
                @search="onSearchClasificaciones"
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
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="File">
              <b-form-file
                v-model="image"
                accept="image/*"
                placeholder="Subir una imagen..."
                drop-placeholder="Suelta una imagen aquí..."></b-form-file>
            </b-form-group>
          </b-col>
          <b-col cols="12" class="text-center">
            <div v-if="form.base64.length>0">
              <h5>Imágenes seleccionadas:</h5>
              <div v-for="(item, index) in form.base64" :key="index">
              <img :src="item" alt="Image preview" class="img-preview"/>
            </div>
            </div>
          </b-col>
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
    <b-modal id="modal-2-zapatos" size="lg" ref="modal-2-zapatos" title="Editar zapato">
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
        <b-form-group label="Estilo:">
          <b-form-input
            v-model.trim="$v.form.estilo.$model"
            :state="!$v.form.estilo.$error"
            placeholder="Ingresar estilo del zapato"
          ></b-form-input>
          <div v-if="$v.form.estilo.required.$invalid" class="invalid-feedback">
            Debe ingresar el estilo
          </div>
        </b-form-group>
        <b-form-group label="Características:">
          <b-form-input
            v-model.trim="$v.form.caracteristicas.$model"
            :state="!$v.form.caracteristicas.$error"
            placeholder="Ingresar caracteristicas del zapato"
          ></b-form-input>
          <div v-if="$v.form.caracteristicas.required.$invalid" class="invalid-feedback">
            Debe ingresar caracteristicas
          </div>
        </b-form-group>
        <b-row>
          <b-col md="3">
            <b-form-group label="Precio costo:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_costo"
                placeholder="Ingresar precio costo"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio venta:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_venta"
                placeholder="Ingresar precio venta"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio mínimo:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_minimo"
                placeholder="Ingresar precio mínimo"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Precio mayorista:">
              <b-form-input
                type="number"
                v-model.trim="form.precio_mayorista"
                placeholder="Ingresar precio mayorista"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group label="Color:">
              <v-select
                name="colores"
                v-model="form.color"
                :options="colores"
                :filterable="false"
                placeholder="Seleccione el color"
                @search="onSearchColors"
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
            <b-form-group label="Marca:">
              <v-select
                name="marcas"
                v-model="form.marca"
                :options="marcas"
                :filterable="false"
                placeholder="Seleccione la marca"
                @search="onSearchMarcas"
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
            <b-form-group label="Clasificaciones:">
              <v-select
                name="clasificaciones"
                v-model="form.clasificacion"
                :options="clasificaciones"
                :filterable="false"
                placeholder="Seleccione la clasificacion"
                @search="onSearchClasificaciones"
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
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="info" @click="onValidate('update-all')"
          >Guardar todos</b-button
        >
        <b-button variant="primary" @click="onValidate('update')"
          >Guardar individual</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-zapatos" ref="modal-3-zapatos" title="Desactivar zapato">
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
        ¿Desea desactivar el zapato: {{ form.estilo }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-zapatos')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-zapatos')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-zapatos" ref="modal-4-zapatos" title="Activar zapato">
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
        ¿Desea activar el zapato: {{ form.estilo }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-zapatos')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-zapatos')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Zapatos</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
            <b-button variant="primary"  v-b-modal.modal-1-zapatos>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-zapatos
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
                        ? $bvModal.show('modal-3-zapatos')
                        : $bvModal.show('modal-4-zapatos');
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
  name: 'Zapatos',
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
      image: null,
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      colores: [],
      marcas: [],
      clasificaciones: [],
      form: {
        id: 0,
        estilo: '',
        caracteristicas: '',
        precio_costo: '',
        precio_venta: '',
        precio_minimo: '',
        precio_mayorista: '',
        color: null,
        marca: null,
        clasificacion: null,
        state: 1,
        base64: []
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
  watch: {
    image (newVal, oldVal) {
      if (newVal) {
        this.createBase64Image(newVal)
      } else {
        this.form.base64 = null
      }
    }
  },
  validations () {
    return {
      form: {
        estilo: { required },
        caracteristicas: { required }
      }
    }
  },
  methods: {
    createBase64Image (FileObject) {
      const reader = new FileReader()
      reader.onload = (event) => {
        this.form.base64.append(event.target.result)
        console.log(event.target.result)
      }
      reader.readAsDataURL(FileObject)
    },
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.estilo = ''
          this.form.caracteristicas = ''
          this.form.precio_costo = ''
          this.form.precio_venta = ''
          this.form.precio_minimo = ''
          this.form.precio_mayorista = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-zapatos'].hide()
          this.form.id = 0
          this.form.estilo = ''
          this.form.caracteristicas = ''
          this.form.precio_costo = ''
          this.form.precio_venta = ''
          this.form.precio_minimo = ''
          this.form.precio_mayorista = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-zapatos'].hide()
          this.form.id = 0
          this.form.estilo = ''
          this.form.caracteristicas = ''
          this.form.precio_costo = ''
          this.form.precio_venta = ''
          this.form.precio_minimo = ''
          this.form.precio_mayorista = ''
          this.form.state = 1
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
      console.log(data)
      this.form.estilo = data.estilo
      this.form.caracteristicas = data.caracteristicas
      this.form.precio_costo = data.precio_costo
      this.form.precio_venta = data.precio_venta
      this.form.precio_minimo = data.precio_minimo
      this.form.precio_mayorista = data.precio_mayorista
      this.form.state = data.estado
      this.form.color = data.colore
      this.form.marca = data.marca
      this.form.clasificacion = data.clasificacione
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/zapatos/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el zapato ' + me.form.estilo + ' exitosamente'
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
      axios.put(apiUrl + '/zapatos/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el zapato ' + me.form.estilo + ' exitosamente'
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
          .put(apiUrl + '/zapatos/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el zapato ' + me.form.estilo + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-zapatos'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/zapatos/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el zapato ' + me.form.estilo + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-zapatos'].hide()
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
    searchingClasificaciones (search, loading) {
      axios.get(apiUrl + '/clasificaciones/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.clasificaciones = response.data
        loading(false)
      })
    },
    onSearchClasificaciones (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingClasificaciones(search, loading)
      }
    },
    searchingColors (search, loading) {
      axios.get(apiUrl + '/colores/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.colores = response.data
        loading(false)
      })
    },
    onSearchColors (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingColors(search, loading)
      }
    },
    searchingMarcas (search, loading) {
      axios.get(apiUrl + '/marcas/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.marcas = response.data
        loading(false)
      })
    },
    onSearchMarcas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingMarcas(search, loading)
      }
    }
  }
}
</script>
<style scoped>
.mt-3 {
  margin-top: 1rem;
}
.p-3 {
  padding: 1rem;
}
.bg-light {
  background-color: #f8f9fa !important;
}
.border {
  border: 1px solid #dee2e6 !important;
}
.rounded {
  border-radius: .25rem !important;
}
.img-preview {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
}
</style>
