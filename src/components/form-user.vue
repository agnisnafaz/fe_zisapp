<template>
  <div>
    <b-card no-body>
      <b-card-text>
        <b-form class="needs-validation" @submit.prevent="onsubmit">
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="c_form_koder">Kode </label>
              <b-form-input
                disabled
                type="text"
                v-model="form.kode_pengguna"
                placeholder="Kode"
              ></b-form-input>
            </div>
            <div class="col-md-6 mb-3">
              <label for="c_form_namauser">Nama</label>
              <b-form-input
                type="text"
                v-model="form.nama_pengguna"
                placeholder="Nama"
              ></b-form-input>
              <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="c_form_alamat">Alamat</label>
              <b-form-input
                type="text"
                v-model="form.alamat_pengguna"
                placeholder="Alamat"
              ></b-form-input>
            </div>
            <div class="col-md-6 mb-3">
              <label for="c_form_telepon">Telepon</label>
              <b-form-input
                type="text"
                v-model="form.telepon_pengguna"
                placeholder="Telepon"
              ></b-form-input>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="c_form_username">Username</label>
              <b-form-input
                type="text"
                v-model="form.username"
                placeholder="Username"
              ></b-form-input>
            </div>
            <div class="col-md-6 mb-3">
              <label for="c_form_password">Password</label>
              <b-form-input
                type="text"
                v-model="form.password"
                placeholder="Password"
              ></b-form-input>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="c_form_pimpinan">Level</label>
              <b-form-select
                v-model="form.leveluser"
                :options="optionlevel"
              ></b-form-select>
            </div>
            <div class="col-md-6 mb-3" v-show="hidestatus">
              <label for="c_form_statususer">Status</label>
              <b-form-select
                v-model="form.status_pengguna"
                :options="optionstatus"
              ></b-form-select>
            </div>
          </div>

          <b-button type="submit" variant="primary">Simpan</b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import API from "@/services/api.service";

export default {
  props: ["hidestatus", "body", "isEdit"],
  data() {
    return {
      form: {},
      optionlevel: [
        { value: "1", text: "Direktur" },
        { value: "2", text: "Akuntan" },
        { value: "3", text: "Program" },
        { value: "4", text: "ZISR"},
        { value: "5", text: "FO"},
        { value: "6", text: "Admin"},
      ],
      optionstatus: [
        { value: "1", text: "aktif" },
        { value: "2", text: "tidak aktif" },
      ],
      kantorlayanan: [],
      password: ''
    };
  },

  watch: {
    body: function(newVal) {
      console.log(newVal);
      this.form = newVal;
    },
  },

  methods: {
    onsubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
