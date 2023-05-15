<template>
  <b-container fluid>
    <b-modal id="modal-1-radiology" ref="modal-1-radiology" title="Agregar">
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
        <b-form-group label="Descripción de radiologia:">
          <b-form-input
            v-model.trim="$v.form.contenido.$model"
            :state="!$v.form.contenido.$error"
            placeholder="Ingresar la descripción de la radiologia"
          ></b-form-input>
          <div v-if="$v.form.contenido.required.$invalid" class="invalid-feedback">
            Debe ingresar la descripción de la radiologia
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-10"
          label="Documento:"
          label-for="input-10"
        >
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :duplicateCheck = "true"
            :options = "dropzoneOptions"
            @vdropzone-max-files-exceeded = "extra"
            @vdropzone-success = "exito"
          >
          </vue-dropzone>
           <span v-if="dropzoneVal" style="color: red"
            >Debe ingresar un archivo.</span>
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
    <b-modal id="modal-2-radiology" ref="modal-2-radiology" title="Editar">
      <b-form>
        <b-form-group label="Descripción de documento de radiología:">
          <b-form-input
            v-model.trim="$v.form.contenido.$model"
            :state="!$v.form.contenido.$error"
            placeholder="Ingresar la descripción de documento de radiología"
          ></b-form-input>
          <div v-if="$v.form.contenido.required.$invalid" class="invalid-feedback">
            Debe ingresar la descripción del estudio de radiología
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
    <b-modal id="modal-3-radiology" ref="modal-3-radiology" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar la radiología para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-radiology')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-radiology')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-radiology" ref="modal-4-radiology" title="Activar">
      <h6 class="my-4">
        ¿Desea activar la radiología para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-radiology')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-radiology')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Radiología</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-radiology>AGREGAR RADIOLOGÍA</b-button>
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
                  v-b-modal.modal-2-radiology
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="downloadData(props.rowData)"
                  class="mb-2"
                  size="sm"
                  variant="outline-success"
                  ><i :class="'fas fa-download'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-radiology')
                      : $bvModal.show('modal-4-radiology');
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
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'
export default {
  name: 'Radiology',
  components: {
    vuetable: Vuetable,
    vueDropzone: vue2Dropzone,
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
    this.getRadiology(this.patientId)
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data: () => {
    return {
      file: '',
      dropzoneVal: false,
      message: '',
      dropzoneOptions: {
        url: apiUrl + '/radiologia/upload',
        addRemoveLinks: true,
        thumbnailWidth: 160,
        maxFilesize: 3,
        dictCancelUpload: 'Desea cancelar la subida del archivo',
        dictUploadCanceled: 'Cancelada',
        dictCancelUploadConfirmation: 'Desea cancelar la subida del archivo',
        dictInvalidFileType: 'Formato no aceptado',
        dictMaxFilesExceeded: '1 archivo como maximo',
        dictFileTooBig: 'Imagen muy pesada, 3MB maximo',
        acceptedFiles: '.pdf,.docx,.jpeg,.jpg,.png',
        // paralleUploads:3,
        maxFiles: 1,
        headers: { 'My-Awesome-Header': 'header value' },
        // uploadMultiple:true,
        autoProcessQueue: false,
        // previewTemplate:,
        dictDefaultMessage: 'Subir archivos'
      },
      error: false,
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        nombre: '',
        contenido: '',
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
      apiBase: apiUrl + '/radiologia/list',
      typeOptions: [],
      options: [
        { value: '1', nombre: 'Contenido' }
      ],
      columna: { value: '1', nombre: 'Contenido' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'contenido',
          sortField: 'contenido',
          title: 'Contenido',
          dataClass: 'list-item-heading'
        },
        {
          name: 'nombre',
          sortField: 'nombre',
          title: 'Nombre',
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
      ]
    }
  },
  validations () {
    return {
      form: {
        id_paciente: { required },
        contenido: { required }
      }
    }
  },
  methods: {
    extra (file) {
      let name = file.name
      console.log(name)
    },
    exito (file, response) {
      console.log(response)
      this.onSave(response)
    },
    shootMessage () {
      this.$refs.myVueDropzone.processQueue()
    },
    selectFile () {
      this.file = this.$refs.file.files[0]
      this.message = ''
      this.error = false
    },
    async sendFile () {
      this.$refs.myVueDropzone.processQueue()
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios.post(apiUrl + '/radiologia/upload', formData)
        this.message = 'file has been uploaded'
        this.file = ''
        this.error = false
      } catch (err) {
        this.message = 'something went wrong'
        this.error = true
      }
    },
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
    getRadiology (id) {
      let me = this
      axios.get(apiUrl + `/radiologia/get?id=${id}`)
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
          this.$refs['modal-1-radiology'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
          this.dropzoneVal = false
          this.form.nombre = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-radiology'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
          this.dropzoneVal = false
          this.form.nombre = ''
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
      if (this.$refs.myVueDropzone.dropzone.files.length > 0) {
        if (this.$v.$error !== true) {
          if (action === 'save') {
            this.shootMessage()
          } else if (action === 'update') {
            this.onUpdate()
          }
        }
      } else {
        this.dropzoneVal = true
      }
    },
    setData (data) {
      // Aqui reiniciar variables
      this.dropzoneVal = false
      this.form.id = data.id
      this.form.nombre = data.nombre
      this.form.contenido = data.contenido
      this.form.paciente = data.paciente
      this.form.state = data.estado
      this.form.id_paciente = this.patientId
      this.form.id_usuario = this.currentUser.id
    },
    downloadData (data) {
      window.open(apiUrl + '/documents/' + data.nombre)
    },
    /* Guardar */
    onSave (nombre) {
      const me = this
      me.form.nombre = nombre
      me.form.id_paciente = this.patientId
      axios.post(apiUrl + '/radiologia/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el estudio de radiologia exitosamente'
          me.getRadiology(this.patientId)
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
      axios.put(apiUrl + '/radiologia/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la radiologia exitosamente'
          me.getRadiology(this.patientId)
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
          .put(apiUrl + '/radiologia/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getRadiology(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-radiology'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/radiologia/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getRadiology(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-radiology'].hide()
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
