<template>
  <div class="row">
    <div class="col-sm-12">
      <div slot="with-padding">
        <div class="form-row">
          <div class="col-md-6 ">
            <label for="datepicker">Dari</label>
            <b-form-datepicker id="datepicker" v-model="form.tgl_donasi">
            </b-form-datepicker>
          </div>
          <div class="col-md-6">
            <label for="datepicker">Sampai</label>
            <b-form-datepicker id="datepicker2" v-model="form.tgl_donasi1">
            </b-form-datepicker>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6">
            <label>Program</label>
            <v-autocomplete
              :items="program"
              item-text="nama_program"
              return-object
              v-model="programselected"
              auto-select-first
              outlined
              required
              dense
              small
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.nama_program }}</v-list-item-title
                  >
                </v-list-item-content>
              </template>
              <template v-slot:selection="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.nama_program }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </div>

          <div class="=col-md-6 mt-10">
            <b-button type="submit" variant="primary">Export</b-button>
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
      programselected: {},
      headers: [],
      form: {},
    };
  },
  created() {
    this.getProgram();
  },
  methods: {
    getProgram() {
      API.get("/api/program").then(({ status, data }) => {
        if (status === 200 || status === 201) {
          // reponse dari be jika berhasil

          if (data.status) {
            //berhasil
            this.program = data.data;
          } else {
            //notifikasi gagal
          }
        } else {
          //notifikasi gagal
        }
      });
    },
    onsubmit() {},

    onTambah() {},

    onSimpan() {
      this.$emit("submit", this.form);
    },

    onDelete() {},
  },
};
</script>
