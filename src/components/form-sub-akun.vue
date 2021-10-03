<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Kategori Akun</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label>Sub Kategori Akun</label>
                <v-autocomplete
                  :items="subkatakun"
                  item-text="id_sub_kat_akuns"
                  return-object
                  v-model="subkatakunselected"
                  auto-select-first
                  outlined
                  required
                  dense
                  small
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.sub_kat_akuns }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.sub_kat_akuns }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.sub_sub_kat_akuns"
                  label="Sub Sub Kategori Akun"
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
      subkatakunselectd: {},
      form: {
        kat_akun: "",
        subkat_akun: "",

        active: 1,
      },
      subkatakun: [],
    };
  },
  watch: {
    body: function(newVal) {
      this.form = newVal;
    },
  },
  created() {
    this.getSubKatAkun();
  },
  methods: {
    getSubKatAkun() {
      API.get("/api/subkatakun").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.muzaki = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
