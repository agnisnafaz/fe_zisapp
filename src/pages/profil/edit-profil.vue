<template>
  <div>
    <Breadcrumbs title="User" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Edit Profil</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormProfilUser
                @submit="OnEdit"
                :body="body"
                :isEdit="true"
              ></FormProfilUser>
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
      body: {},
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getUserById(this.$route.params.id);
    }
  },
  methods: {
    getUserById(id) {
      API.get(`/api/pengguna/${id}`)
        .then(({ status, data }) => {
          console.log(data);
          if (status == 200 || status == 201) {
            if (data.status) {
              this.body = data.data;
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
    OnEdit(form) {
      console.log(form);
      API.put(`/api/pengguna/${this.$route.params.id}`, form)
        .then(({ status, data }) => {
          console.log(data);
          if (status == 200 || status == 201) {
            // reponse dari be jika berhasil

            if (data.status) {
              //berhasil
              this.$toasted.show("Data Berhasil Diedit", {
                theme: "bubble",
                position: "top-right",
                type: "success", //"success" kalau su
                duration: 2000,
              });
              this.$router.push({ path: "/main/user" });
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
            this.$toasted.show("Data Gagal Diedit", {
              theme: "bubble",
              position: "top-right",
              type: "error", //"success" kalau su
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          //gagal
          this.$toasted.show("Data Gagal Diedit", {
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
