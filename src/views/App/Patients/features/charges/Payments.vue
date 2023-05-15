<template>
  <b-container fluid>
    <b-modal id="modal-1-payments" ref="modal-1-payments" title="Agregar">
      <!-- Maquetar aqui el modal de agregar dependiendo de  -->
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
        <b-form-group label="Fecha de pago:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_pago.$model"
            :state="!$v.form.fecha_pago.$error"
            placeholder="Ingresar fecha de inicio"
          ></b-form-input>
          <div v-if="$v.form.fecha_pago.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha de inicio
          </div>
        </b-form-group>
        <b-form-group label="Tipo de pago:">
            <v-select
              name="type"
              v-model="$v.form.tipo_pago.$model"
              :state="!$v.form.tipo_pago.$error"
              :options="tipoArray"
              label="nombre"
              placeholder="Seleccione el tipo de pago"
            />
          <div v-if="$v.form.tipo_pago.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de pago
          </div>
        </b-form-group>
        <b-form-group label="Referencia:">
          <b-form-input
            v-model.trim="$v.form.referencia.$model"
            :state="!$v.form.referencia.$error"
            placeholder="Ingresar el diagnóstico"
          ></b-form-input>
          <div v-if="$v.form.referencia.required.$invalid" class="invalid-feedback">
            Debe ingresar el diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Saldo actual:">
          <b-form-input
            v-model.trim="$v.form.saldo_actual.$model"
            :state="!$v.form.saldo_actual.$error"
            placeholder="Ingresar el diagnóstico"
          ></b-form-input>
          <div v-if="$v.form.saldo_actual.required.$invalid" class="invalid-feedback">
            Debe ingresar el diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Cantidad pagada:">
          <b-form-input
            v-model.trim="$v.form.cantidad_pagada.$model"
            :state="!$v.form.cantidad_pagada.$error"
            placeholder="Ingresar el diagnóstico"
          ></b-form-input>
          <div v-if="$v.form.cantidad_pagada.required.$invalid" class="invalid-feedback">
            Debe ingresar el diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Balance restante:">
          <b-form-input
            v-model.trim="$v.form.balance_restante.$model"
            :state="!$v.form.balance_restante.$error"
            placeholder="Ingresar el diagnóstico"
          ></b-form-input>
          <div v-if="$v.form.balance_restante.required.$invalid" class="invalid-feedback">
            Debe ingresar el diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Notas:">
          <b-form-textarea
            v-model.trim="$v.form.notas.$model"
            :state="!$v.form.notas.$error"
            placeholder="Ingresar notas"
          ></b-form-textarea>
          <div v-if="$v.form.notas.required.$invalid" class="invalid-feedback">
            Debe ingresar la nota
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
    <b-modal id="modal-2-payments" ref="modal-2-payments" title="Editar">

      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('update')"
          >Agregar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-payments" ref="modal-3-payments" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar el diagnóstico para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-payments')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-payments')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-payments" ref="modal-4-payments" title="Activar">
      <h6 class="my-4">
        ¿Desea activar el diagnóstico para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-payments')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-payments')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Pagos</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-payments>AGREGAR DIAGNÓSTICO</b-button>
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
                ref="vuetableDiagnosis"
                class="table-divided order-with-arrow "
                :api-mode="false"
                :data="data"
                :fields="fields"
                :query-params="makeQueryParams"
                :per-page="perPage"
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
                  @click="setData(props.rowData)"
                  v-b-modal.modal-2-payments
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-payments')
                      : $bvModal.show('modal-4-payments');
                  "
                  class="mb-2"
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
import { xray } from '../../../../../config/pluginInit'
import DatatableHeading from '../../../../Tables/DatatableHeading'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../../../components/common/VuetablePaginationBootstrap'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../../config/constant'
import { mapGetters } from 'vuex'

export default {
  name: 'Payments',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  props: [
    'patientId'
  ],
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    this.getDiagnosis(this.patientId)
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data: () => {
    return {
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        tipo_pago: { nombre: 'Seleccione el tipo de pago' },
        fecha_pago: '',
        referencia: '',
        saldo_actual: '',
        cantidad_pagada: '',
        balance_restante: '',
        notas: '',
        paciente: [],
        state: 1,
        id_paciente: 1,
        id_usuario: null
      },
      id_usuario: 0,
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      data: [],
      apiBase: apiUrl + '/pagos/list',
      typeOptions: [],
      options: [
        { value: '1', nombre: 'Tipo de pago' },
        { value: '2', nombre: 'Paciente' }
      ],
      columna: { value: '1', nombre: 'Tipo de pago' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'fecha_pago',
          sortField: 'fecha_pago',
          title: 'Fecha',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_pago',
          sortField: 'tipo_pago',
          title: 'Tipo de pago',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad_pagada',
          sortField: 'cantidad_pagada',
          title: 'Cantidad pagada',
          dataClass: 'list-item-heading'
        },
        {
          name: 'balance_restante',
          sortField: 'balance_restante',
          title: 'Balance restante',
          dataClass: 'list-item-heading'
        },
        {
          name: 'notas',
          sortField: 'notas',
          title: 'Notas',
          dataClass: 'list-item-heading'
        },
        {
          name: 'usuario.user',
          sortField: 'usuario.user',
          title: 'Ingresado por',
          dataClass: 'list-item-heading'
        },
        {
          name: '__slot:estado',
          sortField: 'estado',
          title: 'Estado en sistema',
          titleClass: '',
          dataClass: 'text-muted'
        }
      ],
      tipoArray: [
        { nombre: 'CAS - Efectivo' },
        { nombre: 'CHK - Cheque' },
        { nombre: 'CRC - Tarjeta de crédito' },
        { nombre: 'DBC - Tarjeta de débito' },
        { nombre: 'VOU - Cuentas por cobrar' }
      ]
    }
  },
  validations () {
    return {
      form: {
        tipo_pago: { required },
        fecha_pago: { required },
        referencia: { required },
        saldo_actual: { required },
        cantidad_pagada: { required },
        balance_restante: { required },
        id_paciente: { required },
        notas: { required }
      }
    }
  },
  methods: {
    pacienteNull () {
      if (this.product.id === undefined) {
        // En caso de que el paciente no este
        this.$router.push({ name: 'Paciente'
        })
      } else {
        this.fetchData(1, this.product.id, this.search, this.checkboxmanual)
        this.idproduct = this.product.id
      }
    },
    getDiagnosis (id) {
      let me = this
      axios.get(apiUrl + `/pagos/get?id=${id}`)
        .then(function (response) {
          me.data = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-payments'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.tipo_pago.nombre = ''
          this.form.fecha_pago = ''
          this.form.referencia = ''
          this.form.saldo_actual = ''
          this.form.cantidad_pagada = ''
          this.form.balance_restante = ''
          this.form.notas = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-payments'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.tipo.nombre = ''
          this.form.fecha_pago = ''
          this.form.referencia = ''
          this.form.saldo_actual = ''
          this.form.cantidad_pagada = ''
          this.form.balance_restante = ''
          this.form.notas = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      this.form.id_usuario = this.currentUser.id
      if (this.$v.$error !== true) {
        if (action === 'save') {
          this.onSave()
        } else if (action === 'update') {
          this.onUpdate()
        }
      }
    },
    setData (data) {
      // Aqui reiniciar variables
      this.form.id = data.id
      this.form.tipo.nombre = data.tipo
      this.form.fecha_pago = data.fecha_pago
      this.form.referencia = data.referencia
      this.form.saldo_actual = data.saldo_actual
      this.form.cantidad_pagada = data.cantidad_pagada
      this.form.balance_restante = data.balance_restante
      this.form.notas = data.notas
      this.form.paciente = data.paciente
      this.form.state = data.estado
      this.form.id_paciente = this.patientId
      this.form.id_usuario = this.currentUser.id
    },
    /* Guardar */
    onSave () {
      const me = this
      me.form.id_paciente = this.patientId
      axios.post(apiUrl + '/pagos/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el diagnóstico exitosamente'
          me.getDiagnosis(this.patientId)
          me.$refs.vuetableDiagnosis.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/pagos/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el diagnóstico exitosamente'
          me.getDiagnosis(this.patientId)
          me.$refs.vuetableDiagnosis.refresh()
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
          .put(apiUrl + '/pagos/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-payments'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/pagos/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-payments'].hide()
          })
          .catch((error) => {
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
      this.$refs.vuetableDiagnosis.refresh()
    },
    searchChange (val) {
      this.search = val.toLowerCase()
      this.$refs.vuetableDiagnosis.refresh()
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
      this.$refs.vuetableDiagnosis.changePage(page)
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
