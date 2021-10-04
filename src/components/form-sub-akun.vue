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
                <label>Akun</label>
                <v-autocomplete
                  :items="akun"
                  item-text="nama_akun"
                  return-object
                  v-model="akunselected"
                  auto-select-first
                  outlined
                  required
                  dense
                  small
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_akun }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_akun }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_sub_akun"
                  label="Nama Sub Akun"
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
import API from "@/services/api.service";
export default {
  props: ["show", "body"],
  data: () => {
    return {
      akunselected: {},
      form: {
        nama_sub_akun: "",
        active: 1,
      },
      akun: [],
    };
  },
  watch: {
    akunselected: function(akun) {
      this.form.id_akun = akun.id_akun;
    },
  },
  created() {
    this.getAkun();
  },

  methods: {
    getAkun() {
      API.get("/api/akun").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.akun = data.data;
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
