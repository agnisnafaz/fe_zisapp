<template>
  <div>
    <Breadcrumbs title="Bank" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Tambah Bank</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormBank />
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
    OnSimpan() {
      API.post("/api/bank", {}).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>
