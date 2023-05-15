<template>
    <b-modal ref="examModal" title="Seleccione el examen" size="lg" no-close-on-backdrop>
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
              class="table-divided order-with-arrow"
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
  name: 'ExamModal',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap
    // 'datatable-heading': DatatableHeading
  },
  props: [
    'examEdit'
  ],
  beforeMount () {
    this.setExam()
  },
  setup () {
    return { $v: useVuelidate() }
  },
  data () {
    return {
      exam: [],
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      items: [],
      apiBase: apiUrl + '/examen/list',
      selectedItems: [],
      options: [
        { value: 'nombre', nombre: 'Nombre' },
        { value: 'tipoExamen', nombre: 'Tipo examen' }
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
          name: 'nombre',
          sortField: 'nombre',
          title: 'Nombre',
          dataClass: 'list-item-heading'
        },
        {
          name: 'tipo_examene.nombre',
          sortField: 'tipoexamene.nombre',
          title: 'Tipo de examen',
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
    openModal () {
      this.$refs['examModal'].show()
    },
    closeModal () {
      this.$refs['examModal'].hide()
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
        this.exam = dataItem
        this.$emit('exam', this.exam)
      } else if (this.selectedItems.includes(itemId) && this.selectedItems.length === 1) {
        this.selectedItems.pop(itemId)
        this.exam = ''
        this.$emit('exam', this.exam)
      } else {
        this.alertVariant = 'danger'
        this.showAlertError()
        this.alertErrorText = 'Solo puede seleccionar un examen'
      }
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    },
    changeTypeSearch (columna) {
      this.columna = columna
    },
    setExam () {
      if (this.examEdit) {
        this.exam = this.examEdit
        this.selectedItems.push(this.examEdit.id)
      } else {
        this.exam = []
        this.selectedItems = []
      }
    }
  }
})
</script>
