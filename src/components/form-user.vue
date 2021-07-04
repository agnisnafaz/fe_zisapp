<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="User" active>
          <b-card-text>
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_koder">Kode </label>
                  <b-form-input
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
                  <label for="c_form_pimpinan">Level</label>
                  <b-form-select
                    v-model="form.leveluser"
                    :options="optionlevel"
                  ></b-form-select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_statususer">Status</label>
                  <b-form-select
                    v-model="form.status_pengguna"
                    :options="optionstatus"
                  ></b-form-select>
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
              <!-- <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_kantorl">Kantor Layanan</label>
                  <v-autocomplete
                    :items="kantorlayanan"
                    item-text="nama_kantor"
                    item-value="id_kantor"
                    v-model="form.id_kantor"
                    auto-select-first
                    outlined
                    required
                    small
                  ></v-autocomplete>
                </div>
              </div> -->
              <b-button type="submit" variant="primary">Simpan</b-button>
            </b-form>
          </b-card-text>
        </b-tab>
        <b-tab title="Rubah Password">
          <b-card-text>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="c_form_koder">Kode </label>
                <b-form-input type="text" placeholder="Kode"></b-form-input>
              </div>
              <div class="col-md-4 mb-3">
                <label for="c_form_namauser">Nama</label>
                <b-form-input type="text" placeholder="Nama"></b-form-input>
                <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
              </div>
              <div class="col-md-4 mb-3">
                <label for="c_form_username">Username</label>
                <b-form-input type="text" placeholder="username"></b-form-input>
                <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="c_form_password">Password Lama </label>
                <b-form-input
                  type="password"
                  placeholder="Password Lama"
                ></b-form-input>
              </div>
              <div class="col-md-4 mb-3">
                <label for="c_form_passwordbaru">Password Baru</label>
                <b-form-input
                  type="password"
                  placeholder="Password Baru"
                ></b-form-input>
                <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
              </div>
              <div class="col-md-4 mb-3">
                <label for="c_form_konfpass">Konfirmasi Password Baru</label>
                <b-form-input
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                ></b-form-input>
                <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
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
  data() {
    return {
      form: {},
      optionlevel: [
        { value: "1", text: "admin" },
        { value: "1", text: "customer service" },
        { value: "1", text: "direktur" },
      ],
      optionstatus: [
        { value: "1", text: "aktif" },
        { value: "1", text: "tidak aktif" },
      ],
      kantorlayanan: [],
    };
  },
  created() {
    this.getKantorLayanan();
  },
  methods: {
    getKantorLayanan() {
      API.get("/api/kantor").then(({ status, data }) => {
        console.log(data);
        if (status == 200 || status == 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.kantorlayanan = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    onsubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
