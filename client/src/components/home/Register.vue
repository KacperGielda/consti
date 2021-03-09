<template>
  <base-container title="Rejestracja">
    <form class="form-login">
      <base-input
        label="Login"
        id="login"
        :validation="login.validity"
        v-model:value="login.value"
      ></base-input>
      <base-input
        label="E-mail"
        id="email"
        type="email"
        :validation="email.validity"
        v-model:value="email.value"
      ></base-input>
      <base-input
        label="Hasło"
        id="password"
        type="password"
        :validation="password.validity"
        v-model:value="password.value"
      ></base-input>
      <base-input
        label="Powtórz Hasło"
        id="password-repeat"
        type="password"
        validation=""
        v-model:value="password.repeatValue"
      ></base-input>
      <base-button>Zarejestruj</base-button>
      <p>
        Posiadasz konto? <span @click="$emit('change-mode')">Zaloguj się</span>
      </p>
    </form>
  </base-container>
</template>

<script>
import emailValidator from "email-validator";
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
        repeatValue:"",
      },
      email:{
        validity: "",
        value:"",
      }
    };
  },
  computed: {
    loginValue() {
      return this.login.value;
    },
    passwordValue() {
      return this.password.value;
    },
    emailValue() {
      return this.email.value;
    }
  },
  watch: {
     loginValue(val) {
      if (val.length < 3 && val.length != 0) return this.login.validity = "Login musi mieć przynajmniej 3 znaki";
      if (val.length > 18) return this.login.validity = "Login nie możę przekraczać 18 znaków";
      
      this.login.validity = "";
    },
    passwordValue(val) {
      if (val.length < 4 && val.length != 0) return this.password.validity = "Hasło musi mieć przynajmniej 4 znaki";
      if (val != this.password.repeatValue && (this.password.repeatValue.length != 0 || val.length != 0)) return this.password.validity="Hasła się nie zgadzają"
      return this.password.validity = "";
    },
    emailValue(val){
      if(!emailValidator.validate(val) && val.length != 0) return this.email.validity = "Niepoprawny adress email";
      return this.email.validity = "";
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