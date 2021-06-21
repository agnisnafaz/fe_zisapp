<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_no-pengajuan">No. Pengajuan</label>
                  <b-form-input
                    type="text"
                    placeholder="No. Pengajuan"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_nama">Mustahik</label>
                  <v-autocomplete
                    :items="mustahik"
                    item-text="label"
                    auto-select-first
                    return-object
                    outlined
                    required
                    small
                  >
                  </v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_kegiatan">Kegiatan</label>
                  <b-form-input
                    type="text"
                    placeholder="Kegiatan"
                  ></b-form-input>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input type="text" placeholder="Jumlah"></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_jenis">Jenis</label>

                  <b-form-select
                    v-model="form.jenis_pengajuan"
                    :options="optionjenispengajuan"
                  ></b-form-select>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_asnaf">Asnaf</label>

                  <b-form-select
                    v-model="form.asnaf"
                    :options="optionasnaf"
                  ></b-form-select>
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
      optionasnaf: [],
      optionjenispengajuan: [],
      namamustahik: [],
    };
  },
  methods: {
    getMustahik() {
      API.get("/api/mustahik").then(({ status, data }) => {
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
    onsubmit() {},
  },
};
</script>
