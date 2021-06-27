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
                @add="formProgram = true"
                @edit="$router.push({ path: '/main/program/edit' })"
                @delete="onDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <FormProgram :show="formProgram" :body="body" />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      headers: [{ text: "NO", value: "id" }],
      formProgram: true,
      body: {},
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {},

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
        }
      });
    },
  },
};
</script>
