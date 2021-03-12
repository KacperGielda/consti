<template>
  <base-container title="Logowanie">
    <form class="form-login" @submit.prevent="signIn">
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
        <!-- Nie posiadasz jeszcze konta? <span @click="$store.dispatch('refreshToken')">Zarejestruj się</span> -->
      </p>
    </form>
  </base-container>
</template>

<script>
import {mapMutations} from "vuex";
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
      if (val.length < 3 && val.length != 0) return this.login.validity = "Login musi mieć przynajmniej 3 znaki";
      if (val.length > 18) return this.login.validity = "Login nie możę przekraczać 18 znaków";
      
      this.login.validity = "";
    },
    passwordValue(val) {
      if (val.length < 4 && val.length != 0)return this.password.validity = "Hasło musi mieć przynajmniej 4 znaków";
      if(val.length > 18) return this.password.validity = "Hasło nie możę przekraczać 18 znaków";
      this.password.validity = "";
    },
  },
  methods:{
    ...mapMutations(["setAccessToken", "setRefreshToken"]),
    signIn(){
      if(this.login.validity.length != 0 || this.password.validity.length != 0 || this.loginValue.length == 0 || this.passwordValue.length == 0) return;
        this.$store.dispatch('signIn',{login:this.loginValue, password:this.passwordValue}).then(()=>{
          this.passwordValue = "";
        });
    }
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