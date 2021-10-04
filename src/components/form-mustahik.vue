<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit.prevent="onsubmit">
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_kode">Kode </label>
                  <b-form-input
                    disabled
                    type="text"
                    placeholder="Kode Mustahik"
                    v-model="form.kode_mustahik"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_nama">Nama</label>
                  <b-form-input
                    type="text"
                    placeholder="Nama"
                    v-model="form.nama_mustahik"
                  ></b-form-input>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_alamat">Alamat</label>
                  <b-form-input
                    type="text"
                    placeholder="Alamat"
                    v-model="form.alamat_mustahik"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_telepon">Telepon</label>
                  <b-form-input
                    type="number"
                    placeholder="Telepon"
                    v-model="form.telepon_mustahik"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-4 mb-3">
                  <label for="c_form_kategori">Kategori</label>
                  <b-form-select
                    v-model="form.kategori_mustahik"
                    :options="optionkategori"
                  ></b-form-select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="c_form_status">Status</label>
                  <b-form-select
                    :disabled="!isEdit"
                    v-model="form.status_mustahik"
                    :options="optionstatus"
                  ></b-form-select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="c_form_status">Asnaf</label>
                  <b-form-select
                    v-model="form.asnaf"
                    :options="optionasnaf"
                  ></b-form-select>
                </div>
              </div>
              <!-- <div class="form-row">
                <div class="col-md-12 mb-1">
                  <label for="c_form_kantorlayanan">Kantor Layanan </label>
                  <v-autocomplete
                    :items="kantorlayanan"
                    item-text="nama_kantor"
                    item-value="id_kantor"
                    v-model="form.id_kantor"
                    auto-select-first
                    outlined
                    required
                    small
                  ></v-autocomplete>
                </div>
              </div> -->
              <b-button type="submit" variant="primary">Simpan</b-button>
            </b-form>
          </div>
        </px-card>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api.service";
import { getUser } from "@/services/jwt.service";
export default {
  props: ["isEdit", "body"],
  data() {
    return {
      form: {},
      optionkategori: [
        { value: "1", text: "Perorangan" },
        { value: "2", text: "Lembaga" },
      ],
      optionstatus: [
        { value: "1", text: "aktif" },
        { value: "2", text: "tidak aktif" },
      ],
      optionasnaf: [
        { value: "1", text: "Fakir Miskin" },
        { value: "2", text: "Riqob" },
        { value: "3", text: "Ibnu Sabil" },
        { value: "4", text: "Ghorimin" },
        { value: "5", text: "Amil" },
        { value: "6", text: "Fisabilillah" },
        { value: "7", text: "Muallaf" },
        { value: "8", text: "Lan-lain" },
      ],
    };
  },
  created() {
    if (!this.isEdit) {
      this.form.status_mustahik = 1;
    }

    const user = getUser();
    this.form.id_pengguna = user.id_pengguna;
  },
  watch: {
    isEdit: function(newVal) {
      if (newVal) {
        this.form.status_mustahik = 1;
      }
    },
    body: function(newVal) {
      console.log(newVal);
      this.form = newVal;
    },
  },
  methods: {
    onsubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
