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
    <b-modal id="modal-pdf" ref="modal-pdf" title="Generar PDF" size="xl">
      <div id="previewContainer">
        <iframe :src="previewURL" width="100%" height="700px"></iframe>
      </div>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="descargarpdf()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('pdf')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-1-tallas" size="lg" ref="modal-1-tallas" title="Agregar tallas">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-form @submit="$event.preventDefault()">
        <b-row class="ml-2">
          <b-col md="4">
            <b-form-group label="Tienda:">
              <v-select
                name="tienda"
                v-model="form.tienda"
                :options="tiendas"
                :filterable="false"
                placeholder="Seleccione la tienda"
                @search="onSearchTiendas"
              >
                <template v-slot:spinner="{ loading }">
                  <div v-show="loading">Cargando...</div>
                </template>
                <template v-slot:option="option">
                  {{ option.nombre }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  {{ option.nombre }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-radio v-model="form.corrida" value="PRIMERA" name="customRadio1">Primera corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="SEGUNDA" name="customRadio1">Segunda corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="TERCERA" name="customRadio1">Tercera corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="CUARTA" name="customRadio1">Cuarta corrida</b-form-radio>
            <b-form-radio v-model="form.corrida" value="QUINTA" name="customRadio1">Quinta corrida</b-form-radio>
          </b-col>
          <b-col md="4">
            <b-button  variant="dark" @click="addTallas()"
              >Generar tallas</b-button
            >
          </b-col>
        </b-row>
        <b-row class="ml-2">
          <br>
          <br>
          <table class="table table-hover product_item_list c_table theme-color mb-0">
            <thead>
                <tr>
                    <th>Talla</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="details in corridas" :key="details.id">
                  <td v-text="details.talla"></td>
                  <td>
                    <b-form-input
                      v-model="details.cantidad"
                      placeholder="Ingresar cantidad"
                    ></b-form-input>
                  </td>
                </tr>
            </tbody>
          </table>
        </b-row>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidate('save')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-2-tallas" ref="modal-2-tallas" title="Ver tallas">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-form @submit="$event.preventDefault()">
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="form.name"
            placeholder="Ingresar nombre de talla"
          ></b-form-input>

        </b-form-group>

      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidate('update')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('update')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-3-tallas" ref="modal-3-tallas" title="Desactivar talla">
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
        ¿Desea desactivar la talla: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-3-tallas')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-tallas')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-tallas" ref="modal-4-tallas" title="Activar talla">
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
        ¿Desea activar la talla: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-tallas')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-tallas')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Reportes de tallas</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
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
                    v-b-tooltip.top="'Reporte general de tallas por mes'"
                    @click="setDataConciliacion(props.rowData)"
                    v-b-modal.modal-date-2-conciliacion
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-print'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Reporte de tallas de zapato excel'"
                    @click="setTallasExcel(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-success"
                    ><i :class="'fas fa-table'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Reporte de tallas de zapato pdf'"
                    @click="setTallasPdf(props.rowData)"
                    class="mb-2"
                    size="sm"
                    variant="outline-danger"
                    ><i :class="'fa fa-file-pdf-o'"
                  /></b-button>
                  <b-button
                    v-b-tooltip.top="'Reporte de general de tallas por fechas'"
                    @click="setDataConciliacionCuadratica(props.rowData)"
                    v-b-modal.modal-date-4
                    class="mb-2"
                    size="sm"
                    variant="outline-info"
                    ><i :class="'fas fa-file'"
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
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import ExcelJS from 'exceljs'
import JsPDF from 'jspdf'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'TallasData',
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
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      pdf: new JsPDF(),
      pdfName: '',
      previewURL: '',
      currentDate: null,
      tallas: [],
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      corridas: [],
      tiendas: [],
      form: {
        id: 0,
        corrida: 'PRIMERA',
        tienda: null,
        state: 1
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/zapatos/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'estilo',
          sortField: 'estilo',
          title: 'Estilo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_costo',
          sortField: 'precio_costo',
          title: 'Costo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_venta',
          sortField: 'precio_venta',
          title: 'Precio venta',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_minimo',
          sortField: 'precio_minimo',
          title: 'Precio minimo',
          dataClass: 'list-item-heading'
        },
        {
          name: 'precio_mayorista',
          sortField: 'precio_mayorista',
          title: 'Precio mayorista',
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
        corrida: { required }
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
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-tallas'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-tallas'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.precio = ''
          this.form.state = 1
          this.corridas = []
          this.form.tienda = null
          break
        }
        case 'pdf': {
          this.$refs['modal-pdf'].hide()
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
      this.form.precio = data.precio
      this.form.state = data.estado
      this.form.id = data.id
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/tallas/create', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'success'
          me.showAlert()
          me.alertText = 'Se ha creado la talla ' + me.form.name + ' exitosamente'
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
      axios.put(apiUrl + '/tallas/update', {
        form: me.form })
        .then((response) => {
          me.alertVariant = 'primary'
          me.showAlert()
          me.alertText = 'Se ha actualizado la talla ' + me.form.name + ' exitosamente'
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
          .put(apiUrl + '/tallas/deactivate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'warning'
            me.showAlert()
            me.alertText = 'Se ha desactivado la talla ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-3-tallas'].hide()
          })
          .catch((error) => {
            me.alertVariant = 'danger'
            me.showAlertError()
            me.alertErrorText = 'Ha ocurrido un error, por favor intente más tarde'
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '/tallas/activate', {
            id: this.form.id
          })
          .then((response) => {
            me.alertVariant = 'info'
            me.showAlert()
            me.alertText = 'Se ha activado la talla ' + me.form.name + ' exitosamente'
            me.$refs.vuetable.refresh()
            me.$refs['modal-4-tallas'].hide()
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
          search: this.search
        }
        : {
          criterio: sortOrder[0] ? sortOrder[0].sortField : 'createdAt',
          order: sortOrder[0] ? sortOrder[0].direction : 'desc',
          page: currentPage,
          limit: this.perPage,
          search: this.search
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
    searchingTiendas (search, loading) {
      axios.get(apiUrl + '/tiendas/getSelect',
        {
          params: {
            search: search
          }
        }
      ).then((response) => {
        this.tiendas = response.data
        loading(false)
      })
    },
    onSearchTiendas (search, loading) {
      if (search.length) {
        loading(true)
        this.searchingTiendas(search, loading)
      }
    },
    async setTallasExcel (data) {
      await axios.get(apiUrl + '/reporte/tallas',
        {
          params: {
            id_zapato: data.id
          }
        }).then((response) => {
        this.tallas = response.data
        this.currentDate = new Date().toLocaleDateString('es-ES')
        // Inicio tamanio columnas
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Reporte especifico')
        let column
        column = worksheet.getColumn('A')
        column.width = 20
        column = worksheet.getColumn('B')
        column.width = 20
        column = worksheet.getColumn('C')
        column.width = 20
        column = worksheet.getColumn('D')
        column.width = 20
        column = worksheet.getColumn('E')
        column.width = 20
        // Fin tamanio columnas
        worksheet.mergeCells('A1:E1')
        worksheet.mergeCells('A2:E2')
        worksheet.getCell('A1').value = 'Reporte de tallas'
        worksheet.getCell('A2').value = 'Generado por: ' + this.currentUser.user + ' con fecha ' + this.currentDate
        worksheet.getCell('A3').font = { bold: true }
        worksheet.getCell('B3').font = { bold: true }
        worksheet.getCell('C3').font = { bold: true }
        worksheet.getCell('D3').font = { bold: true }
        worksheet.getCell('E3').font = { bold: true }
        worksheet.getCell('A3').value = 'Estilo'
        worksheet.getCell('B3').value = 'Código'
        worksheet.getCell('C3').value = 'Cantidad'
        worksheet.getCell('D3').value = 'Tienda'
        worksheet.getCell('E3').value = 'Talla'
        // Cuerpo del reporte
        let fila = 4
        for (let i = 0; i < this.tallas.length; i++) {
          const element = this.tallas[i]
          worksheet.getCell('A' + fila).value = element.zapato.estilo
          worksheet.getCell('B' + fila).value = element.codigo
          worksheet.getCell('C' + fila).value = element.cantidad
          worksheet.getCell('D' + fila).value = element.tienda.nombre
          worksheet.getCell('E' + fila).value = element.talla
          fila++
        }

        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'Tallas.xlsx'
          link.click()
        })
      })
    },
    async setTallasPdf (data) {
      console.log(data)
      await axios.get(apiUrl + '/reporte/tallas',
        {
          params: {
            id_zapato: data.id
          }
        }).then((response) => {
        console.log(response.data)
        this.tallas = response.data
        this.$refs['modal-pdf'].show()
        var altura = 2
        var ahora = new Date()

        this.pdf = new JsPDF({
          unit: 'cm',
          format: [28, 21.5]
        })
        var ingreso = moment(ahora).format('DD/MM/YYYY')
        this.pdf.setFontSize(10).setFont(undefined, 'bold')
        this.pdf.text('Reporte de tallas', 6, altura)
        altura = altura + 0.5
        this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
        altura = altura + 0.5
        this.pdf.text('Generado por: ', 6, altura)
        this.pdf.setFontSize(10).setFont(undefined, 'normal')
        this.pdf.text(this.currentUser.user, 8.5, altura)
        altura = altura + 0.5
        this.pdf.setFontSize(10).setFont(undefined, 'bold')
        altura = altura + 2
        this.pdf.text('Estilo', 2, altura)
        this.pdf.text('Código', 6, altura)
        this.pdf.text('Cantidad', 10, altura)
        this.pdf.text('Tienda', 14, altura)
        this.pdf.text('Talla', 18, altura)
        this.pdf.setFontSize(10).setFont(undefined, 'normal')
        altura = altura + 0.5
        for (let i = 0; i < this.tallas.length; i++) {
          const element = this.tallas[i]

          this.pdf.text(element.zapato.estilo, 2, altura)
          this.pdf.text(element.codigo, 6, altura)
          this.pdf.text(element.cantidad, 10, altura)
          this.pdf.text(element.tienda.nombre, 14, altura)
          this.pdf.text(element.talla, 18, altura)
          altura = altura + 0.5
          if (altura > 25) {
            this.pdf.addPage()
            altura = 2
            this.pdf.setFontSize(12).setFont(undefined, 'bold')
            this.pdf.text('Fecha de generación: ' + ingreso, 6, altura)
            altura = altura + 0.5
            this.pdf.text('Generado por: ', 6, altura)
            this.pdf.setFontSize(10).setFont(undefined, 'normal')
            this.pdf.text(this.currentUser.user, 8.5, altura)
            altura = altura + 3
          }
        }
        altura = altura + 0.5
        var pdfData = this.pdf.output('blob')
        // Convert PDF to data URL
        var pdfURL = URL.createObjectURL(pdfData)
        this.previewURL = pdfURL
        this.pdfName = 'Tallas.pdf'
      })
    },
    descargarpdf () {
      this.pdf.save(this.pdfName)
    }
  }
}
</script>
