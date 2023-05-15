<template>
    <b-modal id="modal-nationality" ref="modal-nationality" title="Agregar nacionalidad">
      <b-alert
        :show="alertCountDownError"
        dismissible
        fade
        @dismissed="alertCountDownError=0"
        class="text-white bg-danger"
      >
        <div class="iq-alert-text">{{ alertErrorText }}</div>
      </b-alert>
      <b-form>
        <b-form-group label="Nombre:">
          <b-form-input
            v-model.trim="$v.form.name.$model"
            :state="!$v.form.name.$error"
            placeholder="Ingresar nombre de la nacionalidad"
          ></b-form-input>
          <!-- <div v-if="$v.form.name.required.$invalid" class="invalid-feedback">
            Debe ingresar el nombre
          </div> -->
        </b-form-group>
      </b-form>
      <template #modal-footer="{}">
        <b-button  variant="primary" @click="onValidate('save')"
          >Guardar</b-button
        >
        <b-button variant="danger" @click="closeModal('save')"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
</template>
<script>
import { xray } from '../../../../config/pluginInit'
import useVuelidate from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import axios from 'axios'
import { apiUrl } from '../../../../config/constant'

export default {
  name: 'NationalityModal',
  components: {
  },
  setup () {
    return { $v: useVuelidate() }
  },
  mounted () {
    xray.index()
  },
  data () {
    return {
      form: {
        id: 0,
        name: ''
      },
      alertSecs: 5,
      alertCountDown: 0,
      alertCountDownError: 0,
      alertText: '',
      alertErrorText: '',
      alertVariant: '',
      apiBase: apiUrl + '/paciente/list'
    }
  },
  validations () {
    return {
      form: {
        name: {
        }
      }
    }
  },
  methods: {
    onValidate () {
      this.$v.$touch()
      if (this.$v.$error !== true) {
        this.onSave()
      } else {
        this.alertErrorText = 'Revisa que todos los campos requeridos esten llenos'
        this.showAlertError()
      }
    },
    /* Guardar */
    onSave () {
      const me = this
      axios.post(apiUrl + '/nacionalidad/create', {
        form: me.form })
        .then((response) => {
          console.log('si llego')
          me.closeModal()
          me.$emit('savedNationality', response.data)
        })
        .catch((error) => {
          me.alertVariant = 'danger'
          me.showAlertError()
          me.alertErrorText = error.response.data.msg
          console.error('Error!', error)
        })
    },
    showAlert () {
      this.alertCountDown = this.alertSecs
    },
    showAlertError () {
      this.alertCountDownError = this.alertSecs
    },
    backToPatients () {
      this.$router.push({ name: 'patient.patients' })
    },
    openModal () {
      this.$refs['modal-nationality'].show()
    },
    closeModal () {
      this.$v.$reset()
      this.form.name = ''
      this.$refs['modal-nationality'].hide()
    }
  }
}
</script>
