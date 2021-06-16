<template>
  <div>
    <Breadcrumbs title="Muzaki" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Muzaki</h5>
            </div>
            <div class="card-body">
              <!-- TAMBAHIN KONTENYA DISINI -->
              <FormMuzaki />
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
    onSimpan() {
      API.post("api/muzaki", {}).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>
