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
    <b-modal id="modal-1-tallas-list" ref="modal-1-tallas-list" title="Agregar talla">
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
        <b-form-group label="Cantidad:">
          <b-form-input
            v-model.trim="$v.form.cantidad.$model"
            :state="!$v.form.cantidad.$error"
            placeholder="Ingresar cantidad de la talla"
          ></b-form-input>
          <div v-if="$v.form.cantidad.required.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad de la talla
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.codigo.$model"
            :state="!$v.form.codigo.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vuebarcode
            :value="form.codigo"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vuebarcode>
          <div v-if="$v.form.codigo.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
          </div>
        </b-form-group>
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
    <b-modal id="modal-2-tallas-list" ref="modal-2-tallas-list" title="Editar talla">
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
        <b-form-group label="Cantidad:">
          <b-form-input
            v-model.trim="$v.form.cantidad.$model"
            :state="!$v.form.cantidad.$error"
            placeholder="Ingresar cantidad de la talla"
          ></b-form-input>
          <div v-if="$v.form.cantidad.required.$invalid" class="invalid-feedback">
            Debe ingresar la cantidad de la talla
          </div>
        </b-form-group>
        <b-form-group label="Codigo:">
          <b-form-input
            v-model.trim="$v.form.codigo.$model"
            :state="!$v.form.codigo.$error"
            placeholder="Ingresar codigo"
          ></b-form-input>
          <template>
            <b-button
              class="mb-2"
              block
              variant="success default"
              @click="openModal('code')"
            >
              Generar código <i class="zmdi zmdi-shuffle" />
            </b-button>
          </template>
          <br />
          <vuebarcode
            :value="form.codigo"
            align="center"
            :options="{ lineColor: '#0000', text: 'Scan' }"
          > </vuebarcode>
          <div v-if="$v.form.codigo.required.$invalid" class="invalid-feedback">
            Debe ingresar el codigo
          </div>
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
    <b-modal id="modal-3-tallas-list" ref="modal-3-tallas-list" title="Desactivar talla">
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
                  $bvModal.hide('modal-3-tallas-list')"
          >Desactivar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-3-tallas-list')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-4-tallas-list" ref="modal-4-tallas-list" title="Activar talla">
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
        ¿Desea activar la tallar: {{ form.name }} ?
      </h6>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="onState()
                  $bvModal.hide('modal-4-tallas-list')"
          >Activar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-4-tallas-list')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modal-codigo-tallas-list" ref="modal-codigo-tallas-list" title="Imprimir codigo">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <vuebarcode
        :value="barcode_data"
        ref="vuebarcode"
        align="center"
        :options="{ lineColor: '#0000', text: 'Scan' }"
      > </vuebarcode>
      <template #modal-footer="{}">
        <b-button
          type="submit"
          variant="primary"
          @click="imprimirCodigo()"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="$bvModal.hide('modal-codigo-tallas-list')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title mt-3">Listado de tallas</h4>
               <div class="iq-search-bar mt-2">
                <b-form action="#" class="searchbox">
                    <b-input id="search" placeholder="Buscar..." @input="(val) => searchChange(val)" />
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                </b-form>
              </div>
            </template>
            <template v-slot:headerAction>
            <b-button variant="primary"  v-b-modal.modal-1-tallas-list>AGREGAR NUEVO</b-button>
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
                    v-b-tooltip.top="'Imprimir código'"
                    @click="setCodigo(props.rowData)"
                    v-b-modal.modal-codigo-tallas-list
                    class="mb-2"
                    size="sm"
                    variant="outline-dark"
                    ><i :class="'fas fa-print'"
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
import VueBarcode from 'vue-barcode'
import JsPDF from 'jspdf'
import JsBarcode from 'jsbarcode'

export default {
  name: 'ListadoTallas',
  components: {
    vuetable: Vuetable,
    'vuetable-pagination-bootstrap': VuetablePaginationBootstrap,
    'datatable-heading': DatatableHeading,
    'vuebarcode': VueBarcode
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
  },
  data () {
    return {
      barcode_data: '',
      barcode_name: '',
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        id: 0,
        codigo: '',
        cantidad: 0,
        state: 1
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/tallas/list',
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
        },
        {
          name: 'zapato.estilo',
          sortField: 'zapato.estilo',
          title: 'Zapato',
          dataClass: 'list-item-heading'
        },
        {
          name: 'talla',
          sortField: 'talla',
          title: 'Talla',
          dataClass: 'list-item-heading'
        },
        {
          name: 'cantidad',
          sortField: 'cantidad',
          title: 'Cantidad',
          dataClass: 'list-item-heading'
        },
        {
          name: 'codigo',
          sortField: 'codigo',
          title: 'Codigo',
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
        codigo: { required },
        cantidad: { required }
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
          this.form.state = 1
          break
        }
        case 'code': {
          this.form.codigo = ''
          var characters =
            '0123456789'
          var charactersLength = characters.length
          for (var i = 0; i < 10; i++) {
            this.form.codigo += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            )
          }
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1-tallas-list'].hide()
          this.form.id = 0
          this.form.name = ''
          this.form.state = 1
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2-tallas-list'].hide()
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
      this.form.codigo = data.codigo
      this.form.cantidad = data.cantidad
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
          me.alertText = 'Se ha actualizado la talla exitosamente'
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
            me.$refs['modal-3-tallas-list'].hide()
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
            me.$refs['modal-4-tallas-list'].hide()
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
    setCodigo (data) {
      console.log(data)
      this.barcode_data = data.codigo
      this.barcode_name = data.zapato.estilo
    },
    imprimirCodigo () {
      const barcodeData = this.barcode_data // Replace with your actual data
      const barcodeName = this.barcode_name
      const barcodeOptions = {
        format: 'CODE128', // Choose your desired barcode format
        width: 1,
        height: 20,
        displayValue: false // Optionally display the barcode value below
      }

      const doc = new JsPDF({
        unit: 'cm',
        format: [11, 6],
        orientation: 'landscape'
      })
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, barcodeData, barcodeOptions)

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 5
      const imgHeight = 2.5
      doc.setFontSize(10).setFont(undefined, 'bold')

      doc.addImage(imgData, 'PNG', 0.3, 0.5, imgWidth, imgHeight)
      doc.text(barcodeName, 0.75, 1)
      doc.text(barcodeData, 0.75, 2.7)

      doc.addImage(imgData, 'PNG', 5.5, 0.5, imgWidth, imgHeight)
      doc.text(barcodeName, 5.95, 1)
      doc.text(barcodeData, 5.95, 2.7)

      doc.addImage(imgData, 'PNG', 0.3, 2.8, imgWidth, imgHeight)
      doc.text(barcodeName, 0.75, 3.3)
      doc.text(barcodeData, 0.75, 5)

      doc.addImage(imgData, 'PNG', 5.5, 2.8, imgWidth, imgHeight)
      doc.text(barcodeName, 5.95, 3.3)
      doc.text(barcodeData, 5.95, 5)

      doc.save('barcode-' + this.barcode_data + '.pdf')
    }
  }
}
</script>
