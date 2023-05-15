<template>
  <b-container fluid>
    <b-modal id="modal-1-vitalsneuro" ref="modal-1-vitalsneuro" title="Agregar">
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
        <b-form-group label="Fecha:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.date.$model"
            :state="!$v.form.date.$error"
            placeholder="Ingresar fecha"
          ></b-form-input>
          <div v-if="$v.form.date.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha vital
          </div>
        </b-form-group>
        <b-form-group label="Escala glasglow:">
          <b-form-input
            v-model.trim="form.glasglowScale"
            placeholder="Ingresar la escala glasglow"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Motor:">
          <b-form-input
            v-model.trim="form.motor"
            placeholder="Ingresar motor"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Verbal:">
          <b-form-input
            v-model.trim="form.verbal"
            placeholder="Ingresar verbal"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Apertura de ojos:">
          <b-form-input
            v-model.trim="form.eyesOpening"
            placeholder="Ingresar apertura de ojos"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Reacción izquierda:">
          <b-form-input
            v-model.trim="form.leftReaction"
            placeholder="Ingresar reacción izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Reacción derecha:">
          <b-form-input
            v-model.trim="form.rightReaction"
            placeholder="Ingresar reacción derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Tamaño izquierda:">
          <b-form-input
            v-model.trim="form.leftSize"
            placeholder="Ingresar tamaño izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Tamaño derecha:">
          <b-form-input
            v-model.trim="form.rightSize"
            placeholder="Ingresar tamaño derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Superior izquierda:">
          <b-form-input
            v-model.trim="form.upperLeft"
            placeholder="Ingresar superior izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Superior derecha:">
          <b-form-input
            v-model.trim="form.upperRight"
            placeholder="Ingresar superior derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Inferior izquierda:">
          <b-form-input
            v-model.trim="form.lowerLeft"
            placeholder="Ingresar inferior izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Inferior derecha:">
          <b-form-input
            v-model.trim="form.lowerRight"
            placeholder="Ingresar inferior derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Notas:">
          <b-form-textarea
            v-model.trim="form.notes"
            placeholder="Ingresar notas"
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
    <b-modal id="modal-2-vitalsneuro" ref="modal-2-vitalsneuro" title="Editar">
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
        <b-form-group label="Fecha:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.date.$model"
            :state="!$v.form.date.$error"
            placeholder="Ingresar fecha"
          ></b-form-input>
          <div v-if="$v.form.date.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha vital
          </div>
        </b-form-group>
        <b-form-group label="Escala glasglow:">
          <b-form-input
            v-model.trim="form.glasglowScale"
            placeholder="Ingresar la escala glasglow"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Motor:">
          <b-form-input
            v-model.trim="form.motor"
            placeholder="Ingresar motor"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Verbal:">
          <b-form-input
            v-model.trim="form.verbal"
            placeholder="Ingresar verbal"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Apertura de ojos:">
          <b-form-input
            v-model.trim="form.eyesOpening"
            placeholder="Ingresar apertura de ojos"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Reacción izquierda:">
          <b-form-input
            v-model.trim="form.leftReaction"
            placeholder="Ingresar reacción izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Reacción derecha:">
          <b-form-input
            v-model.trim="form.rightReaction"
            placeholder="Ingresar reacción derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Tamaño izquierda:">
          <b-form-input
            v-model.trim="form.leftSize"
            placeholder="Ingresar tamaño izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Tamaño derecha:">
          <b-form-input
            v-model.trim="form.rightSize"
            placeholder="Ingresar tamaño derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Superior izquierda:">
          <b-form-input
            v-model.trim="form.upperLeft"
            placeholder="Ingresar superior izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Superior derecha:">
          <b-form-input
            v-model.trim="form.upperRight"
            placeholder="Ingresar superior derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Inferior izquierda:">
          <b-form-input
            v-model.trim="form.lowerLeft"
            placeholder="Ingresar inferior izquierda"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Inferior derecha:">
          <b-form-input
            v-model.trim="form.lowerRight"
            placeholder="Ingresar inferior derecha"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Notas:">
          <b-form-textarea
            v-model.trim="form.notes"
            placeholder="Ingresar notas"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('update')"
          >Actualizar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-vitalsneuro" ref="modal-3-vitalsneuro" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar el registro vital del paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-vitalsneuro')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-vitalsneuro')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-vitalsneuro" ref="modal-4-vitalsneuro" title="Activar">
      <h6 class="my-4">
        ¿Desea activar el registro vital del paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-vitalsneuro')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-vitalsneuro')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Signos Vitales Neuro</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-vitalsneuro>AGREGAR DIAGNÓSTICO</b-button>
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
                  v-b-modal.modal-2-vitalsneuro
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-vitalsneuro')
                      : $bvModal.show('modal-4-vitalsneuro');
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
  name: 'VitalSignsNeuro',
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
  beforeMount () {
    this.form.id_usuario = this.currentUser.uid
    this.form.id_paciente = this.patientId
  },
  mounted () {
    xray.index()
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
        date: '',
        glasglowScale: '',
        motor: '',
        verbal: '',
        eyesOpening: '',
        leftReaction: '',
        leftSize: '',
        rightReaction: '',
        rightSize: '',
        upperLeft: '',
        lowerLeft: '',
        upperRight: '',
        lowerRight: '',
        notes: '',
        state: 1,
        id_paciente: null,
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
      apiBase: apiUrl + '/vitales_neuro/list',
      typeOptions: [],
      options: [
        { value: 'escala_glasgow', nombre: 'Escala glasgow' },
        { value: 'motor', nombre: 'Motor' },
        { value: 'verbal', nombre: 'Verbal' }
      ],
      columna: { value: 'escala_glasgow', nombre: 'Escala glasgow' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'fecha_vital',
          sortField: 'fecha_vital',
          title: 'Fecha',
          dataClass: 'list-item-heading'
        },
        {
          name: 'escala_glasgow',
          sortField: 'escala_glasgow',
          title: 'Escala glasgow',
          dataClass: 'list-item-heading'
        },
        {
          name: 'motor',
          sortField: 'motor',
          title: 'Motor',
          dataClass: 'list-item-heading'
        },
        {
          name: 'verbal',
          sortField: 'verbal',
          title: 'Verbal',
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
        date: { required }
        // tipo: { required },
        // estado_diagnostico: { required },
        // fecha_inicio: { required },
        // descripcion: { required },
        // id_paciente: { required },
        // notas: { required }
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
          this.$refs['modal-1-vitalsneuro'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.date = ''
          this.form.glasglowScale = ''
          this.form.motor = ''
          this.form.verbal = ''
          this.form.eyesOpening = ''
          this.form.leftReaction = ''
          this.form.leftSize = ''
          this.form.rightReaction = ''
          this.form.rightSize = ''
          this.form.upperLeft = ''
          this.form.lowerLeft = ''
          this.form.upperRight = ''
          this.form.lowerRight = ''
          this.form.notes = ''
          this.form.state = 1
          this.form.id_paciente = null
          this.form.id_usuario = null
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-vitalsneuro'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.date = ''
          this.form.glasglowScale = ''
          this.form.motor = ''
          this.form.verbal = ''
          this.form.eyesOpening = ''
          this.form.leftReaction = ''
          this.form.leftSize = ''
          this.form.rightReaction = ''
          this.form.rightSize = ''
          this.form.upperLeft = ''
          this.form.lowerLeft = ''
          this.form.upperRight = ''
          this.form.lowerRight = ''
          this.form.notes = ''
          this.form.state = 1
          this.form.id_paciente = null
          this.form.id_usuario = null
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
      }
    },
    setData (data) {
      // Aqui reiniciar variables
      this.form.id = data.id
      this.form.date = data.fecha_vital
      this.form.glasglowScale = data.escala_glasgow
      this.form.motor = data.motor
      this.form.verbal = data.verbal
      this.form.eyesOpening = data.apertura_ojos
      this.form.leftReaction = data.reaccion_izquierda
      this.form.leftSize = data.tamano_izquierda
      this.form.rightReaction = data.reaccion_derecha
      this.form.rightSize = data.tamano_derecha
      this.form.upperLeft = data.superior_izquierda
      this.form.lowerLeft = data.inferior_izquierda
      this.form.upperRight = data.superior_derecha
      this.form.lowerRight = data.inferior_derecha
      this.form.notes = data.notas
      this.form.state = data.estado
      this.form.id_usuario = this.currentUser.uid
      this.form.id_paciente = this.patientId
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/vitales_neuro/create', {
        form: me.form })
        .then((response) => {
          console.log(response)
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el registro vital exitosamente'
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
      axios.put(apiUrl + '/vitales_neuro/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el registro vital exitosamente'
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
          .put(apiUrl + '/vitales_neuro/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-vitalsneuro'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/vitales_neuro/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getDiagnosis(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-vitalsneuro'].hide()
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
          columna: this.columna.value,
          patientId: this.form.id_paciente

        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.value,
          patientId: this.form.id_paciente

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
