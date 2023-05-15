<template>
  <b-container fluid>
    <!-- <b-row>
    </b-row>
    <b-row>
      <b-col md="12">
        <VitalSignsNeuro :patientId="patientId" />
      </b-col>
    </b-row> -->
    <b-row>
      <!-- <b-col md="12">
        <VitalSigns :patientId="patientId" />
      </b-col> -->
      <b-col md="12">
        <VitalSignsGlycemia :patientId="patientId" />
      </b-col>
      <b-col md="12">
        <VitalSignsNeuro :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
// import VitalSigns from './vitals/VitalSigns'
import VitalSignsNeuro from './vitals/VitalSignsNeuro'
import VitalSignsGlycemia from './vitals/VitalSignsGlycemia'

export default {
  name: 'History',
  components: {
    // VitalSigns,
    VitalSignsNeuro,
    VitalSignsGlycemia
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
