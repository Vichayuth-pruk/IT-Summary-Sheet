<template>
  <div>
    <!-- Nav bar -->
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background-color: #1fab89"
    >
      <div class="container">
        <router-link class="navbar-brand" to="/">
          IT Summary Sheet
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse text-end"
          id="navbarSupportedContent"
        >
          <div class="container">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <template v-if="!isLoggedIn">
                <li class="nav-item">
                  <router-link class="nav-link" to="/signup">
                    <span class="badge bg-success">ลงทะเบียนใช้งาน</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/signin">
                    เข้าสู่ระบบ
                  </router-link>
                </li>
              </template>

              <li class="nav-item">
                <router-link class="nav-link" to="/"
                  ><i class="fa-solid fa-house"></i> หน้าแรก</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/findsheet"
                  ><i class="fa-solid fa-magnifying-glass"></i> ค้นหาชีท</router-link
                >
              </li>
              <li class="nav-item dropdown" v-if="isLoggedIn">
                <a
                  class="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-circle-user"></i> {{ info.fname + "" }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link class="dropdown-item" to="profile"
                      >โปรไฟล์</router-link
                    >
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <div class="dropdown-item text-danger" @click="signout()">
                      ออกจากระบบ
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <!-- Router views -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import { HTTP, SERVER_IP, PORT } from "./assets/js/SERVER_IP";

export default {
  data() {
    return {
      info: null,
      isLoggedIn: false,
    };
  },
  methods: {
    authentication(permission) {
      if (permission) {
        if (localStorage.getItem("token") === null) {
          Swal.fire({
            title: "โปรดลงชื่อเข้าสู่ระบบ",
            icon: "warning",
            showConfirmButton: true,
          }).then(() => {
            this.$router.push("/signin");
          });
          this.$router.push("/signin");
        }
      } else {
        axios
          .get(`${HTTP}://${SERVER_IP}:${PORT}/authentication`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            const data = res.data;
            if (data.status) {
              this.isLoggedIn = true;
              this.info = data.info;
            } else {
              this.isLoggedIn = false;
              this.info = null;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    signout() {
      axios
        .get(`${HTTP}://${SERVER_IP}:${PORT}/signout`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.status) {
            localStorage.removeItem("token");
            Swal.fire({
              title: "สำเร็จ",
              text: data.alert,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.authentication();
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
  },
};
</script>
