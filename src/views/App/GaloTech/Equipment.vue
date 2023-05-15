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
    <b-modal id="modal-1-equipment" ref="modal-1-equipment" title="Agregar equipo">
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
        <b-form-group label="Tipo:">
            <v-select
              name="medicationType"
              v-model="$v.form.type.$model"
              :state="!$v.form.type.$error"
              :options="types"
              label="nombre"
              placeholder="Seleccione el tipo de equipo"
            />
          <div v-if="$v.form.type.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de equipo
          </div>
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre del equipo"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre del equipo
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.code.$model"
            :state="!$v.form.code.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vue-barcode
            :value="form.code"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vue-barcode>
          <div v-if="$v.form.code.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
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
    <b-modal id="modal-2-equipment" ref="modal-2-equipment" title="Editar equipo">
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
        <b-form-group label="Tipo:">
            <v-select
              name="medicationType"
              v-model="$v.form.type.$model"
              :state="!$v.form.type.$error"
              :options="types"
              label="nombre"
              placeholder="Seleccione el tipo de equipo"
            />
          <div v-if="$v.form.type.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de equipo
          </div>
        </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre del equipo"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre del equipo
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.code.$model"
            :state="!$v.form.code.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vue-barcode
            :value="form.code"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vue-barcode>
          <div v-if="$v.form.code.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
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
    <b-modal id="modal-3-equipment" ref="modal-3-equipment" title="Desactivar equipo">
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
        ¿Desea desactivar el equipo: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-equipment')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-equipment')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-equipment" ref="modal-4-equipment" title="Activar equipo">
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
        ¿Desea activar el equipo: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-equipment')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-equipment')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Equipo galo tech</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-equipment>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-equipment
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
                        ? $bvModal.show('modal-3-equipment')
                        : $bvModal.show('modal-4-equipment');
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
import VueBarcode from 'vue-barcode'

export default {
  name: 'Medicine',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    'vue-barcode': VueBarcode
  },
  setup () {
    return { $v: useVuelidate() }
  },
  beforeMount () {
    axios.get(apiUrl + '/tipo_equipo/get').then((response) => {
      this.types = response.data
    })
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
        type: [],
        id: 0,
        name: '',
        code: '',
        state: 1
      },
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'codigo', nombre: 'Código' },
        { value: 'Tipo', nombre: 'Tipo' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      brands: [],
      types: [],
      presentations: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/equipo_galo_tech/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nombre',
          sortField: 'name',
          title: 'Nombre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'codigo',
          sortField: 'code',
          title: 'Codigo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'existencia_total',
          sortField: 'existencia_total',
          title: 'Existencia Total',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_equipo.nombre',
          sortField: 'tipo_equipo.nombre',
          title: 'Tipo de equipo',
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
        name: { required },
        code: { required },
        type: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.name = ''
          this.form.code = ''
          this.form.state = 1
          this.form.type = []
          break
        }
        case 'code': {
          this.form.code = ''
          var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          var charactersLength = characters.length
          for (var i = 0; i < 10; i++) {
            this.form.code += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            )
          }
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-equipment'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.code = ''
          this.form.existence = ''
          this.form.state = 1
          this.form.type = []
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-equipment'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.type = []
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
      this.form.name = data.nombre
      this.form.state = data.estado
      this.form.id = data.id
      this.form.code = data.codigo
      this.form.type = data.tipo_equipo
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/equipo_galo_tech/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el equipo ' + me.form.name + ' exitosamente'
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
      axios.put(apiUrl + '/equipo_galo_tech/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el equipo ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/equipo_galo_tech/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el equipo ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-equipment'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/equipo_galo_tech/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el equipo ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-equipment'].hide()
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
    }
  }
}
</script>
