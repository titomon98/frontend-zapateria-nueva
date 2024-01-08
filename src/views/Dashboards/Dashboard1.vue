<template>
  <b-container fluid>
    <b-row>
      <b-col md="12" lg="12">
        <b-row>
          <b-col sm="12">
            <iq-card class-name="iq-card-block iq-card-stretch iq-card-height" body-class="">
              <template v-slot:headerTitle>
                <br>
                <h3 class="card-title">Corporación el Centro - ¡Bienvenido !</h3>
                <br>
                <h4 class="card-title">Fecha de hoy: {{ getFormattedDate(fechaActual) }}</h4>
                <br>
                <h5 class="card-title">Listado de los 10 productos más recientes</h5>
              </template>

              <template v-slot:body>
                <div class="table-responsive">
                  <table class="table mb-0 table-borderless">
                    <thead>
                    <tr>
                      <th scope="col">Nombre del producto </th>
                      <th scope="col">Precio de venta </th>
                      <th scope="col">Precio mínimo de venta </th>
                      <th scope="col">Marca </th>
                      <th scope="col">Color </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="zapatos in zapatosList" :key="zapatos.id">
                      <td v-text="zapatos.estilo"></td>
                      <td v-text="zapatos.precio_venta"></td>
                      <td v-text="zapatos.precio_minimo"></td>
                      <td v-text="zapatos.marca.nombre"></td>
                      <td v-text="zapatos.colore.nombre"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </iq-card>

          </b-col>

        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../config/pluginInit'
import IqCard from '../../components/xray/cards/iq-card'
import axios from 'axios'
import { apiUrl } from '../../config/constant'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard1',
  components: { IqCard },
  mounted () {
    xray.index()
    this.getResultados()
  },
  computed: {
    ...mapGetters([
      'currentUser' // para extraer el usuario puedes usar currentUser.user
    ])
  },
  data: () => {
    return {
      fechaActual: new Date(),
      zapatosList: [],
      slickOptions: {
        centerMode: false,
        centerPadding: '60px',
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [{
          breakpoint: 992,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '30',
            slidesToShow: 3
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '15',
            slidesToShow: 1
          }
        }],
        nextArrow: '<a href="#" class="ri-arrow-left-s-line left"></a>',
        prevArrow: '<a href="#" class="ri-arrow-right-s-line right"></a>'
      }
    }
  },
  methods: {
    getResultados () {
      let me = this
      var url = apiUrl + '/zapatos/get/'
      axios.get(url).then(function (response) {
        me.zapatosList = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getFecha (fecha) {
      let formato = moment(fecha).format('DD-MM-YYYY hh:mm')
      return formato
    },
    getFormattedDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options); // Puedes ajustar el locale según lo necesites
    }
  }
}
</script>

<style>
.iq-card-body{
  flex: unset;
}
</style>
