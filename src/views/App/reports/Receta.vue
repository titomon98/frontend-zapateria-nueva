<template>
  <div>
    <div>
      <div class="row">
        <div class="col" id="imprimir">
          <div class="col">Expediente: <strong>{{ expediente }}</strong></div>
          <div class="col">Nombre de paciente: <strong>{{ paciente }}</strong></div>
          <div class="col">
            Fecha de nacimiento: {{ date[2] }}/{{ date[1] }}/{{ date[0] }}
          </div>
          <div class="col">
            Fecha de ingreso: {{ date[2] }}/{{ date[1] }}/{{ date[0] }}
          </div>
          <div class="col">Teléfono: {{ telefono }}</div>

          <br />
          <div class="col"><strong>FIN DEL DOCUMENTO</strong></div>
        </div>
        <div class="col" />
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <router-link
            class="btn btn-primary"
            :to="`/patient/history/${patientId}`"
          >
          VOLVER A PACIENTE
          </router-link>
          <button
            @click="imprimirRecibo()"
            class="btn btn-primary"
          >
            IMPRIMIR REPORTE
          </button>

        </div>
        <div class="col" />
      </div>
    </div>
  </div>
</template>
<script>
// import html2canvas from 'html2canvas'
import axios from 'axios'
import { apiUrl } from '../../../config/constant'
import JsPDF from 'jspdf'
export default {
  components: {
    // html2canvas
  },
  data () {
    return {
      sale: {},
      date: '',
      address: '',
      sales: [],
      seller: {},
      tienda: '',
      patientId: 0,
      expediente: 12345,
      paciente: 'Arturo Monterroso',
      telefono: '35130842',
      fecha: '13/3/2023'
    }
  },
  beforeMount () {
    this.patientId = this.$route.params.id
  },
  mounted () {
    let vm = this
    console.log()
    vm.limpiarVariables()
    axios
      .get(apiUrl + `/radiology/get?id=${this.patientId}`)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    parseDecimal (value) {
      return parseFloat(this.parseDecimalFixed(value))
    },
    parseDecimalFixed (value) {
      return parseFloat(value).toFixed(2)
    },
    calculateSubtotal (price, quantity, discount, value) {
      let amount = this.parseDecimalFixed(
        this.parseDecimal(price) * this.parseDecimal(quantity) -
          this.parseDecimal(discount)
      )
      let A = amount.split('.')
      if (value === 0) return A[0]
      else return A[1]
    },
    mytotal (amount, value) {
      let A = amount.split('.')
      if (value === 0) return A[0]
      else return A[1]
    },
    convertDate () {
      let date = new Date()
      var newDate = date.split('-')
      return newDate
    },
    imprimirRecibo () {
      var doc = new JsPDF({
        unit: 'cm',
        format: [14, 21.5]
      })

      doc.setFontSize(11.5).setFont(undefined, 'bold')
      doc.text('Paciente: ' + this.paciente, 1, 5)
      doc.text('Fecha: ' + this.fecha, 1, 5.5)
      for (let i = 7; i <= 12; i++) {
        doc.setFontSize(11.5).setFont(undefined, 'bold')
        doc.text('Baclogerd 10mg * 30 tabletas', 1, i)
        doc.setFontSize(10.5).setFont(undefined, 'normal')
        doc.text('Tomar cada 12 horas hasta el 18/4/23, este texto es de prueba', 1, (i + 0.5))
      }
      doc.save('Test.pdf')
      /* var printWindow = window.open('', 'PrintWindow')
      var printContents = document.getElementById('imprimir').innerHTML
      printWindow.document.body.innerHTML = printContents
      setTimeout(function () {
        printWindow.print()
      }, 0) */
    },
    limpiarVariables () {
      this.sale = {}
      this.date = ''
      this.address = ''
      this.sales = []
      this.seller = {}
    }
  }
}
</script>
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983
}
</style>
