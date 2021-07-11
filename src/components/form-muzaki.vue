<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <px-card :actions="false">
          <div slot="with-padding">
            <b-form class="needs-validation" @submit.prevent="onsubmit">
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_first_name">NPWZ</label>
                  <b-form-input
                    type="text"
                    placeholder="NPWZ"
                    v-model="form.npwz"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_last_name">NPWP</label>
                  <b-form-input
                    type="text"
                    placeholder="NPWP"
                    v-model="form.npwp"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_city">NIK</label>
                  <b-form-input
                    type="text"
                    placeholder="NIK"
                    v-model="form.nik"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_nama">Nama</label>
                  <b-form-input
                    type="text"
                    placeholder="Nama"
                    v-model="form.nama_muzaki"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_alamat">Alamat</label>
                  <b-form-input
                    type="text"
                    placeholder="Alamat"
                    v-model="form.alamat_muzaki"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_jeniskelamin">Jenis Kelamin</label>
                  <b-form-select
                    v-model="form.jk"
                    :options="optionjk"
                  ></b-form-select>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_telepon">Telepon</label>
                  <b-form-input
                    type="text"
                    placeholder="Telepon"
                    v-model="form.telepon_muzaki"
                  ></b-form-input>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_profesi">Profesi</label>
                  <b-form-input
                    type="text"
                    placeholder="profesi"
                    v-model="form.profesi"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="c_form_kategori">Kategori</label>
                  <b-form-select
                    v-model="form.kategori_muzaki"
                    :options="optionkategori"
                  ></b-form-select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="c_form_kategori">Status</label>
                  <b-form-select
                    :disabled="!isEdit"
                    v-model="form.status_muzaki"
                    :options="optionstatus"
                  ></b-form-select>
                </div>
              </div>
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
      optionjk: [
        { value: "1", text: "laki-laki" },
        { value: "2", text: "perempuan" },
      ],
      optionkategori: [
        { value: "1", text: "individu" },
        { value: "2", text: "kelompok" },
      ],
      optionstatus: [
        { value: "1", text: "aktif" },
        { value: "2", text: "tidak aktif" },
      ],
    };
  },
  created() {
    if (!this.isEdit) {
      this.form.status_muzaki = 1;
    }

    const user = getUser();
    this.form.id_pengguna = user.id_pengguna;
  },
  watch: {
    isEdit: function(newVal) {
      if (newVal) {
        this.form.status_muzaki = 1;
      }
    },
    body: function(newVal) {
      console.log(newVal);
      this.form = newVal;
    },
  },
  methods: {
    onsubmit() {
      console.log(this.form);
      this.$emit("submit", this.form);
    },
  },
};
</script>
