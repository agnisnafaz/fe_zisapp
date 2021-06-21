<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-4 mb-1">
                  <label for="c_form_muzaki">Muzaki</label>
                  <v-autocomplete
                    :items="muzaki"
                    item-text="label"
                    auto-select-first
                    return-object
                    outlined
                    required
                    small
                  >
                  </v-autocomplete>
                </div>
                <div class="col-md-4 mb-1">
                  <label for="c_form_program">Program</label>
                  <v-autocomplete
                    :items="program"
                    item-text="label"
                    auto-select-first
                    return-object
                    outlined
                    required
                    small
                  >
                  </v-autocomplete>
                </div>
                <div class="col-md-4 mb-1">
                  <label for="c_form_bank">Bank</label>
                  <v-autocomplete
                    :items="bank"
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
                <div class="col-md-4 mb-1">
                  <label for="c_form_buktifisik">No Bukti Fisik</label>
                  <b-form-input
                    type="text"
                    placeholder="No.Bukti Fisik"
                  ></b-form-input>
                </div>
                <div class="col-md-4 ">
                  <label for="c_form_periode">Periode</label>

                  <b-form-select
                    v-model="form.periode"
                    :options="optionperiode"
                  ></b-form-select>
                </div>
                <div class="col-md-4 ">
                  <label for="datepicker">Tanggal Donasi</label>
                  <b-form-datepicker id="datepicker" v-model="value">
                  </b-form-datepicker>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_periode">Metode Pembayaran</label>

                  <b-form-select
                    v-model="form.metode_pembayaran"
                    :options="optionmetode"
                  ></b-form-select>
                </div>
                <div class="col-md-6 mb-1">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input type="text" placeholder="Jumlah"></b-form-input>
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
import Pxcard from "./Pxcard.vue";
import API from "@/services/api.service";
export default {
  components: { Pxcard },
  data() {
    return {
      form: {},
      optionperiode: [],
      optionmetode: [],
      muzaki: [],
      program: [],
      bank: [],
    };
  },
  methods: {
    getMuzaki() {
      API.get("/api/muzaki").then(({ status, data }) => {
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

    getProgram() {
      API.get("/api/program").then(({ status, data }) => {
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
    getBank() {
      API.get("/api/bank").then(({ status, data }) => {
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
