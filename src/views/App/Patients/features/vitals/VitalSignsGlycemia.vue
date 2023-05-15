<template>
  <b-container fluid>
    <b-modal id="modal-1-vitalsgly" ref="modal-1-vitalsgly" title="Agregar">
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
        <b-form-group label="Fecha vital:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_vital.$model"
            :state="!$v.form.fecha_vital.$error"
            placeholder="Ingresar fecha vital"
          ></b-form-input>
          <div v-if="$v.form.fecha_vital.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha vital
          </div>
        </b-form-group>
        <b-form-group label="Glucosa Sanguínea (RBS mg/dL):">
          <b-form-input
            v-model.trim="$v.form.glucosa_sanguinea.$model"
            :state="!$v.form.glucosa_sanguinea.$error"
            placeholder="Ingresar Glucosa Sanguínea"
          ></b-form-input>
          <div v-if="$v.form.glucosa_sanguinea.required.$invalid" class="invalid-feedback">
            Debe ingresar Glucosa Sanguínea
          </div>
        </b-form-group>
        <b-form-group label="RBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.rbs.$model"
            :state="!$v.form.rbs.$error"
            placeholder="Ingresar el valor de rbs"
          ></b-form-input>
          <div v-if="$v.form.rbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de rbs
          </div>
        </b-form-group>
        <b-form-group label="FBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.fbs.$model"
            :state="!$v.form.fbs.$error"
            placeholder="Ingresar el valor de fbs"
          ></b-form-input>
          <div v-if="$v.form.fbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de fbs
          </div>
        </b-form-group>
        <b-form-group label="PPBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.ppbs.$model"
            :state="!$v.form.ppbs.$error"
            placeholder="Ingresar el valor de ppbs"
          ></b-form-input>
          <div v-if="$v.form.ppbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de ppbs
          </div>
        </b-form-group>
        <b-form-group label="HbA1c (%):">
          <b-form-input
            v-model.trim="$v.form.hba1c.$model"
            :state="!$v.form.hba1c.$error"
            placeholder="Ingresar el valor de hba1c"
          ></b-form-input>
          <div v-if="$v.form.hba1c.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de hba1c
          </div>
        </b-form-group>
        <b-form-group label="Insulina regular:">
          <b-form-input
            v-model.trim="$v.form.insulina_regular.$model"
            :state="!$v.form.insulina_regular.$error"
            placeholder="Ingresar el valor de insulina regular"
          ></b-form-input>
          <div v-if="$v.form.insulina_regular.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de insulina regular
          </div>
        </b-form-group>
        <b-form-group label="Intermediario de insulina:">
          <b-form-input
            v-model.trim="$v.form.intermediario_insulina.$model"
            :state="!$v.form.intermediario_insulina.$error"
            placeholder="Ingresar el intermediario de insulina"
          ></b-form-input>
          <div v-if="$v.form.intermediario_insulina.required.$invalid" class="invalid-feedback">
            Debe ingresar el intermediario de insulina
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
    <b-modal id="modal-2-vitalsgly" ref="modal-2-vitalsgly" title="Editar">
      <b-form>
        <b-form-group label="Fecha vital:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha_vital.$model"
            :state="!$v.form.fecha_vital.$error"
            placeholder="Ingresar fecha vital"
          ></b-form-input>
          <div v-if="$v.form.fecha_vital.required.$invalid" class="invalid-feedback">
            Debe ingresar la fecha vital
          </div>
        </b-form-group>
        <b-form-group label="Glucosa Sanguínea (RBS mg/dL):">
          <b-form-input
            v-model.trim="$v.form.glucosa_sanguinea.$model"
            :state="!$v.form.glucosa_sanguinea.$error"
            placeholder="Ingresar Glucosa Sanguínea"
          ></b-form-input>
          <div v-if="$v.form.glucosa_sanguinea.required.$invalid" class="invalid-feedback">
            Debe ingresar Glucosa Sanguínea
          </div>
        </b-form-group>
        <b-form-group label="RBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.rbs.$model"
            :state="!$v.form.rbs.$error"
            placeholder="Ingresar el valor de rbs"
          ></b-form-input>
          <div v-if="$v.form.rbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de rbs
          </div>
        </b-form-group>
        <b-form-group label="FBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.fbs.$model"
            :state="!$v.form.fbs.$error"
            placeholder="Ingresar el valor de fbs"
          ></b-form-input>
          <div v-if="$v.form.fbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de fbs
          </div>
        </b-form-group>
        <b-form-group label="PPBS (mg/dL):">
          <b-form-input
            v-model.trim="$v.form.ppbs.$model"
            :state="!$v.form.ppbs.$error"
            placeholder="Ingresar el valor de ppbs"
          ></b-form-input>
          <div v-if="$v.form.ppbs.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de ppbs
          </div>
        </b-form-group>
        <b-form-group label="HbA1c (%):">
          <b-form-input
            v-model.trim="$v.form.hba1c.$model"
            :state="!$v.form.hba1c.$error"
            placeholder="Ingresar el valor de hba1c"
          ></b-form-input>
          <div v-if="$v.form.hba1c.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de hba1c
          </div>
        </b-form-group>
        <b-form-group label="Insulina regular:">
          <b-form-input
            v-model.trim="$v.form.insulina_regular.$model"
            :state="!$v.form.insulina_regular.$error"
            placeholder="Ingresar el valor de insulina regular"
          ></b-form-input>
          <div v-if="$v.form.insulina_regular.required.$invalid" class="invalid-feedback">
            Debe ingresar el valor de insulina regular
          </div>
        </b-form-group>
        <b-form-group label="Intermediario de insulina:">
          <b-form-input
            v-model.trim="$v.form.intermediario_insulina.$model"
            :state="!$v.form.intermediario_insulina.$error"
            placeholder="Ingresar el intermediario de insulina"
          ></b-form-input>
          <div v-if="$v.form.intermediario_insulina.required.$invalid" class="invalid-feedback">
            Debe ingresar el intermediario de insulina
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
        <b-button  variant="primary" @click="onValidate('update')"
          >Agregar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-vitalsgly" ref="modal-3-vitalsgly" title="Desactivar">
      <h6 class="my-4">
        ¿Desea desactivar el registro para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-vitalsgly')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-vitalsgly')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-vitalsgly" ref="modal-4-vitalsgly" title="Activar">
      <h6 class="my-4">
        ¿Desea activar el registro para el paciente?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-4-vitalsgly')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-vitalsgly')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Signos Vitales Glicemia</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-vitalsgly>AGREGAR REGISTRO</b-button>
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
                  v-b-modal.modal-2-vitalsgly
                  class="mb-2"
                  size="sm"
                  variant="outline-warning"
                  ><i :class="'fas fa-pencil-alt'"
                /></b-button>
                <b-button
                  @click="
                    setData(props.rowData);
                    props.rowData.estado == 1
                      ? $bvModal.show('modal-3-vitalsgly')
                      : $bvModal.show('modal-4-vitalsgly');
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
  name: 'VitalSignsGlycemia',
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
    // this.getVitals(this.patientId)
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
        fecha_vital: '',
        glucosa_sanguinea: '',
        rbs: '',
        fbs: '',
        ppbs: '',
        hba1c: '',
        insulina_regular: '',
        intermediario_insulina: '',
        notas: '',
        paciente: [],
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
      apiBase: apiUrl + '/vitales_glicemia/list',
      typeOptions: [],
      options: [
        { value: 'glucosa_sanguinea', nombre: 'Glucosa Sanguinea' }
      ],
      columna: { value: 'glucosa_sanguinea', nombre: 'Glucosa Sanguinea' },
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
          name: 'glucosa_sanguinea',
          sortField: 'glucosa_sanguinea',
          title: 'Glucosa Sanguinea',
          dataClass: 'list-item-heading'
        },
        {
          name: 'insulina_regular',
          sortField: 'insulina_regular',
          title: 'Insulina regular',
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
      ]
    }
  },
  validations () {
    return {
      form: {
        fecha_vital: { required },
        glucosa_sanguinea: { required },
        rbs: { required },
        fbs: { required },
        ppbs: { required },
        hba1c: { required },
        insulina_regular: { required },
        intermediario_insulina: { required },
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
    getVitals (id) {
      let me = this
      axios.get(apiUrl + `/vitales_glicemia/get?id=${id}`)
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
          this.$refs['modal-1-vitalsgly'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.fecha_vital = ''
          this.form.glucosa_sanguinea = ''
          this.form.rbs = ''
          this.form.fbs = ''
          this.form.ppbs = ''
          this.form.hba1c = ''
          this.form.insulina_regular = ''
          this.form.intermediario_insulina = ''
          this.form.notas = ''
          this.form.paciente = []
          this.form.state = 1
          this.form.id_paciente = 0
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-vitalsgly'].hide()
          // Aqui agregar variables
          this.form.id = 0
          this.form.fecha_vital = ''
          this.form.glucosa_sanguinea = ''
          this.form.rbs = ''
          this.form.fbs = ''
          this.form.ppbs = ''
          this.form.hba1c = ''
          this.form.insulina_regular = ''
          this.form.intermediario_insulina = ''
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
      this.form.fecha_vital = data.fecha_vital
      this.form.glucosa_sanguinea = data.glucosa_sanguinea
      this.form.rbs = data.rbs
      this.form.fbs = data.fbs
      this.form.ppbs = data.ppbs
      this.form.hba1c = data.hba1c
      this.form.insulina_regular = data.insulina_regular
      this.form.intermediario_insulina = data.intermediario_insulina
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
      axios.post(apiUrl + '/vitales_glicemia/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el registro exitosamente'
          me.getVitals(this.patientId)
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
      axios.put(apiUrl + '/vitales_glicemia/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el registro exitosamente'
          me.getVitals(this.patientId)
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
          .put(apiUrl + '/vitales_glicemia/deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.getVitals(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-3-vitalsgly'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/vitales_glicemia/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.getVitals(this.patientId)
            me.$refs.vuetableDiagnosis.refresh()
            me.$refs['modal-4-vitalsgly'].hide()
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
