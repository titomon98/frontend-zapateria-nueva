<template>
  <div>
    <div>
      <div class="row">
        <div class="col" id="imprimir">
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
  props: {
    logo3: { type: String, default: require('./4x4.png') }
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
      expediente: 1,
      paciente: 'Arturo Monterroso',
      telefono: '35130842',
      fecha: '13/3/2023',
      nacimiento: '2/3/1998'
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
        format: [28, 21.5]
      })
      var paragraph = 'Refiere que hace 15 días apróximadamente hay un episodio de mirada fija, arresto motor, baja la cabeza, seguido de oclusión ocular, y extensión cefálica y giro a la izquierda, hay facies de dolor, se oprime el pecho con la mano derecha y movimientos tónico generalizados, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
      doc.setFontSize(11).setFont(undefined, 'bold')
      doc.text('Expediente: ' + this.expediente, 1, 5)
      doc.text('Paciente: ' + this.paciente, 1, 5.5)
      doc.text('Fecha de ingreso: ' + this.fecha, 1, 6)
      doc.text('Fecha de nacimiento: ' + this.nacimiento, 1, 6.5)
      doc.text('Telefono: 35130842', 1, 7)
      doc.text('Generado por: Dr. Hugo Galvez', 1, 7.5)
      doc.text('Motivo de consulta ', 1, 8.5)
      doc.setFontSize(10.5).setFont(undefined, 'normal')
      doc.text('Convulsión de 15 días', 1, 9)
      doc.setFontSize(11).setFont(undefined, 'bold')
      doc.text('Historial de la enfermedad ', 1, 10)
      doc.setFontSize(10.5).setFont(undefined, 'normal')
      var lines = doc.splitTextToSize(paragraph, 18)
      doc.text(lines, 1, 10.5)
      doc.save('Test.pdf')
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
