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
                    item-value="id_mustahik"
                    v-model="form.id_mustahik"
                    auto-select-first
                    outlined
                    small
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{
                            item.kode_mustahik + " - " + item.nama_mustahik
                          }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.kode_mustahik + " - " + item.nama_mustahik }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_kegiatan">Keterangan</label>
                  <b-form-input
                    disabled
                    v-model="form.pengajuan_kegiatan"
                    type="text"
                    placeholder="Keterangan"
                  ></b-form-input>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input
                    disabled
                    v-model="form.jumlah_pengajuan"
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
                    disabled
                    v-model="form.jumlah_realisasi"
                    type="text"
                    placeholder="Jumlah"
                  ></b-form-input>
                </div>
                <div class="col-md-4 ">
                  <label>Tanggal Realisasi</label>
                  <b-form-datepicker
                    disabled
                    id="datepicker"
                    v-model="form.tgl_realisasi"
                  >
                  </b-form-datepicker>
                </div>

                <div class="col-md-4 ">
                  <label for="c_form_jumlah">Status</label>
                  <b-form-select
                    disabled
                    v-model="form.status_pengajuan"
                    :options="optionstatuspengajuan"
                  ></b-form-select>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 ">
                  <label>Bukti Penerimaan</label>
                  <b-form-file
                    placeholder="Pilih File"
                    drop-placeholder="Pilih File"
                    @change="onPilihFile"
                  ></b-form-file>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 ">
                  <label>Deskripsi Kegiatan</label>
                  <b-form-input
                    type="text"
                    placeholder="Deskripsi "
                    v-model="form.deskripsi_kegiatan"
                  ></b-form-input>
                </div>
              </div>
              <div class="mt-5">
                <b-button type="submit" variant="primary">Simpan</b-button>
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
  props: ["isEdit", "body"],
  data() {
    return {
      form: {},
      selectedFile: null,
      optionasnaf: [
        { value: "1", text: "Fakir Miskin" },
        { value: "2", text: "Riqob" },
        { value: "3", text: "Ibnu Sabil" },
        { value: "4", text: "Ghorimin" },
        { value: "5", text: "Amil" },
        { value: "6", text: "Fisabilillah" },
        { value: "7", text: "Muallaf" },
        { value: "8", text: "Lan-lain" },
      ],
      optionjenispengajuan: [
        { value: "1", text: "Konsumtif" },
        { value: "2", text: "Produktif" },
      ],
      optionstatuspengajuan: [
        { value: "1", text: "Proses" },
        { value: "2", text: "Diterima" },
        { value: "3", text: "Ditolak" },
        { value: "4", text: "Selesai" },
      ],
      mustahik: [],
    };
  },
  created() {
    this.getMustahik();
  },
  watch: {
    body: function(newVal) {
      console.log(newVal);
      this.form = newVal;
    },
  },
  methods: {
    getMustahik() {
      API.get("/api/mustahik").then(({ status, data }) => {
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
    onPilihFile(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },

    onsubmit() {
      let formdata = new FormData();
      formdata.append("image", this.selectedFile);
      formdata.append("no_pengajuan", this.form.no_pengajuan);
      formdata.append("nama_mustahik", this.form.nama_mustahik);
      formdata.append("pengajuan_kegiatan", this.form.pengajuan_kegiatan);
      formdata.append("jumlah_pengajuan", this.form.jumlah_pengajuan);
      formdata.append("jenis_pengajuan", this.form.jenis_pengajuan);
      formdata.append("asnaf", this.form.asnaf);
      formdata.append("jumlah_realisasi", this.form.jumlah_realisasi);
      formdata.append("status_pengajuan", this.form.status_pengajuan);

      formdata.append("tgl_realisasi", this.form.tgl_realisasi);
      this.$emit("submit", formdata);
    },
  },
};
</script>
