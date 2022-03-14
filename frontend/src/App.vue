<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <b>IT Summary Sheet</b>
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
                <router-link class="nav-link" to="/search"
                  ><i class="fa-solid fa-magnifying-glass"></i>
                  ค้นหาชีท</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/favorite"
                  ><i class="fa-solid fa-heart"></i> ชีทที่อยากได้</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart"
                  ><i class="fa-solid fa-cart-shopping"></i> ตะกร้า</router-link
                >
              </li>
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="user">
                <li class="nav-item dropdown dropstart">
                  <a
                    class="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-user-circle fa-lg mx-1"></i>
                    {{ user.email }}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <router-link class="dropdown-item" to="/account"
                        >บัญชี</router-link
                      >
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item"
                        >ITcoin {{ user.itcoin.toLocaleString() }}
                        <router-link to="/itcoin"
                          ><span class="badge bg-warning text-dark"
                            >เติม coin</span
                          ></router-link
                        ></a
                      >
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="/history"
                        >ประวัติการสั่งซื้อ</router-link
                      >
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="/mysheets"
                        >ชีทของฉัน</router-link
                      >
                    </li>
                    <li>
                      <router-link class="dropdown-item" to="/myreview"
                        >รีวิวของฉัน</router-link
                      >
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" @click="logout()"
                        ><span class="text-danger">ออกจากระบบ</span></a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
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
      axios.get("/users/me").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      axios.post("/users/logout").then((res) => {
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
