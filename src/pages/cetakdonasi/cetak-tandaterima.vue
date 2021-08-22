<template>
  <div>
    <Breadcrumbs title="Muzaki" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Cetak Tanda Terima</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <pdf
                src="http://localhost:8000/api/tandaterima/cetak_tanda?nama_muzaki=${data.data.nama_muzaki}&id_donasi=1629034820&npwz=1011110001&nama_pengguna=${data.data.nama_pengguna}"
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
import pdf from "vue-pdf-cdn";

export default {
  components: {
    pdf,
  },

  created() {
    this.getData();
  },
  methods: {},
};
</script>
