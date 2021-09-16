<template>
  <div>
    <!-- page-wrapper Start-->
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid for-light"
                    src="../../assets/images/logo/login.png"
                    alt="looginpage"
                  />
                  <img
                    class="img-fluid for-dark"
                    src="../../assets/images/logo/logo_dark.png"
                    alt="looginpage"
                  />
                </a>
              </div>
              <div class="login-main ">
                <px-card :actions="false">
                  <div>
                    <b-card no-body class=" p-50">
                      <b-card-text>
                        <form class="theme-form" @submit.prevent="Login">
                          <p align="center">
                            <font face="Times New Roman" color="black" size="5"
                              >LOGIN</font
                            >
                          </p>

                          <div class="form-group">
                            <label class="col-form-label">Username</label>
                            <input
                              v-model="username"
                              class="form-control"
                              type="text"
                              required=""
                              placeholder="Masukan username anda"
                              :class="{
                                'is-invalid': submitted && !username,
                              }"
                            />
                            <div
                              v-show="submitted && !username"
                              class="invalid-feedback"
                            >
                              Email is required
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-form-label">Password</label>
                            <input
                              v-model="password"
                              autocomplete=""
                              class="form-control"
                              :type="type"
                              name="login[password]"
                              required=""
                              placeholder="*********"
                              :class="{
                                'is-invalid': submitted && !email,
                              }"
                            />
                            <div
                              v-show="submitted && !password"
                              class="invalid-feedback"
                            >
                              Email is required
                            </div>
                            <div class="show-hide" @click="showPassword">
                              <span class="show"></span>
                            </div>
                          </div>
                          <div class="form-group mb-0">
                            <button
                              class="btn btn-primary btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </b-card-text>
                    </b-card>
                  </div>
                </px-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- latest jquery-->
  </div>
</template>

<script>
import API from "@/services/api.service";
import { setUser } from "@/services/jwt.service";
export default {
  name: "login",
  data() {
    return {
      type: "password",

      password: "",
      username: "",
      passwordjwt: "",
      submitted: false,
    };
  },
  computed: {
    // JWT authentication
    loggingIn() {
      return true;
    },
  },
  created() {
    // reset login status for JWT
  },
  methods: {
    // JWT authentication
    handleSubmit() {},
    // show/hide password
    showPassword: function() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },

    // Auth0 login
    login() {
      API.post("/api/login", {
        username: this.username,
        password: this.password,
      }).then(({ status, data }) => {
        console.log(status);
        if (status == 200 || status == 201) {
          //jika respon dari backend berhasil
          //const { data, message, status } = data; //ambil hasilnya

          if (data.status) {
            setUser(data.data[0]);
            this.$toasted.show("Login Berhasil", {
              theme: "bubble",
              position: "top-right",
              type: "success",
              duration: 2000,
            });
            setTimeout(() => {
              //proses pindah halaman
              this.$router.push({ path: "/main/dashboard" });
            }, 500);

            console.log(data, data);
          } else {
            //notif gagal
            this.$toasted.show("Login Gagal", {
              theme: "bubble",
              position: "top-right",
              type: "error", //"success" kalau sukses
              duration: 2000,
            });
          }
        } else {
          //notif gagal
          this.$toasted.show("Login Gagal", {
            theme: "bubble",
            position: "top-right",
            type: "error", //"success" kalau su
            duration: 2000,
          });
        }
      });
    },
  },
};
</script>
