<template>
  <div>
    <Breadcrumbs title="Donasi" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-sm-6">
                  <div class="media">
                    <div class="media-left">
                      <img
                        src="../../assets/images/logo/logo.png"
                        alt=""
                        class="media-object img-60"
                      />
                    </div>
                    <div class="media-body m-l-20">
                      <h5 class="media-heading">{{ nama_muzaki }}</h5>
                      <p>
                        {{ npwz }}
                        <br /><span class="digits">(+62)81-226-809-435</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <data-table
                :items="data"
                :headers="headers"
                :hidesimpan="true"
                :hideadd="true"
                :hidecetak="false"
                :hidekonfirm="true"
                :hideupdate="true"
                :hidedelete="true"
                :hidedetail="true"
                @cetak="onCetak"
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
        { text: "No", value: "no" },
        { text: "Tgl.Transaksi", value: "tgl_donasi" },
        { text: "Program", value: "nama_program" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Jumlah Donasi", value: "jumlah_donasi" },
        { text: "AKSI", value: "action" },
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
    onCetak(form) {
      API.post("/api/donasi", form)
        .then(({ status, data }) => {
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

              window.location.href = `http://localhost:8000/api/tandaterima/cetak_tanda?id_donasi=${data.data.id_donasi}`;
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
    getDetailDonasiById(id) {
      API.get(`/api/donasibynpwz/${id}`)
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
    getDonasi(id) {
      API.get(`/api/donasi/${id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.status) {
              this.nama_muzaki = data.data[0].nama_muzaki;
              this.npwz = data.data[0].npwz;
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
