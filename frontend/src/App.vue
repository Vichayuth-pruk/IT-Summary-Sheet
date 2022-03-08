<template>
  <div>
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
              <template v-if="!user">
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
                <router-link class="nav-link" to=""
                  ><i class="fa-solid fa-magnifying-glass"></i>
                  ค้นหาชีท</router-link
                >
              </li>
              <li class="nav-item dropdown" v-if="user">
                <a
                  class="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-circle-user"></i>
                  {{ user.user_fname }} {{ user.user_lname }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link class="dropdown-item" to=""
                      >โปรไฟล์</router-link
                    >
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <div class="dropdown-item text-danger" @click="logout()">ออกจากระบบ</div>
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
      <router-view
        :key="$route.fullPath"
        @auth-change="onAuthChange()"
        :user="user"
      ></router-view>
    </div>
  </div>
</template>
<script>
import axios from "./plugins/axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      axios.post("/user/logout").then((res) => {
        localStorage.removeItem("token");
        this.user = null;
        this.$router.push("/signin");
      });
    },
  },
  created() {
    this.onAuthChange();
  },
};
</script>
