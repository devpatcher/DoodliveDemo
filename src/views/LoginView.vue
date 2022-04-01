<template>
  <title>Login</title>
  <nav>
    <a href="/">
      <img alt="Logo" src="../assets/logo.png" class="logo logo-inactive">
    </a>
    <a href="#" class="float-right">
      <img alt="Logo" src="../assets/avatar.png" class="avatar avatar-inactive">
    </a>
  </nav>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-lg-4 col-md-6 col-sm-8 col-xs-12 login-form">
        <div class="login-form-title">
          Sign In
        </div>
        <div class="row">
          <input
            class="login-form-input"
            placeholder="E-mail or Username"
            type="email"
            id="email"
            v-model="email"
          >
          <input
            class="login-form-input"
            placeholder="Password"
            type="password"
            id="password"
            v-model="password"
          >
        </div>
        <div class="row">
          <button class="btn btn-primary login-form-submit" @click="handleLogin">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        email: import.meta.env.VITE_APP_DEFAULT_EMAIL,
        password: import.meta.env.VITE_APP_DEFAULT_PASSWORD,
      }
    },
    methods: {
      ...mapActions(["signInAction"]),
      handleLogin(event: any) {
        const email = this.email;
        const password = this.password;

        this.signInAction({ email, password });
      }
    }
  }
</script>