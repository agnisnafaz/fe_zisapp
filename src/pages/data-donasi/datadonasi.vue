<template>
  <div>
    <Breadcrumbs title="Donasi" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Donasi</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <data-table
                :items="data"
                :headers="headers"
                :hideadd="true"
                :hidesimpan="true"
                :hidecetak="true"
                @add="$router.push({ path: '/main/direktur/realisasi' })"
                @edit="$router.push({ path: '/main/pengajuan/edit' })"
                @delete="onDelete"
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
        { text: "NPWZ", value: "npwz" },
        { text: "Muzaki", value: "nama_muzaki" },
        { text: "Jenis Kelamin", value: "jk" },
        { text: "Alamat", value: "alamat_muzaki" },
        { text: "Total Donasi", value: "total_donasi" },
      ],
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      API.get("/api/donasibymuzaki").then(({ status, data }) => {
        console.log(data);
        if (status == 200 || status == 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.data = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },

    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: "" }),
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
        }
      });
    },
  },
};
</script>
