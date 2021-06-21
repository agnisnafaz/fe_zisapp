<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_kode">Kode </label>
                  <b-form-input
                    type="text"
                    placeholder="Kode Mustahik"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_nama">Nama</label>
                  <b-form-input type="text" placeholder="Nama"></b-form-input>
                  <b-form-valid-feedback>Lock Good</b-form-valid-feedback>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_alamat">Alamat</label>
                  <b-form-input type="text" placeholder="Alamat"></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_telepon">Telepon</label>
                  <b-form-input
                    type="text"
                    placeholder="Telepon"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-4 mb-3">
                  <label for="c_form_kategori">Kategori</label>
                  <b-form-select
                    v-model="form.kategori_mustahik"
                    :options="optionkategori"
                  ></b-form-select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="c_form_status">Status</label>
                  <b-form-select
                    v-model="form.statu_smustahik"
                    :options="optionstatus"
                  ></b-form-select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="c_form_status">Asnaf</label>
                  <b-form-select
                    v-model="form.asnaf"
                    :options="optionasnaf"
                  ></b-form-select>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_kantorlayanan">Kantor Layanan </label>
                  <v-autocomplete
                    :items="kantorlayanan"
                    item-text="label"
                    auto-select-first
                    return-object
                    outlined
                    required
                    small
                  ></v-autocomplete>
                </div>
              </div>
              <b-button type="submit" variant="primary">Simpan</b-button>
            </b-form>
          </div>
        </px-card>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api.service";
export default {
  data() {
    return {
      form: {},
      optionkategori: [],
      optionstatus: [],
      optionasnaf: [],
      kantorlayanan: [],
    };
  },
  methods: {
    getKantorlayanan() {
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
  },
  onsubmit() {},
};
</script>
