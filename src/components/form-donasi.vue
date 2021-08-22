<template>
  <div class="row">
    <div class="col-sm-12">
      <div slot="with-padding">
        <div class="form-row">
          <div class="col-md-12">
            <label>Muzaki</label>
            <v-autocomplete
              :items="muzaki"
              item-text="npwz"
              return-object
              v-model="muzakiselected"
              auto-select-first
              outlined
              required
              dense
              small
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      item.npwz + " - " + item.nama_muzaki
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </template>
              <template v-slot:selection="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.npwz + " - " + item.nama_muzaki }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </div>

          <div class="col-md-4">
            <label>No Bukti Fisik</label>
            <b-form-input
              type="text"
              placeholder="No Bukti Fisik"
              v-model="form.no_bukti"
            ></b-form-input>
          </div>

          <div class="col-md-4 ">
            <label>Tanggal Donasi</label>
            <b-form-datepicker id="datepicker" v-model="form.tgl_donasi">
            </b-form-datepicker>
          </div>
          <div class="col-md-4">
            <label>Metode Pembayaran</label>

            <b-form-select
              v-model="form.metode"
              :options="optionmetode"
            ></b-form-select>
          </div>
        </div>
      </div>
      <!--  -->
      <div slot="with-padding" class=" mt-10">
        <h5>Detail Donasi</h5>

        <div class="form-row">
          <div class="col-md-4">
            <label>Program</label>
            <v-autocomplete
              :items="program"
              item-text="nama_program"
              return-object
              v-model="programselected"
              auto-select-first
              outlined
              required
              dense
              small
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      item.nama_program +
                        " - " +
                        item.nama_bank +
                        " " +
                        item.no_rek
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </template>
              <template v-slot:selection="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      item.nama_program +
                        " - " +
                        item.nama_bank +
                        " " +
                        item.no_rek
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </div>
          <div class="col-md-4 ">
            <label>Keterangan</label>
            <b-form-input
              type="text"
              placeholder="Keterangan"
              v-model="form_detail.keterangan"
            ></b-form-input>
          </div>
          <div class="col-md-4 ">
            <label>Jumlah</label>
            <b-form-input
              type="text"
              placeholder="Jumlah"
              v-model="form_detail.jumlah_donasi"
            ></b-form-input>
          </div>
        </div>

        <data-table
          :items="detail_donasi"
          :headers="headers"
          :hidesimpan="false"
          :hideadd="false"
          :hidecetak="true"
          @simpan="onSimpan"
          @add="onTambah"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api.service";
import { getUser } from "@/services/jwt.service";
export default {
  data() {
    return {
      programselected: {},
      muzakiselected: {},
      headers: [
        { text: "Muzaki", value: "nama_muzaki" },
        { text: "Program", value: "nama_program" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Jumlah", value: "jumlah_donasi" },
        { text: "AKSI", value: "action" },
      ],
      detail_donasi: [],
      form: {
        total_donasi: 0,
      },
      form_detail: {},
      optionmetode: [
        { value: "1", text: "CASH" },
        { value: "2", text: "MUTASI BANK" },
      ],
      optionperiode: [],
      muzaki: [],
      bank: [],
      program: [],
    };
  },
  watch: {
    muzakiselected: function(muzaki) {
      this.form.id_muzaki = muzaki.id_muzaki;
    },
  },
  created() {
    this.getMuzaki();
    this.getProgram();
    this.getBank();
    const user = getUser();
    this.form.id_pengguna = user.id_pengguna;
  },

  methods: {
    getMuzaki() {
      API.get("/api/muzaki").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.muzaki = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    getProgram() {
      API.get("/api/program").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.program = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    getBank() {
      API.get("/api/bank").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.bank = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    onsubmit() {},

    onTambah() {
      this.form.total_donasi =
        parseInt(this.form.total_donasi) +
        parseInt(this.form_detail.jumlah_donasi);
      this.detail_donasi.push({
        idx: this.detail_donasi.length++,
        nama_muzaki: this.muzakiselected.nama_muzaki,
        nama_program: this.programselected.nama_program,
        id_program: this.programselected.id_program,
        kode_program: this.programselected.kode_program,
        jumlah_donasi: this.form_detail.jumlah_donasi,
        keterangan: this.form_detail.keterangan,
      });
    },

    onSimpan() {
      const user = getUser();
      this.form.id_pengguna = user.id_pengguna;
      this.form.detail_donasi = this.detail_donasi.filter((item) => {
        return item != null;
      });

      console.log(this.form);
      this.$emit("submit", this.form);
    },

    onDelete(data) {
      var index = this.detail_donasi
        .map((donasi) => donasi.idx)
        .indexOf(data.idx);
      this.detail_donasi.splice(index);
    },
  },
};
</script>
