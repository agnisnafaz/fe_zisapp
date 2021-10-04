<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Bank</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.no_rek"
                  label="No. Rekening"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_bank"
                  label="Nama Bank"
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
        no_rek: "",
        nama_bank: "",

        active: 1,
      },
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
