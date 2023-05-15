<template>
    <b-modal ref="patientModal" title="Seleccione al paciente" size="xl" no-close-on-backdrop>
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
          <b-form-group>
            <div class="iq-search-bar mt-2">
              <div class="row">
                <div class="col-sm">
                  <b-form action="#" class="searchbox">
                    <b-form-input type="text" size="sm" id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
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
            <vuetable
              ref="vuetable"
              class="table-divided table-responsive order-with-arrow"
              :query-params="makeQueryParams"
              :api-url="apiBase"
              :per-page="perPage"
              :reactive-api-url="true"
              :fields="fields"
              pagination-path
              @vuetable:row-clicked="rowClicked"
              @vuetable:pagination-data="onPaginationData"
            >
              <template slot="actions" slot-scope="props">
                  <b-form-checkbox
                  :checked="selectedItems.includes(props.rowData.id)"
                  class="itemCheck mb-0"
                  @change="rowClicked(props.rowData)"
                  ></b-form-checkbox>
              </template>
            </vuetable>
            <vuetable-pagination-bootstrap
              ref="pagination"
              @vuetable-pagination:change-page="onChangePage"
            />
          </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="danger" @click="closeModal"
          >Cerrar</b-button
        >
      </template>
    </b-modal>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import { apiUrl } from '../../../../config/constant'
import VuetablePaginationBootstrap from '../../../../components/common/VuetablePaginationBootstrap'

export default ({
  name: 'PatientModal',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap
    // 'datatable-heading': DatatableHeading
  },
  props: [
    'patientEdit'
  ],
  beforeMount () {
    this.setPatient()
  },
  setup () {
    return { $v: useVuelidate() }
  },
  data () {
    return {
      patient: [],
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      items: [],
      apiBase: apiUrl + '/paciente/list',
      selectedItems: [],
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'apellidos', nombre: 'Apellido' },
        { value: 'cui', nombre: 'CUI' },
        { value: 'num_expediente', nombre: 'Expediente' },
        { value: 'telefono', nombre: 'Teléfono' }
      ],
      columna: { value: 'nombre', nombre: 'Nombre' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: '',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading',
          callback: function (value, item) {
            if (value.apellido_casada) {
              return `${value.nombre}  ${value.apellidos}  ${value.apellido_casada}`
            } else {
              return `${value.nombre}  ${value.apellidos} `
            }
          }
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
          name: 'sexo',
          sortField: 'sexo',
          title: 'Sexo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'num_expediente',
          sortField: 'num_expediente',
          title: 'No. expediente',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_sangres.nombre',
          sortField: 'tipo_sangre.nombre',
          title: 'Tipo sangre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cui',
          sortField: 'cui',
          title: 'CUI',
          dataClass: 'list-item-heading'
        },
        {
          name: 'estado_civil',
          sortField: 'estado_civil',
          title: 'Estado civil',
          dataClass: 'list-item-heading'
        },
        {
          name: 'idiomas.nombre',
          sortField: 'idioma.nombre',
          title: 'Idioma',
          dataClass: 'list-item-heading'
        },
        {
          name: 'nacionalidades.nombre',
          sortField: 'nacionalidades.nombre',
          title: 'Nacionalidad',
          dataClass: 'list-item-heading'
        }
      ],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: ''
    }
  },
  methods: {
    onClickCheck () {
      console.log('hola')
    },
    openModal () {
      this.$refs['patientModal'].show()
    },
    closeModal () {
      this.$refs['patientModal'].hide()
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
    rowClicked (dataItem, event) {
      const itemId = dataItem.id
      if (!this.selectedItems.includes(itemId) && this.selectedItems.length === 0) {
        this.selectedItems.push(itemId)
        this.patient = dataItem
        this.$emit('patient', this.patient)
      } else if (this.selectedItems.includes(itemId) && this.selectedItems.length === 1) {
        this.selectedItems.pop(itemId)
        this.patient = ''
        this.$emit('patient', this.patient)
      } else {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'Solo puede seleccionar un paciente'
      }
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    },
    setPatient () {
      if (this.patientEdit) {
        this.patient = this.patientEdit
        this.selectedItems.push(this.patientEdit.id)
      } else {
        this.patient = []
        this.selectedItems = []
      }
    }
  }
})
</script>
