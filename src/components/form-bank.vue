<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-6 mb-1">
                  <label for="c_form_norek">No.Rekening</label>
                  <b-form-input
                    type="text"
                    placeholder="No.Rekening"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-1">
                  <label for="c_form_nama">Nama Bank</label>
                  <b-form-input
                    type="text"
                    placeholder="Nama Bank"
                  ></b-form-input>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-12 ">
                  <label for="c_form_kodeakun">Kode Akun</label>

                  <v-autocomplete
                    :items="kodeakun"
                    item-text="label"
                    auto-select-first
                    return-object
                    outlined
                    required
                    small
                  ></v-autocomplete>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="c_form_kantor">Kantor Layanan</label>
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
      kodeakun: [],
      kantorlayanan: [],
    };
  },
  created() {
    this.getKantorLayanan();
    this.getKodeAkun();
  },
  methods: {
    getKodeAkun() {
      API.get("/api/akun").then(({ status, data }) => {
        console.log(data);
        if (status == 200 || status == 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.kodeakun = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },

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
    onsubmit() {},
  },
};
</script>
