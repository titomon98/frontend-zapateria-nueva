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
    <b-modal id="modal-1-bank" ref="modal-1-bank" title="Agregar movimiento bancario">
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
        <b-form-group label="Referencia:">
          <b-form-input
            v-model.trim="$v.form.referencia.$model"
            :state="!$v.form.referencia.$error"
            placeholder="Ingresar referencia del movimiento bancario"
          ></b-form-input>
          <div v-if="$v.form.referencia.required.$invalid" class="invalid-feedback">
            Debe ingresar la referencia
          </div>
        </b-form-group>
        <b-form-group label="Cantidad:">
          <b-form-input
            type="number"
            v-model.trim="$v.form.cantidad.$model"
            :state="!$v.form.cantidad.$error"
            placeholder="Ingresar cantidad del movimiento bancario"
          ></b-form-input>
          <div v-if="$v.form.cantidad.required.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad
          </div>
        </b-form-group>
        <b-form-group label="Cuentas:">
          <v-select
            name="cuentas"
            v-model="$v.form.cuenta_bancaria.$model"
            :state="!$v.form.cuenta_bancaria.$error"
            :options="cuentas"
            :filterable="false"
            placeholder="Seleccione la cuenta"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
          </v-select>
          <div v-if="$v.form.cuenta_bancaria.$error" class="invalid-feedback-vselect">
            Debe seleccionar la cuenta
          </div>
         </b-form-group>
        <b-row class="ml-2">
          <b-form-group label="Tipo de movimiento:">
            <b-col md="4">
              <b-form-radio v-model="form.tipo" value="DEBITO" name="customRadio2">Débito</b-form-radio>
            </b-col>
            <b-col md="4">
              <b-form-radio v-model="form.tipo" value="CREDITO" name="customRadio2">Crédito</b-form-radio>
            </b-col>
          </b-form-group>
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
    <b-modal id="modal-2-bank" ref="modal-2-bank" title="Editar movimiento">
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
        <b-form-group label="Referencia:">
          <b-form-input
            v-model.trim="$v.form.referencia.$model"
            :state="!$v.form.referencia.$error"
            placeholder="Ingresar referencia del movimiento bancario"
          ></b-form-input>
          <div v-if="$v.form.referencia.required.$invalid" class="invalid-feedback">
            Debe ingresar la referencia
          </div>
        </b-form-group>
        <b-form-group label="Cantidad:">
          <b-form-input
            type="number"
            v-model.trim="$v.form.cantidad.$model"
            :state="!$v.form.cantidad.$error"
            placeholder="Ingresar cantidad del movimiento bancario"
          ></b-form-input>
          <div v-if="$v.form.cantidad.required.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad
          </div>
        </b-form-group>
        <b-form-group label="Cuentas:">
          <v-select
            name="cuentas"
            v-model="$v.form.cuenta_bancaria.$model"
            :state="!$v.form.cuenta_bancaria.$error"
            :options="cuentas"
            :filterable="false"
            placeholder="Seleccione la cuenta"
            @search="onSearch"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ option.nombre +' - ' +option.banco.nombre + ' - ' + option.cantidad }}
            </template>
          </v-select>
          <div v-if="$v.form.cuenta_bancaria.$error" class="invalid-feedback-vselect">
            Debe seleccionar la cuenta
          </div>
         </b-form-group>
        <b-row class="ml-2">
          <b-form-group label="Tipo de movimiento:">
            <b-col md="4">
              <b-form-radio v-model="form.tipo" value="DEBITO" name="customRadio2">Débito</b-form-radio>
            </b-col>
            <b-col md="4">
              <b-form-radio v-model="form.tipo" value="CREDITO" name="customRadio2">Crédito</b-form-radio>
            </b-col>
          </b-form-group>
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidate('update')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-bank" ref="modal-3-bank" title="Desactivar movimiento">
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
        ¿Desea desactivar el movimiento con referencia: {{ form.referencia }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-bank')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-bank')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-bank" ref="modal-4-bank" title="Activar movimiento">
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
        ¿Desea activar el movimiento con referencia: {{ form.referencia }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-bank')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-bank')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Movimientos bancarios</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
            <b-button variant="primary"  v-b-modal.modal-1-bank>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-bank
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
                        ? $bvModal.show('modal-3-bank')
                        : $bvModal.show('modal-4-bank');
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
  name: 'Movimientos',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  setup () {
    return { $v: useVuelidate() }
  },
  beforeMount () {
    this.getCuentas()
    this.tipos = [
      { id: 1, nombre: 'DEBITO' },
      { id: 2, nombre: 'CREDITO' }
    ]
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
        referencia: '',
        state: 1,
        cantidad: 0,
        tipo: 'DEBITO',
        cuenta_bancaria: null
      },
      tipos: null,
      cuentas: null,
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/movimiento/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'numero_movimiento',
          sortField: 'numero_movimiento',
          title: 'Referencia',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo',
          sortField: 'tipo',
          title: 'Tipo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cuenta_bancaria.nombre',
          sortField: 'cuenta_bancaria.nombre',
          title: 'Cuenta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad',
          sortField: 'cantidad',
          title: 'Cantidad',
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
        referencia: { required },
        cantidad: { required },
        tipo: { required },
        cuenta_bancaria: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.referencia = ''
          this.form.cantidad = 0
          this.form.tipo = ''
          this.form.cuenta_bancaria = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-bank'].hide()
          this.form.id = 0
          this.form.referencia = ''
          this.form.cantidad = 0
          this.form.tipo = ''
          this.form.cuenta_bancaria = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-bank'].hide()
          this.form.id = 0
          this.form.referencia = ''
          this.form.cantidad = 0
          this.form.tipo = ''
          this.form.cuenta_bancaria = ''
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
      this.form.referencia = data.numero_movimiento
      this.form.cantidad = data.cantidad
      this.form.tipo = data.tipo
      this.form.cuenta_bancaria = data.cuenta_bancaria.nombre
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/movimiento/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el movimiento con referencia ' + me.form.referencia + ' exitosamente'
          me.$refs.vuetable.refresh()
          me.closeModal('save')
          me.getCuentas()
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
      axios.put(apiUrl + '/movimiento/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el movimiento con referencia ' + me.form.referencia + ' exitosamente'
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
          .put(apiUrl + '/movimiento/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el movimiento con referencia ' + me.form.referencia + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-bank'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/movimiento/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el movimiento con referencia ' + me.form.referencia + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-bank'].hide()
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
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    searching (search, loading) {
      axios.get(apiUrl + '/cuenta_bancaria/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.cuentas = response.data
        loading(false)
      })
    },
    async getCuentas () {
      let me = this
      await axios.get(apiUrl + `/cuenta_bancaria/get`)
        .then(function (response) {
          me.cuentas = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
