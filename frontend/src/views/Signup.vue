<template>
  <div>
    <h2>ลงทะเบียน</h2>
    <hr />
    <br />
    <div class="col-lg-6 m-auto">
      <form @submit.prevent="validateSignup()">
        <div class="mb-3">
          <label class="form-label" for="email">อีเมล</label>
          <input
            type="email"
            class="form-control"
            v-model="signup.email"
            placeholder="อีเมล"
            name="email"
            aria-describedby="email"
            required
          />
        </div>
        <div class="row mb-3 g-2">
          <div class="col">
            <label class="form-label" for="fname">ชื่อ</label>
            <input
              type="text"
              class="form-control"
              v-model="signup.fname"
              placeholder="ชื่อ"
              name="fname"
              aria-describedby="fname"
              required
            />
          </div>
          <div class="col">
            <label class="form-label" for="lname">นามสกุล</label>
            <input
              type="text"
              class="form-control"
              v-model="signup.lname"
              placeholder="นามสกุล"
              name="lname"
              aria-describedby="lname"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            v-model="signup.password"
            placeholder="รหัสผ่าน"
            name="password"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="c_password">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            v-model="signup.c_password"
            placeholder="ยืนยันรหัสผ่าน"
            name="c_password"
            required
          />
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-success">ลงทะเบียน</button>
        </div>
        <div class="mb-3 text-center">
          เป็นสมาชิกแล้วใช่ไหม คลิกที่นี่เพื่อ
          <router-link to="/signin">เข้าสู่ระบบ</router-link>
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
      signup: {
        email: "",
        fname: "",
        lname: "",
        password: "",
        c_password: "",
      },
    };
  },
  methods: {
    SubmitSignup() {
      axios
        .post(`${HTTP}://${SERVER_IP}:${PORT}/signup`, this.signup)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            Swal.fire({
              title: "สำเร็จ",
              text: data.alert,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/signin");
            });
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
    validateSignup() {
      this.SubmitSignup();
    },
  },
  created() {
    if (localStorage.getItem("token") !== null) {
      this.$router.push("/");
    }
  },
};
</script>
