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
    <b-modal id="modal-1-recipe" size="xl" ref="modal-1-recipe" title="Agregar receta">
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
        <b-form-group label="Receta">
          <quill-editor
            ref="myQuillEditor"
            v-model="form.medicine"
            :options="editorOption"
            theme="snow"
          />
        </b-form-group>
        <div v-if="$v.form.medicine.$error" class="invalid-feedback-vselect">
          Debe ingresar la receta
        </div>
        <b-form-group label="Observaciones:">
          <b-form-textarea
            v-model="form.observation"
            rows="2"
            placeholder="Ingrese la observación"
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
    <b-modal id="modal-2-recipe" size="xl" ref="modal-2-recipe" title="Actualizar receta">
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
        <b-form-group label="Receta">
          <quill-editor
            ref="myQuillEditor"
            v-model="form.medicine"
            :options="editorOption"
            theme="snow"
          />
        </b-form-group>
        <div v-if="$v.form.medicine.$error" class="invalid-feedback-vselect">
          Debe ingresar la receta
        </div>
        <b-form-group label="Observaciones:">
          <b-form-textarea
            v-model="form.observation"
            rows="2"
            placeholder="Ingrese la observación"
          ></b-form-textarea>
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
    <b-modal id="modal-3-recipe" ref="modal-3-recipe" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar la receta para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-medicine')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-medicine')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-recipe" ref="modal-4-recipe" title="Activar">
      <h6 class="my-4">
        ¿Desea activar la receta para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-medicine')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-medicine')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Recetas previas</h4>
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
              <b-button variant="primary"  @click="openModal('recipe')">AGREGAR RECETA</b-button>
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
                ref="vuetableMedicine"
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
                  v-b-modal.modal-2-recipe
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-recipe')
                      : $bvModal.show('modal-4-recipe');
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
import { xray } from '../../../../config/pluginInit'
import DatatableHeading from '../../../Tables/DatatableHeading'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationBootstrap from '../../../../components/common/VuetablePaginationBootstrap'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../config/constant'
import { mapGetters } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Medicine',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    quillEditor
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
    // this.getMedicine(this.patientId)
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data: () => {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' }
            ],
            ['clean']
          ]
        }
      },
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        id_paciente: 1,
        id_usuario: null,
        medicine: '',
        observation: ''
      },
      id_usuario: 0,
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      data: [],
      medicines: [],
      apiBase: apiUrl + '/receta/list',
      typeOptions: [],
      options: [
        { value: 'observaciones', nombre: 'Observaciones' }
        // { value: '2', nombre: 'Observaciones' }
      ],
      columna: { value: 'observaciones', nombre: 'Observaciones' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'observaciones',
          sortField: 'observaciones',
          title: 'Observaciones',
          dataClass: 'list-item-heading'
        },
        {
          name: 'createdAt',
          sortField: 'createdAt',
          title: 'Fecha',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            return new Date().toLocaleDateString('es-us', value)
          }
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
      fieldsMedicine: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nombre',
          sortField: 'nombre',
          title: 'Medicamento',
          dataClass: 'list-item-heading'
        }
      ],
      estadoArray: [
        { nombre: 'Activo' },
        { nombre: 'Crónico' },
        { nombre: 'Recurrente' },
        { nombre: 'Resuelto' }
      ],
      viaArray: [
        { nombre: 'Oral' },
        { nombre: 'Sublingual' },
        { nombre: 'Tópica' },
        { nombre: 'Oftálmica' },
        { nombre: 'Ótica' },
        { nombre: 'Intranasal' },
        { nombre: 'Inhalatoria' },
        { nombre: 'Intravenosa' },
        { nombre: 'Intramuscular' }
      ]
    }
  },
  validations () {
    return {
      form: {
        medicine: { required }
        // via: { required },
        // frecuencia: { required },
        // iniciar: { required },
        // ultima_toma: { required },
        // id_paciente: { required }
      }
    }
  },
  methods: {
    openModal (action) {
      switch (action) {
        case 'recipe':
          this.$refs['modal-1-recipe'].show()
          break

        default:
          break
      }
    },
    onChange () {
      console.log('hola')
      console.log(this.form.medicine)
      this.form.medicines.push(this.form.medicine)
      console.log(this.form.medicines)
      this.$refs.vuetableMedicines.refresh()
    },
    // indication (medicine) {
    //   console.log(medicine)
    //   this.$refs['modal-indication'].show()
    // },
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
    searching (search, loading) {
      axios.get(apiUrl + '/medicamento/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.medicines = response.data
        loading(false)
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.searching(search, loading)
      }
    },
    getMedicine (id) {
      let me = this
      axios.get(apiUrl + `/receta/get?id=${id}`)
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
          this.$refs['modal-1-recipe'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.medicine = ''
          this.form.observation = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-recipe'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.medicine = ''
          this.form.observation = ''
          this.form.state = 1
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      // this.form.id_usuario = this.currentUser.id
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
      this.form.medicine = data.medicamento
      // this.form.via = data.via
      // this.form.frecuencia = data.frecuencia
      // this.form.farmacia = data.farmacia
      // this.form.iniciar = data.iniciar
      // this.form.ultima_toma = data.ultima_toma
      this.form.observation = data.observaciones
      // this.form.paciente = data.paciente
      this.form.state = data.estado
      this.form.id_paciente = this.patientId
      this.form.id_usuario = this.currentUser.id
    },
    /* Guardar */
    onSave () {
      // console.log('guardando')
      const me = this
      // me.form.id_paciente = this.patientId
      axios.post(apiUrl + '/receta/create', {
        form: me.form })
        .then((response) => {
          console.log(response)
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la receta exitosamente'
          // me.getMedicine(this.patientId)
          me.$refs.vuetableMedicine.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '/receta/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el diagnóstico exitosamente'
          // me.getMedicine(this.patientId)
          me.$refs.vuetableMedicine.refresh()
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
          .put(apiUrl + '/receta/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            // me.getMedicine(this.patientId)
            me.$refs.vuetableMedicine.refresh()
            me.$refs['modal-3-recipe'].hide()
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la receta exitosamente'
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/receta/activate', {
            id: this.form.id
          })
          .then((response) => {
            // me.getMedicine(this.patientId)
            me.$refs.vuetableMedicine.refresh()
            me.$refs['modal-4-recipe'].hide()
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado la receta exitosamente'
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
          patientId: this.patientId
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search,
          columna: this.columna.value,
          patientId: this.patientId

        }
    },
    changePageSizes (perPage) {
      this.perPage = perPage
      this.$refs.vuetableMedicine.refresh()
    },
    searchChange (val) {
      this.search = val.toLowerCase()
      this.$refs.vuetableMedicine.refresh()
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
      this.$refs.vuetableMedicine.changePage(page)
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
