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

              <b-button type="submit" variant="primary">Simpan</b-button>
            </b-form>
          </b-card-text>
        </b-tab>
        <b-tab title="Rubah Password">
          <b-card-text>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label class="col-form-label">Password Baru</label>
                <input
                  v-model="form.passwordbaru"
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
                  v-model="form.konfirmasi_password"
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
            <b-button type="submit" variant="primary">Simpan</b-button>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import API from "@/services/api.service";
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
    onsubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
