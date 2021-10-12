<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="User" active>
          <b-card-text>
            <b-form class="needs-validation" @submit.prevent="onsubmit">
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="c_form_koder">Kode </label>
                  <b-form-input
                    disabled
                    type="text"
                    v-model="form.kode_pengguna"
                    placeholder="Kode"
                  ></b-form-input>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_namauser">Nama</label>
                  <b-form-input
                    type="text"
                    v-model="form.nama_pengguna"
                    placeholder="Nama"
                  ></b-form-input>
                  <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_alamat">Alamat</label>
                  <b-form-input
                    type="text"
                    v-model="form.alamat_pengguna"
                    placeholder="Alamat"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_telepon">Telepon</label>
                  <b-form-input
                    type="text"
                    v-model="form.telepon_pengguna"
                    placeholder="Telepon"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_username">Username</label>
                  <b-form-input
                    type="text"
                    v-model="form.username"
                    placeholder="Username"
                  ></b-form-input>
                </div>
              </div>

              <b-button type="submit" variant="primary" @click="editUser"
                >Simpan</b-button
              >
            </b-form>
          </b-card-text>
        </b-tab>
        <b-tab title="Rubah Password">
          <b-card-text>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label class="col-form-label">Password Baru</label>
                <input
                  v-model="form.password"
                  class="form-control"
                  :type="type"
                  name="login[password]"
                  required=""
                  placeholder="*********"
                />

                <div class="show-hide" @click="showPassword">
                  <span class="show"></span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="col-form-label">Konfirmasi Password Baru</label>
                <input
                  v-model="form.konfirmasipassword"
                  class="form-control"
                  :type="type"
                  name="login[password]"
                  required=""
                  placeholder="*********"
                />

                <div class="show-hide" @click="showPassword">
                  <span class="show"></span>
                </div>
              </div>
            </div>
            <b-button type="submit" variant="primary" @click="editPassword"
              >Simpan</b-button
            >
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import API from "@/services/api.service";
import { getUser } from "@/services/jwt.service";
export default {
  props: ["body", "isEdit"],
  data() {
    return {
      type: "password",

      form: {},
    };
  },

  watch: {
    body: function(newVal) {
      console.log(newVal);
      this.form = newVal;
    },
  },

  methods: {
    showPassword: function() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    editUser(form) {
      const user = getUser();
      if (user) {
        API.put(`/api/pengguna/${user.id_pengguna}`, form)
          .then(({ status, data }) => {
            if (status == 200 || status == 201) {
              // reponse dari be jika berhasil

              if (data.status) {
                //berhasil
                this.$toasted.show("Data Berhasil Diedit", {
                  theme: "bubble",
                  position: "top-right",
                  type: "success", //"success" kalau su
                  duration: 2000,
                });
                this.$router.push({ path: "/main/dashboard" });
              } else {
                //notifikasi gagal
                this.$toasted.show("Data Gagal Disimpan", {
                  theme: "bubble",
                  position: "top-right",
                  type: "error",
                  duration: 2000,
                });
              }
            } else {
              //notifikasi gagal
              this.$toasted.show("Data Gagal Diedit", {
                theme: "bubble",
                position: "top-right",
                type: "error",
                duration: 2000,
              });
            }
          })
          .catch((error) => {
            //gagal
            this.$toasted.show("Data Gagal Diedit", {
              theme: "bubble",
              position: "top-right",
              type: "error", //"success" kalau su
              duration: 2000,
            });
          });
      }
    },
    editPassword(form) {
      const user = getUser();
      if (user) {
        API.put(`/api/passwordpengguna/${user.id_pengguna}`, form)
          .then(({ status, data }) => {
            if (status == 200 || status == 201) {
              // reponse dari be jika berhasil

              if (data.status) {
                //berhasil
                this.$toasted.show("Password Berhasil Diubah", {
                  theme: "bubble",
                  position: "top-right",
                  type: "success", //"success" kalau su
                  duration: 2000,
                });
                this.$router.push({ path: "/main/dashboard" });
              } else {
                //notifikasi gagal
                this.$toasted.show("Password Gagal diubah", {
                  theme: "bubble",
                  position: "top-right",
                  type: "error",
                  duration: 2000,
                });
              }
            } else {
              //notifikasi gagal
              this.$toasted.show("Password Gagal diubah", {
                theme: "bubble",
                position: "top-right",
                type: "error",
                duration: 2000,
              });
            }
          })
          .catch((error) => {
            //gagal
            this.$toasted.show("Data Gagal Diedit", {
              theme: "bubble",
              position: "top-right",
              type: "error", //"success" kalau su
              duration: 2000,
            });
          });
      }
    },
    onsubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
