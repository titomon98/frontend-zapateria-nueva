<template>
  <div>
    <div>
      <br /><br /><br /><br /><br />
      <div class="row">
        <div class="col"></div>
        <div class="col" id="imprimir">
          <div class="col"><strong>{{ tienda }}</strong></div>
          <div class="col">
            FECHA: {{ date[2] }}/{{ date[1] }}/{{ date[0] }}
          </div>
          <div class="col">VENDEDOR: {{ seller.name }}</div>
          <div class="col">CLIENTE: {{ sale.nameReference }}</div>

          <table class="table table-responsive">
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Subt.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stock in sales" :key="stock.id">
              <td v-text="stock.amount"></td>
              <td v-text="stock.nameProduct"></td>
              <td v-text="stock.price"></td>
              <td>{{ stock.price * stock.amount }}</td>
            </tr>
          </tbody>
        </table>
          <br />
          <div class="col"><strong>TOTAL: </strong>{{ sale.total }}</div>
          <div class="col"><strong>ESTE DOCUMENTO NO ES UNA FACTURA</strong></div>
        </div>
        <div class="col" />
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <button
            v-tooltip.top-center="'Imprimir recibo'"
            @click="imprimirRecibo()"
            class="btn btn-primary"
          >
            <i class="icon-fa icon-fa-print" />
          </button>
          <router-link
            v-tooltip.top-center="'Regresar'"
            class="btn btn-primary"
            :to="`/admin/venta/lista`"
          >
            <i class="icon-fa icon-fa-arrow-left"></i>
          </router-link>
        </div>
        <div class="col" />
      </div>
    </div>
    <!-- <div class="col d-print-none">
        <div class="float-end">
          <a
            href="javascript:window.print()"
            class="btn btn-primary w-md waves-effect waves-light me-1"
            ><i class="fa fa-print"></i>&nbsp&nbspIMPRIMIR</a
          >
        </div>
      </div> -->
  </div>
</template>
<script>
// import html2canvas from 'html2canvas'
import axios from 'axios'

export default {
  props: {
    isShow: {
      type: Boolean
    },
    id: {
      type: Number
    },
    modulo: {
      type: String
    }
  },
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
      tienda: ''
    }
  },
  mounted () {
    let vm = this
    vm.limpiarVariables()
    var url = `/api/sale/showSale/${this.$route.query.id}`
    axios
      .get(url)
      .then(function (response) {
        console.log(response)
        vm.sale = response.data.sale
        vm.seller = response.data.seller
        vm.date = vm.convertDate(vm.sale.sale_date)
        vm.sales = response.data.sales
        vm.address = response.data.address
        vm.tienda = response.data.place.name
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
    convertDate (date) {
      var newDate = date.split('-')
      return newDate
    },
    imprimirRecibo () {
      var printWindow = window.open('', 'PrintWindow')
      var printContents = document.getElementById('imprimir').innerHTML
      printWindow.document.body.innerHTML = printContents
      setTimeout(function () {
        printWindow.print()
      }, 0)
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
