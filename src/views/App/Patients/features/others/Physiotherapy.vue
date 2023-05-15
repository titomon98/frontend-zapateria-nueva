<template>
  <b-container fluid>
    <b-modal id="modal-1-fisioterapia" ref="modal-1-fisioterapia" title="Agregar">
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
        <b-form-group label="Descripción de terapia:">
          <b-form-textarea
            v-model.trim="$v.form.contenido.$model"
            :state="!$v.form.contenido.$error"
            placeholder="Ingresar la descripción de la fisioterapia"
          ></b-form-textarea>
          <div v-if="$v.form.contenido.required.$invalid" class="invalid-feedback">
            Debe ingresar la descripción de la terapia
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
    <b-modal id="modal-2-fisioterapia" ref="modal-2-fisioterapia" title="Editar">
      <b-form>
        <b-form-group label="Descripción de terapia:">
          <b-form-textarea
            v-model.trim="$v.form.contenido.$model"
            :state="!$v.form.contenido.$error"
            placeholder="Ingresar la descripción de la fisioterapia"
          ></b-form-textarea>
          <div v-if="$v.form.contenido.required.$invalid" class="invalid-feedback">
            Debe ingresar la descripción de la terapia
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
    <b-modal id="modal-3-fisioterapia" ref="modal-3-fisioterapia" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar las indicaciones para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-fisioterapia')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-fisioterapia')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4" ref="modal-4" title="Activar">
      <h6 class="my-4">
        ¿Desea activar las indicaciones para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-results')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="closeModal.hide('modal-4-physiotherapy')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Fisioterapia</h4>
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
            <b-button variant="primary" @click="openModal('save')">AGREGAR INDICACIONES</b-button>
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
                  v-b-tooltip.top="'Editar'"
                  @click="setData(props.rowData)"
                  v-b-modal.modal-2-fisioterapia
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button

                  v-b-tooltip.top="'Generar reporte'"
                  @click="generatePDF(props.rowData)"
                  class="mb-2"
                  size="sm"
                  variant="outline-info"
                  ><i :class="'fas fa-file-alt'"
                /></b-button>
                <b-button
                  v-b-tooltip.top="props.rowData.estado == 1 ? 'Desactivar' : 'Activar'"
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3')
                      : $bvModal.show('modal-4');
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
import JsPDF from 'jspdf'
import moment from 'moment'

export default {
  name: 'Fisioterapia',
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
    this.patientId = this.$route.params.id
    this.getFisioterapia(this.patientId)
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
        contenido: '',
        paciente: [],
        state: 1,
        id_paciente: 1,
        id_usuario: null
      },
      patientId: 0,
      id_usuario: 0,
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      data: [],
      apiBase: apiUrl + '/fisioterapia/list',
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
          title: 'Descripción',
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
    generatePDF (data) {
      var ingreso = moment(data.createdAt).format('DD/MM/YYYY')
      var nacimiento = moment(data.paciente.nacimiento).format('DD/MM/YYYY')
      var doc = new JsPDF({
        unit: 'cm',
        format: [28, 21.5]
      })
      var imgData = this.logo3
      doc.addImage(imgData, 'PNG', 1.5, 1, 4, 4)
      var paragraph = data.contenido
      doc.setFontSize(10).setFont(undefined, 'bold')
      doc.text('Expediente: ' + data.paciente.num_expediente, 6, 2)
      doc.text('Paciente: ' + data.paciente.nombre + ' ' + data.paciente.apellidos, 6, 2.5)
      doc.text('Fecha de ingreso: ' + ingreso, 6, 3)
      doc.text('Fecha de nacimiento: ' + nacimiento, 6, 3.5)
      doc.text('Telefono: ' + data.paciente.telefono, 6, 4)
      doc.text('Generado por: ' + data.usuario.nombre + ' ' + data.usuario.apellidos, 6, 4.5)

      doc.text('Instrucciones de fisioterapia: ', 1.5, 5.5)
      doc.setFontSize(10.5).setFont(undefined, 'normal')
      var lines = doc.splitTextToSize(paragraph, 18)
      doc.text(lines, 1.5, 6, { maxWidth: 18.5, align: 'justify' })
      doc.save('Fisioterapia.pdf')
    },
    getFisioterapia (id) {
      let me = this
      axios.get(apiUrl + `/fisioterapia/get?id=${id}`)
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
          this.$refs['modal-1-fisioterapia'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-fisioterapia'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
      }
    },
    openModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-fisioterapia'].show()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-fisioterapia'].show()
          // Aqui agregar variables
          this.form.id = 0
          this.form.contenido = ''
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
      this.form.contenido = data.contenido
      this.form.paciente = data.paciente
      this.form.state = data.estado
      this.form.id_paciente = this.patientId
      this.form.id_usuario = this.currentUser.id
    },
    /* Guardar */
    onSave () {
      const me = this
      me.form.id_paciente = this.patientId
      axios.post(apiUrl + '/fisioterapia/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se han creado indicaciones exitosamente'
          me.getFisioterapia(this.patientId)
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
      axios.put(apiUrl + '/fisioterapia/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se han actualizado indicaciones exitosamente'
          me.getFisioterapia(this.patientId)
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
          .put(apiUrl + '/fisioterapia/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getFisioterapia(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/fisioterapia/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getFisioterapia(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4'].hide()
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
