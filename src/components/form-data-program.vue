<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Data Program</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label>Bank</label>
                <v-autocomplete
                  :items="bank"
                  item-text="nama_bank"
                  return-object
                  v-model="bankselected"
                  auto-select-first
                  outlined
                  required
                  dense
                  small
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_bank }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_bank }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <label>Sub Akun Program</label>
                <v-autocomplete
                  :items="subakunprogram"
                  item-text="nama_sub_akun_program"
                  return-object
                  v-model="subakunprogramselected"
                  auto-select-first
                  outlined
                  required
                  dense
                  small
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_sub_akun_program }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nama_sub_akun_program }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_program"
                  label="Program"
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
      subakunprogramselected: {},
      bankselected: {},
      form: {
        nama_program: "",
        active: 1,
      },
      subakunprogram: [],
      bank: [],
    };
  },
  watch: {
    subakunprogramselected: function(subakunprogram) {
      this.form.id_sub_akun_program = subakunprogram.id_sub_akun_program;
    },
    bankselected: function(bank) {
      this.form.id_bank = bank.id_bank;
    },
  },
  created() {
    this.getSubAkunProgram();
    this.getBank();
  },

  methods: {
    getSubAkunProgram() {
      API.get("/api/subakunprogram").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.subakunprogram = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
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
