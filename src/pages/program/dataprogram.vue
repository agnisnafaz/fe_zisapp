<template>
  <div>
    <Breadcrumbs title="Program" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Program</h5>
            </div>
            <div class="card-body">
              <!-- KONTENNYA DISINI -->

              <data-table
                :items="data"
                :headers="headers"
                @add="
                  {
                    formProgram = true;
                    isEdit = false;
                  }
                "
                @edit="
                  {
                    formProgram = true;
                    isEdit = true;
                  }
                "
                @delete="onDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <FormProgram
      :show="formProgram"
      :body="body"
      @tutup="formProgram = false"
    />
  </div>
</template>

<script>
import API from "@/services/api.service";
export default {
  data: () => {
    return {
      headers: [
        { text: "NO", value: "id" },
        { text: "Kode", value: "kode_program" },
        { text: "Program", value: "nama_program" },
        { text: "AKSI", value: "action" },
      ],
      formProgram: false,
      body: {},
      isEdit: false,
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    onSubmit(form) {
      if (this.isEdit) {
        API.put("/api/program", form).then(({ status, data }) => {
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
      } else {
        API.post("/api/program", form).then(({ status, data }) => {
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
      }
    },
    getData() {
      API.get("/api/program").then(({ status, data }) => {
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
        text: this.$t("Delete Message", { who: `${data.nama_program}` }),
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          //delete disini
          API.delete("/api/program").then((result) => {
            console.log(result);
          });
        }
      });
    },
  },
};
</script>
