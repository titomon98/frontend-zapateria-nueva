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
    <b-modal id="modal-1-account" ref="modal-1-account" title="Agregar cuenta bancaria">
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
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre de la cuenta"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Número de cuenta:">
          <b-form-input
            v-model.trim="$v.form.number.$model"
            :state="!$v.form.number.$error"
            placeholder="Ingresar número de cuenta"
          ></b-form-input>
          <div v-if="$v.form.number.required.$invalid" class="invalid-feedback">
            Debe ingresar el número de cuenta
          </div>
        </b-form-group>
        <b-form-group label="Saldo inicial:">
          <b-form-input
            type="number"
            v-model.trim="$v.form.quantity.$model"
            :state="!$v.form.quantity.$error"
            placeholder="Ingresar el saldo inicial"
          ></b-form-input>
          <div v-if="$v.form.quantity.required.$invalid" class="invalid-feedback">
            Debe ingresar el saldo inicial
          </div>
        </b-form-group>
        <b-form-group label="Banco:">
          <v-select
            name="bank"
            v-model="$v.form.bank_id.$model"
            :state="!$v.form.bank_id.$error"
            :options="banks"
            :filterable="false"
            placeholder="Seleccione el banco"
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
          <div v-if="$v.form.bank_id.$error" class="invalid-feedback-vselect">
            Debe seleccionar el banco
          </div>
         </b-form-group>
        <div v-if="$v.form.bank_id.$invalid" class="invalid-feedback">
          Debe ingresar el banco
        </div>

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
    <b-modal id="modal-2-account" ref="modal-2-account" title="Editar cuenta bancaria">
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
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre de la cuenta"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Número de cuenta:">
          <b-form-input
            v-model.trim="$v.form.number.$model"
            :state="!$v.form.number.$error"
            placeholder="Ingresar número de cuenta"
          ></b-form-input>
          <div v-if="$v.form.number.required.$invalid" class="invalid-feedback">
            Debe ingresar el número de cuenta
          </div>
        </b-form-group>
        <b-form-group label="Saldo inicial:">
          <b-form-input
            type="number"
            v-model.trim="$v.form.quantity.$model"
            :state="!$v.form.quantity.$error"
            placeholder="Ingresar el saldo inicial"
          ></b-form-input>
          <div v-if="$v.form.quantity.required.$invalid" class="invalid-feedback">
            Debe ingresar el saldo inicial
          </div>
        </b-form-group>
        <b-form-group label="Banco:">
          <v-select
            name="bank"
            v-model="$v.form.bank_id.$model"
            :state="!$v.form.bank_id.$error"
            :options="banks"
            :filterable="false"
            placeholder="Seleccione el banco"
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
          <div v-if="$v.form.bank_id.$error" class="invalid-feedback-vselect">
            Debe seleccionar el banco
          </div>
         </b-form-group>
        <div v-if="$v.form.bank_id.$invalid" class="invalid-feedback">
          Debe ingresar el banco
        </div>

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
    <b-modal id="modal-3-account" ref="modal-3-account" title="Desactivar cuenta bancaria">
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
        ¿Desea desactivar la cuenta: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-account')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-account')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-account" ref="modal-4-account" title="Activar cuenta bancaria">
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
        ¿Desea activar la cuenta: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-account')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-account')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Cuentas bancarias</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
            <b-button variant="dark"  @click="accountsReport()">REPORTE GENERAL DE CUENTAS</b-button>
            <b-button variant="primary"  v-b-modal.modal-1-account>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-account
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
                        ? $bvModal.show('modal-3-account')
                        : $bvModal.show('modal-4-account');
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
import JsPDF from 'jspdf'
import moment from 'moment'

export default {
  name: 'BankAccounts',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  props: {
    logo3: { type: String, default: require('./4x4.png') }
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    this.getAccounts()
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
        name: '',
        number: '',
        quantity: 0.0,
        bank_id: '',
        state: 1
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      banks: [],
      accounts: [],
      apiBase: apiUrl + '/cuenta_bancaria/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nombre',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'numero_cuenta_bancaria',
          sortField: 'numero_cuenta_bancaria',
          title: 'Número de cuenta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad',
          sortField: 'cantidad',
          title: 'Saldo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'banco.nombre',
          sortField: 'banco.nombre',
          title: 'Banco',
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
        number: { required },
        quantity: { required },
        bank_id: { required }
      }
    }
  },
  methods: {
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          this.form.id = 0
          this.form.name = ''
          this.form.number = ''
          this.form.quantity = 0.0
          this.form.bank_id = 0
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-account'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.number = ''
          this.form.quantity = 0.0
          this.form.bank_id = 0
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-account'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.number = ''
          this.form.quantity = 0.0
          this.form.bank_id = 0
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
      this.form.number = data.numero_cuenta_bancaria
      this.form.quantity = data.cantidad
      this.form.bank_id = data.banco
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/cuenta_bancaria/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la cuenta ' + me.form.number + ' exitosamente'
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
      axios.put(apiUrl + '/cuenta_bancaria/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la cuenta ' + me.form.number + ' exitosamente'
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
          .put(apiUrl + '/cuenta_bancaria/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la cuenta ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-account'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/cuenta_bancaria/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado la cuenta ' + me.form.number + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-account'].hide()
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
    searching (search, loading) {
      axios.get(apiUrl + '/banco/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.banks = response.data
        loading(false)
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    getAccounts () {
      let me = this
      axios.get(apiUrl + `/cuenta_bancaria/get`)
        .then(function (response) {
          me.accounts = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    accountsReport () {
      let me = this
      var altura = 2
      var ahora = new Date()
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5],
        orientation: 'landscape'
      })
      var ingreso = moment(ahora).format('DD/MM/YYYY')
      var imgData = this.logo3// replace with your image data
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
      doc.setFontSize(12).setFont(undefined, 'bold')
      doc.text('Fecha de generación: ' + ingreso, 6, altura)
      altura = altura + 0.5
      doc.text('Generado por: Juanita Cortez', 6, altura)
      altura = altura + 3
      doc.text('Nombre de cuenta', 2, altura)
      doc.text('Número de cuenta', 7, altura)
      doc.text('Saldo actual', 12, altura)
      doc.text('Banco', 17, altura)
      altura = altura + 1
      doc.setFontSize(12).setFont(undefined, 'normal')
      for (let i = 0; i < me.accounts.length; i++) {
        doc.text(me.accounts[i].nombre, 2, altura)
        doc.text(me.accounts[i].numero_cuenta_bancaria, 7, altura)
        doc.text(me.accounts[i].cantidad, 12, altura)
        doc.text(me.accounts[i].banco.nombre, 17, altura)
        altura = altura + 0.5
        if (altura > 18.5) {
          doc.addPage()
          altura = 2
          doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4) // replace the coordinates and dimensions as needed
          doc.setFontSize(12).setFont(undefined, 'bold')
          doc.text('Fecha de generación: ' + ingreso, 6, altura)
          altura = altura + 0.5
          doc.text('Generado por: Juanita Cortez', 6, altura)
          altura = altura + 3
        }
      }
      doc.save('CuentasGeneral.pdf')
    }
  }
}
</script>
