<template>
  <div>
    <Breadcrumbs title="Donasi" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{ nama_muzaki }}</h5>
            </div>
            <div>{{ npwz }}</div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <data-table
                :items="data"
                :headers="headers"
                :hideadd="true"
                :hidesimpan="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import API from "@/services/api.service";
export default {
  data: () => {
    return {
      headers: [
        { text: "Tgl.Transaksi", value: "tgl_transaksi" },
        { text: "Program", value: "nama_program" },
        { text: "Bank Tujuan", value: "nama_bank" },
        { text: "Total Donasi", value: "total_donasi" },
      ],
      data: [],
      npwz: "",
      nama_muzaki: "",
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getDetailDonasiById(this.$route.params.id);
      this.getDonasi(this.$route.params.id);
    }
  },
  methods: {
    getDetailDonasiById(id) {
      API.get(`/api/donasi/${id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.status) {
              this.body = data.data;
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
    getDonasi(id) {
      API.get(`/api/donasi/${id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.status) {
              this.body = data.data;
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
  },
};
</script>
