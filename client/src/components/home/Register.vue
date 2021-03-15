<template>
  <base-container title="Rejestracja">
    <form class="form-login" @submit.prevent="signUp">
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
import localForage from "localforage";
import axios from "axios";
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
    repeatValue(){
      return this.password.repeatValue;
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
    },
    repeatValue(val){
        if (val.length < 4 && val.length != 0) return this.password.validity = "Hasło musi mieć przynajmniej 4 znaki";
      if (val != this.password.value && (this.password.value.length != 0 || val.length != 0)) return this.password.validity="Hasła się nie zgadzają"
      return this.password.validity = ""; 
    }
  },
  methods:{
    async signUp(){
      axios({url:"/api/register",method: "post", data:{
        login:this.loginValue,
        password:this.passwordValue,
        email: this.emailValue,
        activeTasks: await localForage.getItem('activeTasks'),
        activities: await localForage.getItem('activities'),
      }}).then(res => {
        const {accessToken, refreshToken} = res.data;
         this.$store.commit("setRefreshToken", refreshToken);
         this.$store.commit("setAccessToken", accessToken);
          this.$store.dispatch("setDataProvider");
        this.$store.dispatch('activities/fetchData');
        this.$router.replace('/activities');
  
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