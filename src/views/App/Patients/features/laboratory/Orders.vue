<template>
  <b-container fluid>
    <b-modal id="modal-1-orders" ref="modal-1-orders" title="Agregar">
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
        <b-form-group label="Exámenes:">
          <v-select
            name="exams"
            v-model="$v.form.descripcion.$model"
            :state="!$v.form.descripcion.$error"
            :options="exams"
            :filterable="false"
            placeholder="Seleccione el examen"
            @search="onSearchExam"
          >
            <template v-slot:spinner="{ loading }">
              <div v-show="loading">Cargando...</div>
            </template>
            <template v-slot:option="option">
              {{ 'Nombre: '+ option.nombre + ' Tipo: '+ option.tipo_examene.nombre +' Precio: '+ option.precio }}
            </template>
            <template slot="selected-option" slot-scope="option">
              {{ 'Nombre: '+ option.nombre + ' Tipo: '+ option.tipo_examene.nombre +' Precio: '+ option.precio }}
            </template>
          </v-select>
          <div v-if="$v.form.descripcion.$error" class="invalid-feedback-vselect">
            Debe seleccionar el examen
          </div>
         </b-form-group>
        <b-form-group label="Tipo de diagnóstico:">
            <v-select
              name="type"
              v-model="$v.form.tipo.$model"
              :state="!$v.form.tipo.$error"
              :options="tipoArray"
              label="nombre"
              placeholder="Seleccione el tipo de diagnóstico"
            />
          <div v-if="$v.form.tipo.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Estado:">
            <v-select
              name="type"
              v-model="$v.form.estado_diagnostico.$model"
              :state="!$v.form.estado_diagnostico.$error"
              :options="estadoArray"
              label="nombre"
              placeholder="Seleccione el estado"
            />
          <div v-if="$v.form.estado_diagnostico.$error" class="invalid-feedback-vselect">
            Debe seleccionar el estado
          </div>
        </b-form-group>
        <b-form-group label="Fecha de inicio:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_inicio.$model"
            :state="!$v.form.fecha_inicio.$error"
            placeholder="Ingresar fecha de inicio"
          ></b-form-input>
          <div v-if="$v.form.fecha_inicio.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha de inicio
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
        <b-form-group label="Observaciones:">
          <b-form-textarea
            v-model.trim="$v.form.observaciones"
            placeholder="Ingresar observaciones"
          ></b-form-textarea>
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
    <b-modal id="modal-2-orders" ref="modal-2-orders" title="Editar">
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
        <b-form-group label="Tipo de Examen:">
            <v-select
              name="type"
              v-model="$v.form.tipo2.$model"
              :state="!$v.form.tipo2.$error"
              :options="tipoExamenArray"
              label="nombre"
              placeholder="Seleccione el tipo de examen"
            />
          <div v-if="$v.form.tipo2.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de examen
          </div>
        </b-form-group>
        <b-form-group label="Tipo de Insumo:">
            <v-select
              name="type"
              v-model="$v.form.tipo.$model"
              :state="!$v.form.tipo.$error"
              :options="tipoArray"
              label="nombre"
              placeholder="Seleccione el tipo de diagnóstico"
            />
          <div v-if="$v.form.tipo.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de diagnóstico
          </div>
        </b-form-group>
        <b-form-group label="Estado:">
            <v-select
              name="type"
              v-model="$v.form.estado_diagnostico.$model"
              :state="!$v.form.estado_diagnostico.$error"
              :options="estadoArray"
              label="nombre"
              placeholder="Seleccione el estado"
            />
          <div v-if="$v.form.estado_diagnostico.$error" class="invalid-feedback-vselect">
            Debe seleccionar el estado
          </div>
        </b-form-group>
        <b-form-group label="Fecha de inicio:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_inicio.$model"
            :state="!$v.form.fecha_inicio.$error"
            placeholder="Ingresar fecha de inicio"
          ></b-form-input>
          <div v-if="$v.form.fecha_inicio.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha de inicio
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
        <b-form-group label="Observaciones:">
          <b-form-textarea
            v-model.trim="$v.form.observaciones"
            placeholder="Ingresar observaciones"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('update')"
          >Agregar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-orders" ref="modal-3-orders" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar la orden para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-orders')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-orders')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-orders" ref="modal-4-orders" title="Activar">
      <h6 class="my-4">
        ¿Desea activar la orden para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-orders')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-orders')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Órdenes</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-orders>AGREGAR ORDEN</b-button>
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
                  @click="setData(props.rowData)"
                  v-b-modal.modal-2-orders
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-orders')
                      : $bvModal.show('modal-4-orders');
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
  name: 'Orders',
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
      search_exam: '',
      form: {
        id: 0,
        tipo: { nombre: 'Seleccione el tipo' },
        tipo2: { nombre: 'Seleccione el tipo' },
        estado_diagnostico: { nombre: 'Seleccione el estado' },
        fecha_inicio: '',
        descripcion: '',
        notas: '',
        observaciones: '',
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
      exams: [],
      apiBase: apiUrl + '/orden/list',
      typeOptions: [],
      options: [
        { value: '1', nombre: 'Número de orden' }
      ],
      columna: { value: '1', nombre: 'Número de orden' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'fecha_inicio',
          sortField: 'fecha_inicio',
          title: 'Fecha',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo',
          sortField: 'tipo',
          title: 'Tipo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'descripcion',
          sortField: 'descripcion',
          title: 'Descripción',
          dataClass: 'list-item-heading'
        },
        {
          name: 'estado_diagnostico',
          sortField: 'estado_diagnostico',
          title: 'Estado',
          titleClass: '',
          dataClass: 'text-muted'
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
        { nombre: 'Diagnóstico' },
        { nombre: 'Diagnóstico principal' },
        { nombre: 'Diagnóstico de ingreso' },
        { nombre: 'Diagnóstico en progreso' },
        { nombre: 'Diagnóstico secundario' },
        { nombre: 'Diagnóstico de tratamiento' },
        { nombre: 'Diagnóstico final' },
        { nombre: 'Queja' },
        { nombre: 'Condición' },
        { nombre: 'Descubrimiento' },
        { nombre: 'Limitación funcional' },
        { nombre: 'Síntoma' }
      ],
      tipoExamenArray: [
        { nombre: 'Audiometría Tonal Privado' },
        { nombre: 'Audiometría Tonal Fundación' },
        { nombre: 'Audiometría Tonal Hospital' },
        { nombre: 'EEG Privado' },
        { nombre: 'EEG Fundación' },
        { nombre: 'EEG Hospital' }
      ],
      estadoArray: [
        { nombre: 'Activo' },
        { nombre: 'Crónico' },
        { nombre: 'Recurrente' },
        { nombre: 'Resuelto' }
      ]
    }
  },
  validations () {
    return {
      form: {
        tipo: { required },
        tipo2: { required },
        estado_diagnostico: { required },
        fecha_inicio: { required },
        descripcion: { required },
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
    onSearchExam (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingExams(search, loading)
      }
    },
    searchingExams (search, loading) {
      axios.get(apiUrl + '/examen/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.exams = response.data
        loading(false)
      })
    },
    getDiagnosis (id) {
      let me = this
      axios.get(apiUrl + `/diagnostico/get?id=${id}`)
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
          this.$refs['modal-1-orders'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.tipo.nombre = ''
          this.form.estado_diagnostico.nombre = ''
          this.form.fecha_inicio = ''
          this.form.descripcion = ''
          this.form.notas = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-orders'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.tipo.nombre = ''
          this.form.estado_diagnostico.nombre = ''
          this.form.fecha_inicio = ''
          this.form.descripcion = ''
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
      this.form.estado_diagnostico.nombre = data.estado_diagnostico
      this.form.fecha_inicio = data.fecha_inicio
      this.form.descripcion = data.descripcion
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
      axios.post(apiUrl + '/orden/create', {
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
      axios.put(apiUrl + '/orden/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la orden exitosamente'
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
          .put(apiUrl + '/orden/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-orders'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/orden/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-orders'].hide()
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
          patientId: this.patientId,
          columna: this.columna.value
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          patientId: this.patientId,
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
