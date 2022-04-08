<template>
  <v-snackbar
    id="app-notification"
    style="margin-bottom:15px;"
    v-model="notification.show"
    :color="notification.color"
    :timeout="3000"
    bottom
    right
    vertical
  >
    <p style="margin:0;font-size:15px;" v-html="notification.message" />
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" class="mt-0" text @click="notification.show = false">Закрыть</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
        notification: 'getNotification'
    }),
  },
};
</script>

<style></style>
