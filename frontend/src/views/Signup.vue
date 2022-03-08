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
            :class="{ 'is-invalid': v$.signup.email.$error }"
            v-model="signup.email"
            placeholder="อีเมล"
            name="email"
            aria-describedby="email"
          />
          <div v-if="v$.signup.email.$error" class="my-2 text-danger">
            โปรดป้อนอีเมลให้ถูกต้อง
          </div>
        </div>
        <div class="row mb-3 g-2">
          <div class="col">
            <label class="form-label" for="fname">ชื่อ</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.signup.fname.$error }"
              v-model="signup.fname"
              placeholder="ชื่อ"
              name="fname"
              aria-describedby="fname"
            />
            <div v-if="v$.signup.fname.$error" class="my-2 text-danger">
              โปรดป้อนชื่อให้ถูกต้อง
            </div>
          </div>
          <div class="col">
            <label class="form-label" for="lname">นามสกุล</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.signup.lname.$error }"
              v-model="signup.lname"
              placeholder="นามสกุล"
              name="lname"
              aria-describedby="lname"
            />
            <div v-if="v$.signup.lname.$error" class="my-2 text-danger">
              โปรดป้อนนามสกุลให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': v$.signup.password.$error }"
            v-model="signup.password"
            placeholder="รหัสผ่าน"
            name="password"
          />
          <div v-if="v$.signup.password.$error" class="my-2 text-danger">
            โปรดป้อนรหัสผ่านให้ถูกต้อง (5 - 18 ตัวอักษร)
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="c_password">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': v$.signup.c_password.$error }"
            v-model="signup.c_password"
            placeholder="ยืนยันรหัสผ่าน"
            name="c_password"
          />
          <div v-if="v$.signup.c_password.$error" class="my-2 text-danger">
            โปรดป้อนยืนยันรหัสผ่านให้ถูกต้อง (เหมือนรหัสผ่าน)
          </div>
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
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
    submitSignup() {
      axios
        .post("http://localhost:3001/user/signup", this.signup)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "สำเร็จ",
              text: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/signin");
            });
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
            this.signup.password = "";
            this.signup.c_password = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateSignup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.submitSignup();
      }
    },
  },
  validations() {
    return {
      signup: {
        email: { required, email, maxLength: maxLength(50) },
        fname: { required, maxLength: maxLength(50) },
        lname: { required, maxLength: maxLength(50) },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(18),
        },
        c_password: {
          required,
          sameAs: sameAs(this.signup.password),
        },
      },
    };
  },
};
</script>
