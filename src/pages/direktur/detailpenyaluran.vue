<template>
  <div>
    <Breadcrumbs title="Pengajuan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Detail Pengajuan</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormDetailPengajuan :body="body"></FormDetailPengajuan>
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
      body: {},
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getPengajuanById(this.$route.params.id);
    }
  },
  methods: {
    getPengajuanById(id) {
      API.get(`/api/pengajuan/${id}`)
        .then(({ status, data }) => {
          console.log(data);
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
