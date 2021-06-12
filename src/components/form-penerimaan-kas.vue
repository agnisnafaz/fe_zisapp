<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit="onsubmit">
              <div class="form-row">
                <div class="col-md-4 ">
                  <label for="datepicker">Tanggal Donasi</label>
                  <b-form-datepicker id="datepicker" v-model="value">
                  </b-form-datepicker>
                </div>
              </div>

              <b-button type="submit" variant="primary">Cetak</b-button>
            </b-form>
          </div>
        </px-card>
      </div>
    </div>
  </div>
</template>

<script>
import Pxcard from "./Pxcard.vue";
export default {
  components: { Pxcard },
  data() {
    return {
      periode: null,
      period: [
        { value: null, text: "2017" },
        { value: "", text: "2018" },
        { value: "", text: "2019" },
      ],
      metode: null,
      pembayaran: [
        { value: null, text: "Pilih" },
        { value: "", text: "CASH" },
        { value: "", text: "MUTASI BANK" },
      ],
    };
  },
  methods: {
    onsubmit() {},
  },
};
</script>
