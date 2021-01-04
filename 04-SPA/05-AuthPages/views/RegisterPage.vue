<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="repeatPassword" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input type="checkbox" v-model="checkbox" /> Я согласен с условиями <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      fullname: '',
      password: '',
      repeatPassword: '',
      checkbox: false,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.email) {
        alert('Требуется ввести Email');
      } else if (!this.fullname) {
        alert('Требуется ввести полное имя');
      } else if (!this.password) {
        alert('Требуется ввести пароль');
      } else if (this.password != this.repeatPassword) {
        alert('Пароли не совпадают');
      } else if (this.checkbox == false) {
        alert('Требуется согласиться с условиями');
      } else {
        const response = await register(this.email, this.fullname, this.password)
        if (!response.error) {
          alert(response.id);
        } else {
          alert(response.message);
        }
      };
    },
  },
};
</script>

<style scoped></style>
