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
                    disabled
                    v-model="form.no_pengajuan"
                    type="text"
                    placeholder="No.Pengajuan"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_nama">Mustahik</label>
                  <v-autocomplete
                    disabled
                    :items="mustahik"
                    item-text="nama_mustahik"
                    item-value="kode_mustahik"
                    v-model="form.kode_mustahik"
                    auto-select-first
                    outlined
                    required
                    small
                  >
                    <template v-slot:item="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.kode_mustahik + " - " + item.nama_mustahik }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.kode_mustahik + " - " + item.nama_mustahik }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_kegiatan">Keterangan</label>
                  <b-form-input
                    disabled
                    v-model="form.detail_keterangan"
                    type="text"
                    placeholder="Keterangan"
                  ></b-form-input>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input
                    disabled
                    v-model="form.jumlah_donasi"
                    type="text"
                    placeholder="Jumlah"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_jenis">Jenis</label>
                  <b-form-select
                    disabled
                    v-model="form.jenis_pengajuan"
                    :options="optionjenispengajuan"
                  ></b-form-select>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_asnaf">Asnaf</label>

                  <b-form-select
                    disabled
                    v-model="form.asnaf"
                    :options="optionasnaf"
                  ></b-form-select>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-4 ">
                  <label for="c_form_jumlah">Jumlah Realisasi</label>
                  <b-form-input
                    v-model="form.jumlah_realisasi"
                    type="text"
                    placeholder="Jumlah"
                  ></b-form-input>
                </div>
                <div class="col-md-4 ">
                  <label for="datepicker">Tanggal Realisasi</label>
                  <b-form-datepicker
                    id="datepicker"
                    v-model="form.tgl_realisasi"
                  >
                  </b-form-datepicker>
                </div>
                <div class="col-md-4 ">
                  <label for="c_form_jumlah">Status</label>
                  <b-form-select
                    v-model="form.status_pengajuan"
                    :options="optionstatuspengajuan"
                  ></b-form-select>
                </div>
              </div>
              <div>
                <b-button type="submit" variant="primary">Proses</b-button>
                <b-button type="submit" variant="danger" class="ml-3"
                  >Reset</b-button
                >
              </div>
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
      optionstatuspengajuan: [
        { value: "0", text: "Ditolak" },
        { value: "1", text: "Diterima" },
      ],
      mustahik: [],
    };
  },
  created() {
    this.getMustahik();
  },
  methods: {
    getMustahik() {
      API.get("/api/mustahik").then(({ status, data }) => {
        console.log(data);
        if (status == 200 || status == 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.mustahik = data.data;
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
