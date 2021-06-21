<template>
  <div>
    <Breadcrumbs title="Bank" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Bank</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <data-table
                :items="data"
                :headers="headers"
                @add="$router.push({ path: '/main/bank/add' })"
                @edit="$router.push({ path: '/main/bank/edit' })"
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
        { text: "Nama Bank", value: "nama_bank" },
        { text: "No. Rekening", value: "no_rek" },
        { text: "Kode Akun", value: "kode_akun" },
        { text: "Nama Akun", value: "nama_akun" },
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
      API.get("/api/bank").then(({ status, data }) => {
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
          API.delete("/api/bank").then((result) => {
            console.log(result);
          });
        }
      });
    },
  },
};
</script>
