<template>
  <div>
    <Breadcrumbs title="Laporan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Rekap Penutupan</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormLaporanKas @submit="onCetak" :body="{}"></FormLaporanKas>
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
    return {};
  },
  methods: {
    onCetak(tgl) {
      this.$router.push({
        path: `/main/rekappenutupan/cetakA3/${tgl}`,
      });
    },
  },
};
</script>
