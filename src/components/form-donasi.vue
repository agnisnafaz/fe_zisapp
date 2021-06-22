<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_muzaki">Muzaki</label>
                  <v-autocomplete
                    :items="muzaki"
                    item-text="npwz"
                    item-value="nama_muzaki"
                    v-model="form.nama_muzaki"
                    auto-select-first
                    outlined
                    required
                    small
                  >
                    <template v-slot:item="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.npwz + " - " + item.nama_muzaki }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.npwz + " - " + item.nama_muzaki }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_bank">Bank</label>
                  <v-autocomplete
                    :items="bank"
                    item-text="nama_bank"
                    item-value="no_rek"
                    v-model="form.no_rek"
                    auto-select-first
                    outlined
                    required
                    small
                  >
                    <template v-slot:item="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.nama_bank + " - " + item.no_rek }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-list-tile-content>
                        <!-- Highlight output item.name -->
                        <v-list-tile-title>
                          {{ item.nama_bank + " - " + item.no_rek }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-3 ">
                  <label for="c_form_nobukti">No Bukti Fisik</label>
                  <b-form-input
                    type="text"
                    placeholder="No Bukti Fisik"
                  ></b-form-input>
                </div>
                <div class="col-md-3 ">
                  <label for="c_form_periode">Periode</label>

                  <b-form-select
                    v-model="form.periode"
                    :options="optionperiode"
                  ></b-form-select>
                </div>
                <div class="col-md-3 ">
                  <label for="datepicker">Tanggal Donasi</label>
                  <b-form-datepicker id="datepicker" v-model="value">
                  </b-form-datepicker>
                </div>
                <div class="col-md-3 ">
                  <label for="c_form_periode">Metode Pembayaran</label>

                  <b-form-select
                    v-model="form.metode_pembayaran"
                    :options="optionmetode"
                  ></b-form-select>
                </div>
              </div>
            </b-form>
          </div>
        </px-card>

        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_program">Program</label>
                  <v-autocomplete
                    :items="program"
                    item-text="nama_program"
                    item-value="id_program"
                    v-model="form.id_program"
                    auto-select-first
                    outlined
                    required
                    small
                  >
                  </v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 ">
                  <label for="c_form_keterangan">Keterangan</label>
                  <b-form-input
                    type="text"
                    placeholder="Keterangan"
                  ></b-form-input>
                </div>
                <div class="col-md-6 ">
                  <label for="c_form_jumlah">Jumlah</label>
                  <b-form-input type="text" placeholder="Jumlah"></b-form-input>
                </div>
              </div>
              <data-table
                :items="data"
                :headers="headers"
                :hidesimpan="true"
                @simpan="onSimpan"
                @add="onTambah"
                @delete="onDelete"
              />
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
      optionmetode: [],
      optionperiode: [],
      muzaki: [],
      bank: [],
      program: [],
    };
  },
  created() {
    this.getMuzaki();
    this.getProgram();
    this.getBank();
  },

  methods: {
    getMuzaki() {
      API.get("/api/muzaki").then(({ status, data }) => {
        console.log(data);
        if (status == 200 || status == 201) {
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
        console.log(data);
        if (status == 200 || status == 201) {
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
        console.log(data);
        if (status == 200 || status == 201) {
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

    onTambah() {},

    onSimpan() {},
  },
};
</script>
