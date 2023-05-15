<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <Charges :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import Charges from './charges/Charges'
// import Payments from './charges/Payments'

export default {
  name: 'ChargesParent',
  components: {
    Charges
    // Payments
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
