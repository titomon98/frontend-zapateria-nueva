<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <Physiotherapy :patientId="patientId" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <Psychology :patientId="patientId" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <Language :patientId="patientId" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import Physiotherapy from './others/Physiotherapy'
import Psychology from './others/Psychology'
import Language from './others/Language'

export default {
  name: 'History',
  components: {
    Physiotherapy,
    Psychology,
    Language
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
