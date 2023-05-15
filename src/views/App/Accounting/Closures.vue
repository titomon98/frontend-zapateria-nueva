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
    <b-modal id="modal-1" ref="modal-1" title="Agregar consulta">
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
        <b-form-group label="Fecha inicial:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha1.$model"
            :state="!$v.form.fecha1.$error"
          ></b-form-input>
        </b-form-group>
        <div v-if="$v.form.fecha1.$invalid" class="invalid-feedback">
          Debe ingresar la fecha de inicio
        </div>
        <b-form-group label="Fecha final:">
          <b-form-input
            type="date"
            v-model.trim="$v.form.fecha2.$model"
            :state="!$v.form.fecha2.$error"
            placeholder="Ingresar fecha final"
          ></b-form-input>
        </b-form-group>
        <div v-if="$v.form.fecha2.$invalid" class="invalid-feedback">
          Debe ingresar la fecha final
        </div>
      </b-form>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="onValidate('especifico')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('especifico')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title mt-3">Cierres</h4>
          </template>
          <template v-slot:body>
            <b-button variant="primary">CIERRE DIARIO</b-button>
            <b-button variant="primary" v-b-modal.modal-1>CIERRE CON FECHAS ESPECÍFICAS</b-button>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
//  import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export default {
  name: 'Closures',
  components: {
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
  },
  data () {
    return {
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      form: {
        fecha1: null,
        fecha2: null
      },
      supplie: [],
      supplies: [],
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/inventario_laboratorio/list',
      mask_quetzal: createNumberMask({
        prefix: 'Q ',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2, // how many digits allowed after the decimal
        integerLimit: 10, // limit length of integer numbers
        allowNegative: false,
        allowLeadingZeroes: false
      })
    }
  },
  validations () {
    return {
      form: {
        fecha1: {
          required
        },
        fecha2: {
          required
        }
      }
    }
  },
  methods: {
    closeModal (action) {
      switch (action) {
        case 'especifico': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          this.form.fecha1 = null
          this.form.fecha2 = null
          break
        }
      }
    },
    onValidate (action) {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        if (action === 'especifico') {
          if (this.fecha1 === this.fecha2) {
            this.alertErrorText = 'Las fechas son iguales, se generará un cierre diario'
            this.showAlertError()
          } else if (this.fecha2 > this.fecha1) {
            this.alertErrorText = 'La fecha final es mayor a la inicial, por favor corrobora la información'
            this.showAlertError()
          } else {
            this.generarEspecifico()
          }
        }
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    setData (data) {
      this.form.existence = data.existencia
      this.form.minimalExistence = data.existencia_minima
      this.form.buyPrice = data.precio_compra
      this.form.supplie = data.insumos_laboratorio
      this.form.id = data.id
      this.form.state = data.estado
    },
    generarEspecifico () {

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
