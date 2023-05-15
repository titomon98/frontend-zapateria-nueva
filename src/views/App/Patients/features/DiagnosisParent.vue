<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <Diagnosis :patientId="patientId" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <Allergies :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import Diagnosis from './diagnosis/Diagnosis'
import Allergies from './diagnosis/Allergies'

export default {
  name: 'History',
  components: {
    Diagnosis,
    Allergies
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
