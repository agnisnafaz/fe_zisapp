<template>
  <div class="row">
    <div class="col-sm-12">
      <div slot="with-padding">
        <div class="form-row">
          <div class="col-md-6 ">
            <label for="datepicker">Tanggal</label>
            <b-form-datepicker id="datepicker" v-model="form.tgl_donasi">
            </b-form-datepicker>
          </div>
          <div>
            <b-button
              @click="onsubmit"
              class="mt-10 ml-3"
              type="submit"
              variant="primary"
              >Cetak</b-button
            >
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
      form: {},
    };
  },

  methods: {
    onsubmit() {
      this.$emit("submit", this.form.tgl_donasi);
    },

    onTambah() {},

    onDelete() {},
  },
};
</script>
