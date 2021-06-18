import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    person: {
      first_name: '',
      last_name: '',
      document_type: '',
      document_number: '',
      phone_number: 7,
      email: '',
      comment: ''
    },
  },
  mutations: {
    updateFirstName (state, message) {
      state.person.first_name = message
    },
    updateLastName (state, message) {
      state.person.last_name = message
    },
    updateDocumentType (state, message) {
      state.person.document_type = message
    },
    updateDocumentNumber (state, message) {
      state.person.document_number = message
    },
    updatePhoneNumber (state, message) {
      state.person.phone_number = message
    },
    updateEmail (state, message) {
      state.person.email = message
    },
    updateComment (state, message) {
      state.person.comment = message
    },
  },
  actions: {
  },
  modules: {
  }
})
