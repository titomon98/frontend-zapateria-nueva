<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <Orders :patientId="patientId" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <Results :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import Orders from './laboratory/Orders'
import Results from './laboratory/Results'

export default {
  name: 'History',
  components: {
    Orders,
    Results
  },
  props: [
    'patientId'
  ],
  data () {
    return {
      patient: {}
    }
  },
  mounted () {
    xray.index()
  },
  beforeMount () {
    this.patientId = this.$route.params.id
  },
  methods: {
  }
}
</script>
