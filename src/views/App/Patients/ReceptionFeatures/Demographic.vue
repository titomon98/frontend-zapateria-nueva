<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
              <div v-if="!patient" id="loading" :style="style">
                <div id="loading-center">
                </div>
              </div>
              <iq-card v-else>
                <template v-slot:headerTitle>
                    <h4 class="card-title mt-3">Datos del paciente:</h4>
                    <div class="iq-search-bar mt-2">
                    <div class="row">
                        <div class="col-sm">
                        </div>
                        <div class="col-sm">
                        </div>
                    </div>
                    </div>
                </template>
                <template v-slot:body>
                  <b-row class="ml-2">
                  <b-col md="2">
                    <b-form-group label="Nombre:">
                      <label>{{patient.nombre}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Apellido:">
                      <label>{{patient.apellidos}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Apellido de casada:">
                      <label>{{patient.apellido_casada}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Fecha de nacimiento:">
                      <label>{{patient.nacimiento}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Fecha de nacimiento:">
                      <label v-if="patient.sexo=='M'">Masculino</label>
                      <label v-else>Femenino</label>
                    </b-form-group>
                  </b-col>
                  </b-row>
                  <b-row class="ml-2">
                  <b-col md="2">
                    <b-form-group label="Dirección:">
                      <label>{{patient.direccion}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Estado Civil:">
                      <label>{{patient.estado_civil}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Teléfono:">
                      <label>{{patient.telefono}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Correo:">
                      <label>{{patient.correo}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Numero de expediente:">
                      <label>{{patient.num_expediente}}</label>
                    </b-form-group>
                  </b-col>
                  </b-row>
                  <b-row class="ml-2">
                  <b-col md="2">
                    <b-form-group label="CUI:">
                      <label>{{patient.cui}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Nombre del encargado:">
                      <label>{{patient.nombre_encargado}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="CUI Encargado:">
                      <label>{{patient.cui_encargado}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Referente:">
                      <label>{{patient.referente}}</label>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Idioma:">
                      <label>{{ language }}</label>
                    </b-form-group>
                  </b-col>
                  </b-row>
                  <b-row class="ml-2">
                    <b-col md="2">
                      <b-form-group label="Nacionalidad:">
                        <label>{{ nationality }}</label>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group label="Tipo de Sangre:">
                        <label>{{ blood }}</label>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../config/constant'
import logo from '../../../../assets/images/loader.gif'
export default {
  name: 'Demographic',
  components: {
  },
  props: [
    'patientId'
  ],
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
    // <---Aqui se recibe el id de paciente
  },
  beforeMount () {
    this.getPatient(this.patientId)
  },
  data: () => {
    return {
      logo: logo,
      style: `background: #fff url(${logo}) no-repeat scroll center center;`,
      from: 0,
      to: 0,
      total: 0,
      perPage: 5,
      search: '',
      patient: {},
      form: {
        // Aqui agregar variables para el objeto
      },
      nationality: '',
      blood: '',
      language: '',
      apiBase: apiUrl + '/user/list',
      typeOptions: [],
      options: [
        { value: '1', nombre: 'Usuario' },
        { value: '2', nombre: 'Tipo usuario' }
      ],
      columna: { value: '1', nombre: 'Usuario' },
      fields: [
        {
          name: '__slot:actions',
          title: 'Acciones',
          titleClass: '',
          dataClass: 'text-muted'
          // width: "15%",
        },
        {
          name: 'user',
          sortField: 'user',
          title: 'Usuario',
          dataClass: 'list-item-heading'
          // width: "25%",
        },
        {
          name: 'tipo_usuario.nombre',
          sortField: 'user',
          title: 'Tipo de usuario',
          dataClass: 'list-item-heading'
          // width: "25%",
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
        user: { required },
        password: { required },
        userType: { required }
      }
    }
  },
  methods: {
    pacienteNull () {
      if (this.product.id === undefined) {
        // En caso de que el paciente no este
        this.$router.push({ name: 'Paciente'
        })
      } else {
        this.fetchData(1, this.product.id, this.search, this.checkboxmanual)
        this.idproduct = this.product.id
      }
    },
    getPatient (id) {
      let me = this
      axios.get(apiUrl + `/paciente/get?id=${id}`)
        .then(response => {
          me.patient = response.data
          if (me.patient.nacionalidades) {
            me.nationality = me.patient.nacionalidades.nombre
          } else {
            me.nationality = ''
          }
          if (me.patient.tipo_sangres) {
            me.blood = me.patient.tipo_sangres.nombre
          } else {
            me.blood = ''
          }
          if (me.patient.idiomas) {
            me.language = me.patient.idiomas.nombre
          } else {
            me.language = ''
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    openModal (modal, action) {
      switch (modal) {
        case 'save': {
          this.$v.$reset()
          // Aqui agregar variables
          break
        }
      }
    },
    closeModal (action) {
      switch (action) {
        case 'save': {
          this.$v.$reset()
          this.$refs['modal-1'].hide()
          // Aqui agregar variables
          break
        }
        case 'update': {
          this.$v.$reset()
          this.$refs['modal-2'].hide()
          // Aqui agregar variables
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
      }
    },
    setData (data) {
      // Aqui reiniciar variables
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '//create', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('save')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    /* Guardar */
    onUpdate () {
      const me = this
      axios.put(apiUrl + '//update', {
        form: me.form })
        .then((response) => {
          me.$refs.vuetable.refresh()
          me.closeModal('update')
        })
        .catch((error) => {
          console.error('Error!', error)
        })
    },
    onState () {
      let me = this
      if (this.form.state === 1) {
        axios
          .put(apiUrl + '//deactivate', { // url de detalles
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-3'].hide()
          })
          .catch((error) => {
            console.error('There was an error!', error)
          })
      } else {
        axios
          .put(apiUrl + '//activate', {
            id: this.form.id
          })
          .then((response) => {
            me.$refs.vuetable.refresh()
            me.$refs['modal-4'].hide()
          })
          .catch((error) => {
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
    changeTypeSearch (columna) {
      this.columna = columna
    }
  }
}
</script>
