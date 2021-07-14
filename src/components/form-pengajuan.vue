<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit.prevent="onsubmit">
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_no-pengajuan">No. Pengajuan</label>
                  <b-form-input
                    disabled
                    type="text"
                    placeholder="No.Pengajuan"
                    v-model="form.no_pengajuan"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_nama">Mustahik</label>
                  <v-autocomplete
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
                  <label for="c_form_kegiatan">Kegiatan</label>
                  <b-form-input
                    type="text"
                    placeholder="Kegiatan"
                    v-model="form.pengajuan_kegiatan"
                  ></b-form-input>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input
                    type="text"
                    placeholder="Jumlah"
                    v-model="form.jumlah_pengajuan"
                  ></b-form-input>
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
      optionasnaf: [
        { value: "1", text: "Fakir Miskin" },
        { value: "2", text: "Riqob" },
        { value: "3", text: "Ibnu Sabil" },
        { value: "4", text: "Ghorimin" },
        { value: "5", text: "Amil" },
        { value: "6", text: "Fisabilillah" },
        { value: "7", text: "Lan-lain" },
      ],
      optionjenispengajuan: [
        { value: "1", text: "Konsumtif" },
        { value: "2", text: "Produktif" },
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

    onsubmit() {
      console.log(this.form);
      this.$emit("submit", this.form);
    },
  },
};
</script>
