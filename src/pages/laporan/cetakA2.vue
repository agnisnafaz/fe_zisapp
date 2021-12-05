<template>
  <div>
    <Breadcrumbs title="Laporan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Rekap Penerimaan</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormcetakA1 @submit="onCetak" :body="body"></FormcetakA1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      body: {},
    };
  },

  methods: {
    onCetak(data) {
      window.location.href = ` http://localhost:8000/api/cetaklaporan2?tgl_donasi=${this.$route.params.id}&kertas_seratus=${data.kertas_seratus}&kertas_limapuluh=${data.kertas_limapuluh}&kertas_duapuluh=${data.kertas_duapuluh}&kertas_sepuluh=${data.kertas_sepuluh}&kertas_limaribu=${data.kertas_limaribu}&kertas_duaribu=${data.kertas_duaribu}&kertas_seribu=${data.kertas_seribu}&logam_seribu=${data.logam_seribu}&logam_limaratus=${data.logam_limaratus}&logam_duaratus=${data.logam_duaratus}&logam_seratus=${data.logam_seratus}`;
    },
  },
};
</script>
