<template>
  <div>
    <Breadcrumbs title="Pengajuan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Pengajuan</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <data-table
                :items="data"
                :headers="headers"
                :hidesimpan="true"
                :hideadd="true"
                :hidecetak="true"
                :hidekonfirm="true"
                :hidedelete="true"
                @edit="editPengajuan"
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
        { text: "No.Pengajuan", value: "no_pengajuan" },
        { text: "Kegiatan", value: "pengajuan_kegiatan" },
        { text: "Jumlah", value: "jumlah_pengajuan" },
        { text: "Status", value: "status_pengajuan" },
        { text: "AKSI", value: "action" },
      ],
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      API.get("/api/pengajuan").then(({ status, data }) => {
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
    editPengajuan(data) {
      this.$router.push({
        path: "/main/direktur/realisasi/" + data.id_pengajuan,
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
