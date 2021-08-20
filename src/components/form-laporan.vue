<template>
  <div class="row">
    <div class="col-sm-12">
      <div slot="with-padding">
        <div class="form-row">
          <div class="col-md-4 ">
            <label for="datepicker">Dari</label>
            <b-form-datepicker id="datepicker" v-model="form.tgl_donasi">
            </b-form-datepicker>
          </div>
          <div class="col-md-4">
            <label for="datepicker">Sampai</label>
            <b-form-datepicker id="datepicker2" v-model="form.tgl_donasi1">
            </b-form-datepicker>
          </div>
          <div class="=col-md-4 mt-10">
            <b-button type="submit" variant="primary">Export</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api.service";
import { getUser } from "@/services/jwt.service";
export default {
  data() {
    return {
      headers: [],
      form: {},
    };
  },
  created() {
    this.getMuzaki();
    this.getProgram();
    this.getBank();
    const user = getUser();
    this.form.id_pengguna = user.id_pengguna;
  },

  methods: {
    onsubmit() {},

    onTambah() {},

    onSimpan() {
      this.$emit("submit", this.form);
    },

    onDelete() {},
  },
};
</script>
