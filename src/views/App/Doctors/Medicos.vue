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
    <b-modal id="modal-1-doctors" ref="modal-1-doctors" title="Agregar médico">
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
         <b-form-group label="Tipo:">
          <v-select
            name="type"
            v-model="$v.form.type.$model"
            :state="!$v.form.type.$error"
            :options="types"
            label="nombre"
            placeholder="Seleccione el tipo"
          />
          <div v-if="$v.form.type.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de médico
          </div>
         </b-form-group>
         <b-form-group label="Especilidad:">
          <v-select
            name="type"
            v-model="$v.form.specialty.$model"
            :state="!$v.form.specialty.$error"
            :options="specialties"
            label="nombre"
            placeholder="Seleccione la especialidad"
          />
          <div v-if="$v.form.specialty.$error" class="invalid-feedback-vselect">
            Debe seleccionar la especidalidad
          </div>
         </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar el nombre del médico"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Apellido:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar el apellido del médico"
          ></b-form-input>
          <div v-if="$v.form.secondName.required.$invalid" class="invalid-feedback">
            Debe ingresar el apellido
          </div>
        </b-form-group>
        <b-form-group label="Teléfono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar el teléfono del médico"
          ></b-form-input>
          <div v-if="$v.form.phoneNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de teléfono
          </div>
          <div v-if="$v.form.phoneNumber.numeric.$invalid" class="invalid-feedback">
            Debe ingresar solamente números
          </div>
        </b-form-group>
        <b-form-group label="Correo:">
          <b-form-input
            v-model.trim="$v.form.email.$model"
            :state="!$v.form.email.$error"
            placeholder="Ingresar el correo del médico"
          ></b-form-input>
          <div v-if="$v.form.email.email.$invalid" class="invalid-feedback">
            Debe ingresar un correo válido
          </div>
        </b-form-group>
        <b-form-group label="Número de colegiado:">
          <b-form-input
            v-model.trim="$v.form.collegeNumber.$model"
            :state="!$v.form.collegeNumber.$error"
            placeholder="Ingresar el número de colegiado"
          ></b-form-input>
          <div v-if="$v.form.collegeNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de colegiado
          </div>
        </b-form-group>
        <b-form-group label="Dirección:">
          <b-form-input
            v-model.trim="$v.form.address.$model"
            :state="!$v.form.address.$error"
            placeholder="Ingresar la dirección"
          ></b-form-input>
          <div v-if="$v.form.address.required.$invalid" class="invalid-feedback">
            Debe ingresar su dirección
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
    <b-modal id="modal-2-doctors" ref="modal-2-doctors" title="Editar médico">
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
         <b-form-group label="Tipo:">
          <v-select
            name="type"
            v-model="$v.form.type.$model"
            :state="!$v.form.type.$error"
            :options="types"
            label="nombre"
            placeholder="Seleccione el tipo"
          />
          <div v-if="$v.form.type.$error" class="invalid-feedback-vselect">
            Debe seleccionar el tipo de médico
          </div>
         </b-form-group>
         <b-form-group label="Especilidad:">
          <v-select
            name="type"
            v-model="$v.form.specialty.$model"
            :state="!$v.form.specialty.$error"
            :options="specialties"
            label="nombre"
            placeholder="Seleccione la especialidad"
          />
          <div v-if="$v.form.specialty.$error" class="invalid-feedback-vselect">
            Debe seleccionar la especidalidad
          </div>
         </b-form-group>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar el nombre del médico"
          ></b-form-input>
          <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div>
        </b-form-group>
        <b-form-group label="Apellido:">
          <b-form-input
            v-model.trim="$v.form.secondName.$model"
            :state="!$v.form.secondName.$error"
            placeholder="Ingresar el apellido del médico"
          ></b-form-input>
          <div v-if="$v.form.secondName.required.$invalid" class="invalid-feedback">
            Debe ingresar el apellido
          </div>
        </b-form-group>
        <b-form-group label="Teléfono:">
          <b-form-input
            v-model.trim="$v.form.phoneNumber.$model"
            :state="!$v.form.phoneNumber.$error"
            placeholder="Ingresar el teléfono del médico"
          ></b-form-input>
          <div v-if="$v.form.phoneNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de teléfono
          </div>
          <div v-if="$v.form.phoneNumber.numeric.$invalid" class="invalid-feedback">
            Debe ingresar solamente números
          </div>
        </b-form-group>
        <b-form-group label="Correo:">
          <b-form-input
            v-model.trim="$v.form.email.$model"
            :state="!$v.form.email.$error"
            placeholder="Ingresar el correo del médico"
          ></b-form-input>
          <div v-if="$v.form.email.email.$invalid" class="invalid-feedback">
            Debe ingresar un correo válido
          </div>
        </b-form-group>
        <b-form-group label="Número de colegiado:">
          <b-form-input
            v-model.trim="$v.form.collegeNumber.$model"
            :state="!$v.form.collegeNumber.$error"
            placeholder="Ingresar el número de colegiado"
          ></b-form-input>
          <div v-if="$v.form.collegeNumber.required.$invalid" class="invalid-feedback">
            Debe ingresar el numero de colegiado
          </div>
        </b-form-group>
        <b-form-group label="Dirección:">
          <b-form-input
            v-model.trim="$v.form.address.$model"
            :state="!$v.form.address.$error"
            placeholder="Ingresar la dirección"
          ></b-form-input>
          <div v-if="$v.form.address.required.$invalid" class="invalid-feedback">
            Debe ingresar su dirección
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
    <b-modal id="modal-3-doctors" ref="modal-3-doctors" title="Desactivar médico">
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
        ¿Desea desactivar al médico: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
          $bvModal.hide('modal-3-doctors')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-doctors')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-doctors" ref="modal-4-doctors" title="Activar médico">
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
        ¿Desea activar al médico: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-doctors')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-doctors')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Médicos</h4>
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
            <b-button variant="primary"  v-b-modal.modal-1-doctors>AGREGAR NUEVO</b-button>
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
                    v-b-modal.modal-2-doctors
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
                        ? $bvModal.show('modal-3-doctors')
                        : $bvModal.show('modal-4-doctors');
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
import { required, email, numeric } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'

export default {
  name: 'Medics',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    axios.get(apiUrl + '/specialty/get').then((response) => {
      this.specialties = response.data
    })
    axios.get(apiUrl + '/tipo_medico/get').then((response) => {
      this.types = response.data
    })
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
        secondName: '',
        phoneNumber: '',
        email: '',
        collegeNumber: '',
        address: '',
        type: [],
        specialty: [],
        state: 1
      },
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'apellido', nombre: 'Apellido' },
        { value: 'colegiado', nombre: 'Colegiado' },
        { value: 'telefono', nombre: 'Teléfono' },
        { value: 'especialidad', nombre: 'Especialidad' },
        { value: 'tipo', nombre: 'Tipo' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      specialties: [],
      types: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/medico/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'nombre',
          sortField: 'name',
          title: 'Nombre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'apellido',
          sortField: 'apellidos',
          title: 'Apellido',
          dataClass: 'list-item-heading'
        },
        {
          name: 'telefono',
          sortField: 'telefono',
          title: 'Teléfono',
          dataClass: 'list-item-heading'
        },
        {
          name: 'correo',
          sortField: 'correo',
          title: 'Correo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'colegiado',
          sortField: 'num_colegiado',
          title: 'No. colegiado',
          dataClass: 'list-item-heading'
        },
        {
          name: 'direccion',
          sortField: 'address',
          title: 'Direccion',
          dataClass: 'list-item-heading'
        },
        {
          name: 'especialidade.nombre',
          sortField: 'specialty',
          title: 'Especialidad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_medico.nombre',
          sortField: 'type',
          title: 'Tipo',
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
        name: {
          required
        },
        secondName: {
          required
        },
        phoneNumber: {
          required, numeric
        },
        email: {
          email
        },
        collegeNumber: {
          required, numeric
        },
        address: {
          required
        },
        type: {
          required
        },
        specialty: {
          required
        }
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
          this.form.name = ''
          this.form.secondName = ''
          this.form.phoneNumber = ''
          this.form.email = ''
          this.form.collegeNumber = ''
          this.form.address = ''
          this.form.state = 1
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-doctors'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.secondName = ''
          this.form.phoneNumber = ''
          this.form.email = ''
          this.form.collegeNumber = ''
          this.form.address = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-doctors'].hide()
          this.form.id = 0
          this.form.name = ''
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
      this.form.name = data.nombre
      this.form.secondName = data.apellido
      this.form.phoneNumber = data.telefono
      this.form.email = data.correo
      this.form.collegeNumber = data.colegiado
      this.form.address = data.direccion
      this.form.state = data.estado
      this.form.id = data.id
      this.form.specialty = data.especialidade
      this.form.type = data.tipo_medico
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/medico/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado el médico ' + me.form.name + ' exitosamente'
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
      axios.put(apiUrl + '/medico/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado el médico ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/medico/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado el médico ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-doctors'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/medico/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado el médico ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-doctors'].hide()
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
    changeTypeSearch (columna) {
      this.columna = columna
    }
  }
}
</script>
