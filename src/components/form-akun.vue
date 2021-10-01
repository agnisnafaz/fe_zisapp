<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Akun</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label for="c_form_jeniskelamin">Kategori Akun</label>
                <b-form-select
                  v-model="form.kat_akun"
                  :options="optionkatakun"
                ></b-form-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.subkat_akun"
                  label="Sub Kategori Akun"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('tutup', dialog.value)"
          >
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> Simpan </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: ["show", "body"],
  data: () => {
    return {
      form: {
        kat_akun: "",
        subkat_akun: "",

        active: 1,
      },
      optionkatakun: [
        { value: "1", text: "Aset Lancar" },
        { value: "2", text: "Aset Tidak Lancar" },
        { value: "3", text: "Liabilitas" },
        { value: "4", text: "Saldo Pendanaan" },
        { value: "5", text: "Penerimaan Dana" },
        { value: "6", text: "Penyaluran  Dana" },
        { value: "7", text: "Biaya Pengelolaan" },
      ],
    };
  },
  watch: {
    body: function(newVal) {
      this.form = newVal;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
