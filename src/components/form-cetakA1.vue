<template>
  <div>
    <!-- Container-fluid starts-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="invoice">
                <div>
                  <div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="media">
                          <div class="media-left">
                            <!-- <img
                              class="media-object img-60"
                              src="../../assets/images/other-images/logo-login.png"
                              alt
                            /> -->
                          </div>
                          <!-- <div class="media-body m-l-20">
                            <h4 class="media-heading">Cuba</h4>
                            <p>
                              hello@cuba.in
                              <br />
                              <span class="digits">289-335-6503</span>
                            </p>
                          </div> -->
                        </div>
                        <!-- End Info-->
                      </div>
                      <!-- <div class="col-sm-6">
                        <div class="text-md-right">
                          <h3>
                            Invoice
                            <span class="digits counter">#1069</span>
                          </h3>
                          <p>
                            Issued: May
                            <span class="digits">27, 2019</span>
                            <br />Payment Due: June
                            <span class="digits">27, 2019</span>
                          </p>
                        </div> -->
                      <!-- End Title-->
                    </div>
                  </div>
                </div>
                <hr />
                <!-- End InvoiceTop-->
                <div class="row">
                  <div class="col-md-4">
                    <div class="media">
                      <div class="media-left">
                        <!-- <img
                            class="media-object rounded-circle img-60"
                            src="../../assets/images/user/1.jpg"
                            alt
                          /> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8"></div>
                </div>
                <!-- End Invoice Mid-->
                <div>
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
                              {{ getType(keterangan.type) }}
                            </p>
                          </td>
                          <td>
                            <p class="itemtext digits">
                              {{ keterangan.nama_program }}
                            </p>
                          </td>
                          <td>
                            <p class="itemtext digits">
                              Rp {{ formatCurrency(keterangan.value) }}
                            </p>
                          </td>
                          <td>
                            <p class="itemtext digits">
                              Rp {{ formatCurrency(keterangan.jumlah_donasi) }}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="Rate">
                            <h6 class="mb-0 p-2">Total</h6>
                          </td>
                          <td class="payment digits">
                            <h6 class="mb-0 p-2">{{ total_donasi }}</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- End Table-->
                  <div class="row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4">
                      <form class="text-right"></form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 text-center mt-3"></div>
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
      program: [],
      total_donasi: 0,
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
      API.get(`/api/donasi/${id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.status) {
              this.data = data.data;
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
    printWindow() {
      window.print();
    },
  },
};
</script>
