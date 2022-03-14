<template>
  <div>
    <h2>เข้าสู่ระบบ</h2>
    <hr />
    <br />
    <div class="col-lg-6 m-auto">
      <form @submit.prevent="validateSignin()">
        <div class="mb-3">
          <label class="form-label" for="email">อีเมล</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': v$.signin.email.$error }"
            v-model="signin.email"
            placeholder="อีเมล"
            name="email"
            aria-describedby="email"
          />
          <div v-if="v$.signin.email.$error" class="my-2 text-danger">
            โปรดป้อนอีเมลให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': v$.signin.password.$error }"
            v-model="signin.password"
            placeholder="รหัสผ่าน"
            name="password"
          />
          <div v-if="v$.signin.password.$error" class="my-2 text-danger">
            โปรดป้อนรหัสผ่าน
          </div>
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-primary">เข้าสู่ระบบ</button>
        </div>
        <div class="mb-3 text-center">
          ไม่ได้เป็นสมาชิกใช่ไหม คลิกที่นี่เพื่อ
          <router-link to="/signup">ลงทะเบียน</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, maxLength } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      signin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitSignin() {
      axios
        .post("http://localhost:3001/users/signin", this.signin)
        .then((res) => {
          if (res.data.status) {
            const token = res.data.token;
            localStorage.setItem("token", token);
            this.$emit("auth-change");
            this.$router.push("/");
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
            this.signup.password = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateSignin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.submitSignin();
      }
    },
  },
  validations() {
    return {
      signin: {
        email: { required, email, maxLength: maxLength(50) },
        password: { required },
      },
    };
  },
};
</script>
