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
            v-model="signin.email"
            placeholder="อีเมล"
            name="email"
            aria-describedby="email"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            v-model="signin.password"
            placeholder="รหัสผ่าน"
            name="password"
            required
          />
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-primary">เข้าสู่ระบบ</button>
        </div>
        <div class="mb-3 text-center">
          เไม่ได้เป็นสมาชิกใช่ไหม คลิกที่นี่เพื่อ
          <router-link to="/signup">ลงทะเบียน</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import { HTTP, SERVER_IP, PORT } from "../assets/js/SERVER_IP";

export default {
  data() {
    return {
      signin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    SubmitSignin() {
      axios
        .post(`${HTTP}://${SERVER_IP}:${PORT}/signin`, this.signin)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            localStorage.setItem("token", data.user.token);
            this.$router.push("/");
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: data.alert,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validateSignin() {
      this.SubmitSignin();
    },
  },
  created() {
    if (localStorage.getItem("token") !== null) {
        this.$router.push('/')
    }
  },
};
</script>
