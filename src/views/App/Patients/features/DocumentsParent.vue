<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <ClinicDocuments :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import ClinicDocuments from './documents/ClinicDocuments'

export default {
  name: 'History',
  components: {
    ClinicDocuments
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
