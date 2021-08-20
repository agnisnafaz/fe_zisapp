<template>
  <div>
    <Breadcrumbs title="Program" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Bank</h5>
            </div>
            <div class="card-body">
              <!-- KONTENNYA DISINI -->

              <data-table
                :items="data"
                :headers="headers"
                :hidesimpan="true"
                :hidecetak="true"
                @add="
                  {
                    formBank = true;
                    isEdit = false;
                  }
                "
                @edit="onEdit"
                @delete="onDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <FormBank
      :show="formBank"
      :body="body"
      @tutup="formBank = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import API from "@/services/api.service";
export default {
  data: () => {
    return {
      headers: [
        { text: "No. Rekening", value: "no_rek" },
        { text: "Bank", value: "nama_bank" },
        { text: "AKSI", value: "action" },
      ],
      formBank: false,
      body: {},
      isEdit: false,
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    onEdit(data) {
      console.log(data);
      this.formBank = true;
      this.isEdit = true;
      this.body = data;
    },
    onSubmit(form) {
      if (this.isEdit) {
        API.put(`/api/bank/${this.body.id_bank}`, form).then(
          ({ status, data }) => {
            console.log(data);
            if (status == 200 || status == 201) {
              // reponse dari be jika berhasil

              if (data.status) {
                this.formBank = false;
                this.body = {};
                //berhasil
                this.$toasted.show("Data Berhasil Diedit", {
                  theme: "bubble",
                  position: "top-right",
                  type: "success", //"success" kalau su
                  duration: 2000,
                });

                this.getData();
              } else {
                //notifikasi gagal
                this.$toasted.show("Data Gagal Diedit", {
                  theme: "bubble",
                  position: "top-right",
                  type: "error", //"success" kalau su
                  duration: 2000,
                });
              }
            } else {
              //notifikasi gagal
              this.$toasted.show("Data Gagal Diedit", {
                theme: "bubble",
                position: "top-right",
                type: "error", //"success" kalau su
                duration: 2000,
              });
            }
          }
        );
      } else {
        API.post("/api/bank", form).then(({ status, data }) => {
          if (status == 200 || status == 201) {
            // reponse dari be jika berhasil

            if (data.status) {
              this.formBank = false;
              this.body = {};
              //berhasil
              this.$toasted.show("Data Berhasil Disimpan", {
                theme: "bubble",
                position: "top-right",
                type: "success", //"success" kalau su
                duration: 2000,
              });

              this.getData();
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
        });
      }
    },
    getData() {
      API.get("/api/bank").then(({ status, data }) => {
        if (status == 200 || status == 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil\

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
        text: this.$t("Delete Message", { who: `${data.nama_bank}` }),
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          //delete disini
          API.delete(`/api/bank/${data.id_bank}`).then(({ status, data }) => {
            if (status == 200 || status == 201) {
              // reponse dari be jika berhasil
              if (data.status) {
                this.getData();
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
            } else {
              //notifikasi gagal
              this.$toasted.show("Data Gagal Dihapus", {
                theme: "bubble",
                position: "top-right",
                type: "error", //"success" kalau su
                duration: 2000,
              });
            }
          });
        }
      });
    },
  },
};
</script>
