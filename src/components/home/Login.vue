<template>
  <base-container title="Logowanie">
    <form class="form-login" @submit.prevent="$store.commit('dialog/displayDialog', {msg: 'dupa dupadupadupadupa dupadupa dupa', title: 'Tytuł'})">
      <base-input
        label="Login"
        id="login"
        :validation="login.validity"
        v-model:value="login.value"
      ></base-input>
      <base-input
        label="Hasło"
        id="password"
        type="password"
        :validation="password.validity"
        v-model:value="password.value"
      ></base-input>
      <base-button>Zaloguj</base-button>
      <p>
        Nie posiadasz jeszcze konta? <span @click="$emit('change-mode')">Zarejestruj się</span>
      </p>
    </form>
  </base-container>
</template>

<script>
export default {
  data() {
    return {
      login: {
        validity: "",
        value: null,
      },
      password: {
        validity: "",
        value: null,
      },
    };
  },
  computed: {
    loginValue() {
      return this.login.value;
    },
    passwordValue() {
      return this.password.value;
    },
  },
  watch: {
    loginValue(val) {
      if (val.length < 4 && val.length != 0) {
        this.login.validity = "Login musi mieć przynajmniej 4 znaki";
      } else this.login.validity = "";
    },
    passwordValue(val) {
      if (val.length < 4 && val.length != 0) {
        this.password.validity = "Hasło musi mieć przynajmniej 4 znaki";
      } else this.password.validity = "";
    },
  },
  name: "Home",
};
</script>

<style lang="scss" scoped>
@import '../../assets/Colors.scss';
form {
  margin-top: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
p {
  margin-top: auto;
  font-size: .75em;
  span{
    color: $teal;
    &:hover,&:focus{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>