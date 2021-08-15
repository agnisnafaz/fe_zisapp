<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Program</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  disabled
                  v-model="form.kode_program"
                  label="Kode Program"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_program"
                  label="Nama Program"
                  required
                ></v-text-field>
              </v-col>
              <div class="col-md-12">
                <label>Bank</label>
                <v-autocomplete
                  :items="bank"
                  item-text="nama_bank"
                  item-value="id_bank"
                  v-model="form.id_bank"
                  auto-select-first
                  outlined
                  required
                  dense
                  small
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{
                          item.nama_bank + " - " + item.no_rek
                        }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_bank + " - " + item.no_rek }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </div>
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
      form: {
        kode_program: "",
        nama_program: "",
        nama_bank: "",
        active: 1,
      },
      bank: [],
    };
  },
  watch: {
    body: function(newVal) {
      this.form = newVal;
    },
  },
  created() {
    this.getBank();
  },
  methods: {
    getBank() {
      API.get("/api/bank").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.bank = data.data;
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
