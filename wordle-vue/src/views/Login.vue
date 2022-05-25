<template>
  <v-content>
    <v-card width="500" class="mx-auto mt-9">
      <v-card-title>Authorization</v-card-title>
      <v-card-text>
        <v-text-field label="Username" prepend-icon="mdi-account-circle"/>
        <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"/>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Register</v-btn>
        <v-btn color="info">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {

  showPassword: boolean = false;
}
</script>

<style scoped>

</style>