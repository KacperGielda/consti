<template>
  <header>
    <div class="menu">
      <ion-icon @click="toggleNav" :name="showNav ? 'arrow-back-circle-outline' : 'menu-outline'" class="icon"></ion-icon>
      <transition name="menu"> 
      <nav v-show="showNav">
        <ul>
          <li>
            <router-link class="nav-link" to="/schedule" > <span @click="toggleNav">Terminarz</span>  </router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/">Zadania</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/">Ustawnienia</router-link>
          </li>
        </ul>
      </nav>
      </transition>
    </div>
    <h2>consti</h2>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
@import "../../assets/Animations.scss";
header {
  height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: $teal-dark;
  color: $white;
  padding: 0 10px;
  box-shadow: 2px 2px rgba($black, 0.1);
  z-index: 10;
  .menu {
    margin-right: 25px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 32px;
        &:hover {
        background-color: $teal;
        cursor: pointer;
        }
    }
  }
  h2{
      user-select: none;
  }
}
nav {
  display: block;
  position: fixed;
  left: 0;
  top: 50px;
  width: 400px;
  @media (max-width: 600px) {
    width: 100%;
  }
  height: calc(100vh - 50px);
  background-color: rgba($black, 0.75);
  z-index: 9;
  padding: 25px;
  box-shadow: 2px 2px rgba($black, 0.1);
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    .nav-link,
    li {
      flex-shrink: none;
      text-decoration: none;
      text-align: left;
      font-size: 32px;
      color: $white;
      margin: 10px 0;
      width: 100%;
      transition: all .2s ease-in-out;
      &:hover{
        color: $teal;
        margin-left:5px;
      }
    }
  }
}
</style>