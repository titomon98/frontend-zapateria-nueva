<template>
  <b-container fluid>
    <b-modal id="modal-1-allergies" ref="modal-1-allergies" title="Agregar">
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
        <b-form-group label="Alérgeno:">
            <v-select
              name="type"
              v-model="$v.form.alergeno.$model"
              :state="!$v.form.alergeno.$error"
              :options="alergenoArray"
              label="nombre"
              placeholder="Seleccione el alérgeno"
            />
          <div v-if="$v.form.alergeno.$error" class="invalid-feedback-vselect">
            Debe seleccionar el alérgeno
          </div>
        </b-form-group>
        <b-form-group label="Reacciones:">
            <v-select
              name="type"
              v-model="$v.form.reacciones.$model"
              :state="!$v.form.reacciones.$error"
              :options="reaccionesArray"
              label="nombre"
              placeholder="Seleccione la(s) reaccion(es)"
            />
          <div v-if="$v.form.reacciones.$error" class="invalid-feedback-vselect">
            Debe seleccionar la(s) reaccion(es)
          </div>
        </b-form-group>
        <b-form-group label="Gravedad:">
            <v-select
              name="type"
              v-model="$v.form.gravedad.$model"
              :state="!$v.form.gravedad.$error"
              :options="gravedadArray"
              label="nombre"
              placeholder="Seleccione la gravedad"
            />
          <div v-if="$v.form.gravedad.$error" class="invalid-feedback-vselect">
            Debe seleccionar la gravedad
          </div>
        </b-form-group>
        <b-form-group label="Fecha identificada:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_identificada.$model"
            :state="!$v.form.fecha_identificada.$error"
            placeholder="Ingresar fecha de identificación"
          ></b-form-input>
          <div v-if="$v.form.fecha_identificada.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha de identificación
          </div>
        </b-form-group>
        <b-form-group label="Notas:">
          <b-form-textarea
            v-model.trim="$v.form.nota.$model"
            :state="!$v.form.nota.$error"
            placeholder="Ingresar nota"
          ></b-form-textarea>
          <div v-if="$v.form.nota.required.$invalid" class="invalid-feedback">
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
    <b-modal id="modal-2-allergies" ref="modal-2-allergies" title="Editar">
      <b-form>
        <b-form-group label="Alérgeno:">
            <v-select
              name="type"
              v-model="$v.form.alergeno.$model"
              :state="!$v.form.alergeno.$error"
              :options="alergenoArray"
              label="nombre"
              placeholder="Seleccione el alérgeno"
            />
          <div v-if="$v.form.alergeno.$error" class="invalid-feedback-vselect">
            Debe seleccionar el alérgeno
          </div>
        </b-form-group>
        <b-form-group label="Reacciones:">
            <v-select
              name="type"
              v-model="$v.form.reacciones.$model"
              :state="!$v.form.reacciones.$error"
              :options="reaccionesArray"
              label="nombre"
              placeholder="Seleccione la(s) reaccion(es)"
            />
          <div v-if="$v.form.reacciones.$error" class="invalid-feedback-vselect">
            Debe seleccionar la(s) reaccion(es)
          </div>
        </b-form-group>
        <b-form-group label="Gravedad:">
            <v-select
              name="type"
              v-model="$v.form.gravedad.$model"
              :state="!$v.form.gravedad.$error"
              :options="gravedadArray"
              label="nombre"
              placeholder="Seleccione la gravedad"
            />
          <div v-if="$v.form.gravedad.$error" class="invalid-feedback-vselect">
            Debe seleccionar la gravedad
          </div>
        </b-form-group>
        <b-form-group label="Fecha identificada:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_identificada.$model"
            :state="!$v.form.fecha_identificada.$error"
            placeholder="Ingresar fecha de identificación"
          ></b-form-input>
          <div v-if="$v.form.fecha_identificada.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha de identificación
          </div>
        </b-form-group>
        <b-form-group label="Notas:">
          <b-form-textarea
            v-model.trim="$v.form.nota.$model"
            :state="!$v.form.nota.$error"
            placeholder="Ingresar nota"
          ></b-form-textarea>
          <div v-if="$v.form.nota.required.$invalid" class="invalid-feedback">
            Debe ingresar la nota
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
    <b-modal id="modal-3-allergies" ref="modal-3-allergies" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar la alergia para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-allergies')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-allergies')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-allergies" ref="modal-4-allergies" title="Activar">
      <h6 class="my-4">
        ¿Desea activar la alergia para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-allergies')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-allergies')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Alergias</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-allergies>AGREGAR ALERGIA</b-button>
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
                  v-b-modal.modal-2-allergies
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-allergies')
                      : $bvModal.show('modal-4-allergies');
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
  name: 'Allergies',
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
  },
  beforeMount () {
    this.form.id_usuario = this.currentUser.uid
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
        alergeno: { nombre: 'Seleccione el tipo' },
        gravedad: { nombre: 'Seleccione el estado' },
        fecha_identificada: '',
        reacciones: null,
        nota: '',
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
      apiBase: apiUrl + '/alergias/list',
      typeOptions: [],
      options: [
        { value: 'alergeno', nombre: 'Alérgeno' },
        { value: 'gravedad', nombre: 'Gravedad' }
      ],
      columna: { value: 'alergeno', nombre: 'Alérgeno' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'fecha_identificada',
          sortField: 'fecfecha_identificacionha_inicio',
          title: 'Fecha identificación',
          dataClass: 'list-item-heading'
        },
        {
          name: 'alergeno',
          sortField: 'alergeno',
          title: 'Alérgeno',
          dataClass: 'list-item-heading'
        },
        {
          name: 'gravedad',
          sortField: 'gravedad',
          title: 'Gravedad',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nota',
          sortField: 'nota',
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
      reaccionesArray: [
        { nombre: 'Alérgico' },
        { nombre: 'Anafiláctico' },
        { nombre: 'Dolor de pecho' },
        { nombre: 'Diarrea' },
        { nombre: 'Distónica' },
        { nombre: 'Eosinofílica' },
        { nombre: 'Urticaria' },
        { nombre: 'Hipersensibilidad' },
        { nombre: 'Idiosincrásico' },
        { nombre: 'Comezón' },
        { nombre: 'Inflamación/Hinchazón' },
        { nombre: 'Malestar GI' },
        { nombre: 'Leucemoide' },
        { nombre: 'Náusea' },
        { nombre: 'Fotosensibilidad' },
        { nombre: 'Irritación' },
        { nombre: 'Dificultad respiratoria' },
        { nombre: 'Suero' },
        { nombre: 'Tóxico' },
        { nombre: 'Sibilancias' },
        { nombre: 'Desconocido' }
      ],
      alergenoArray: [
        { nombre: 'Alérgeno 1' },
        { nombre: 'Alérgeno 2' },
        { nombre: 'Alérgeno 3' },
        { nombre: 'Alérgeno 4' }
      ],
      gravedadArray: [
        { nombre: 'Leve' },
        { nombre: 'Moderado' },
        { nombre: 'Severo' },
        { nombre: 'Desconocido' }
      ]
    }
  },
  validations () {
    return {
      form: {
        alergeno: { required },
        gravedad: { required },
        fecha_identificada: { required },
        reacciones: { required },
        id_paciente: { required },
        nota: { required }
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
      }
    },
    getAllergies (id) {
      let me = this
      axios.get(apiUrl + `/alergias/get?id=${id}`)
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
          this.$refs['modal-1-allergies'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.alergeno.nombre = ''
          this.form.gravedad.nombre = ''
          this.form.fecha_identificada = ''
          this.form.reacciones = null
          this.form.nota = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-allergies'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.alergeno.nombre = ''
          this.form.gravedad.nombre = ''
          this.form.fecha_identificada = ''
          this.form.reacciones = null
          this.form.nota = ''
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
      this.form.alergeno.nombre = data.alergeno
      this.form.gravedad.nombre = data.gravedad
      this.form.fecha_identificada = data.fecha_identificada
      this.form.reacciones = data.reacciones
      this.form.nota = data.nota
      this.form.paciente = data.paciente
      this.form.state = data.estado
      this.form.id_paciente = this.patientId
      this.form.id_usuario = this.currentUser.id
    },
    /* Guardar */
    onSave () {
      const me = this
      me.form.id_paciente = this.patientId
      axios.post(apiUrl + '/alergias/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la alergia exitosamente'
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
      axios.put(apiUrl + '/alergias/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la alergia exitosamente'
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
          .put(apiUrl + '/alergias/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-allergies'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/alergias/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-allergies'].hide()
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
