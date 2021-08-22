<template>
  <div>
    <Breadcrumbs title="Transaksi Zakat Infaq dan Sodaqoh" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Donasi</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormDonasi @submit="onSimpan" :body="{}"/>
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
    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: data.id_program }),
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          //delete disini
          API.delete(`/api/donasi/${data.id_program}`).then(
            ({ status, data }) => {
              if (status == 200 || status == 201) {
                // reponse dari be jika berhasil

                if (data.status) {
                  //berhasil
                  this.$toasted.show("Data Berhasil Dihapus", {
                    theme: "bubble",
                    position: "top-right",
                    type: "success", //"success" kalau su
                    duration: 2000,
                  });
                } else {
                  //notifikasi gagal
                  this.$toasted.show("Data Gagal Dihapus", {
                    theme: "bubble",
                    position: "top-right",
                    type: "error", //"success" kalau su
                    duration: 2000,
                  });
                }
                this.getData();
              } else {
                //notifikasi gagal
                this.$toasted.show("Data Gagal Dihapus", {
                  theme: "bubble",
                  position: "top-right",
                  type: "error", //"success" kalau su
                  duration: 2000,
                });
              }
            }
          );
        }
      });
    },
    onSimpan(form) {
      console.log(form);
      API.post("/api/donasi", form)
        .then(({ status, data }) => {
          console.log("Tes",window);
          if (status === 200 || status === 201) {
            // reponse dari be jika berhasil

            if (data.status) {
              //berhasil
              this.$toasted.show("Data Berhasil Disimpan", {
                theme: "bubble",
                position: "top-right",
                type: "success", //"success" kalau su
                duration: 2000,
              });

             // this.$router.push({
             //   path: "/main/cetakdonasi",
              //  query: {
               //   nama_muzaki: `${data.data.nama_muzaki}`,
               //   id_donasi: `${data.data.id_donasi}`,
               //   npwz: `${data.data.npwz}`,
                //  nama_pengguna: `${data.data.nama_pengguna}`,
                //},
            //  });
              window.location.href = `http://localhost:8000/api/tandaterima/cetak_tanda?nama_muzaki=${data.data.nama_muzaki}&id_donasi=1629034820&npwz=1011110001&nama_pengguna=${data.data.nama_pengguna}`;

            } else {
              //notifikasi gagal
              this.$toasted.show("Data Gagal Disimpan", {
                theme: "bubble",
                position: "top-right",
                type: "error", //"success" kalau su
                duration: 2000,
              });
            }
          } else {
            //notifikasi gagal
            this.$toasted.show("Data Gagal Disimpan", {
              theme: "bubble",
              position: "top-right",
              type: "error", //"success" kalau su
              duration: 2000,
            });
          }
        })
        .catch(() => {
          //gagal
          this.$toasted.show("Data Gagal Disimpan", {
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
