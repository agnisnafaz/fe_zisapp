<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="CetakA1">
                <div class="tbel-program" id="table">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td class="item">
                          <h6 class="p-2 mb-0">Keterangan</h6>
                        </td>
                        <td class="Hours">
                          <h6 class="p-2 mb-0">Jumlah</h6>
                        </td>
                      </tr>
                      <tr v-for="(keterangan, index) in program" :key="index">
                        <td>
                          <p class="itemtext digits">
                            {{ keterangan.nama_program }}
                          </p>
                        </td>

                        <td>
                          <p class="itemtext digits">
                            Rp {{ keterangan.total }}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td class="Rate">
                          <h6 class="mb-0 p-2">Total</h6>
                        </td>
                        <td class="payment digits">
                          <h6 class="mb-0 p-2">Rp {{ total_semua }}</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="card-header">
                <h5>Pecahan Kertas</h5>
              </div>

              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">100.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_seratus"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">50.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_limapuluh"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">20.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_duapuluh"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">10.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_sepuluh"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">5.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_limaribu"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">2.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_duaribu"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">1.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.kertas_seribu"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="card-header">
                <h5>Pecahan Logam</h5>
              </div>

              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">1.000</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.logam_seribu"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">500</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.logam_limaratus"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">200</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.logam_duaratus"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small">100</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    v-model="form.logam_seratus"
                    placeholder="Jumlah"
                  ></b-form-input>
                </b-col>
              </b-row>
              <div>
                <b-button @click="onsubmit" type="submit" variant="primary"
                  >Cetak</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api.service";
export default {
  data: () => {
    return {
      form: {
        kertas_seratus: 0,
        kertas_limapuluh: 0,
        kertas_duapuluh: 0,
        kertas_sepuluh: 0,
        kertas_limaribu: 0,
        kertas_duaribu: 0,
        kertas_seribu: 0,
        logam_seribu: 0,
        logam_limaratus: 0,
        logam_duaratus: 0,
        logam_seratus: 0,
      },

      program: [],
      total_semua: 0,

      data: [],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getDonasi(this.$route.params.id);
    }
  },
  methods: {
    getDonasi(id) {
      API.get(`/api/laporanharian?tgl_donasi=${id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.status) {
              this.program = data.data;
              this.total_semua = data.total_semua;
              console.log(this.program);
            }
          }
        })
        .catch((e) => {
          this.$toasted.show("Data Tidak Ditemukan", {
            theme: "bubble",
            position: "top-right",
            type: "error", //"success" kalau su
            duration: 2000,
          });
        });
    },
    onsubmit() {
      this.$emit("submit", this.form);
      this.form = {};
    },
    printWindow() {
      window.print();
    },
  },
};
</script>
