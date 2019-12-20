<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="name" required></v-text-field>
    <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
    <v-text-field label="Password" v-model="password" required></v-text-field>
    <v-text-field name="input-7-1" label="Confirm Password"
    v-model="confirm_password"></v-text-field>
    <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.axios
          .post('http://localhost:8081/users/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$swal('Great!', 'You have been successfully registered!', 'success');
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            const message = error.response.data.message;
            this.$swal('Oh oo!', `${message}`, 'error');
          });
      }
    },
    clear() {
      this.$refs.reset();
    },
  },
};
</script>
