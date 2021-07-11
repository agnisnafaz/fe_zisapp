<template>
  <v-card flat :dark="theme">
    <v-card-title>
      <v-btn
        data-testid="button"
        v-show="!hideadd"
        @click="$emit('add', true)"
        color="primary"
        >{{ "tambah" }}</v-btn
      >
      <v-btn
        class="ml-4"
        data-testid="button"
        v-show="hidesimpan"
        @click="$emit('simpan', true)"
        color="primary"
        >{{ "simpan" }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table flat :headers="headers" :items="items" :search="search">
      <template v-slot:[`item.jk`]="{ item }">
        {{ getJK(item.jk) }}
      </template>
      <template v-slot:[`item.asnaf`]="{ item }">
        {{ getAsnaf(item.asnaf) }}
      </template>
      <template v-slot:[`item.status_pengguna`]="{ item }">
        {{ item.status_pengguna == 1 ? "Aktif" : "Tidak Aktif" }}
      </template>
      <template v-slot:[`item.status_pengajuan`]="{ item }">
        {{ item.status_pengajuan == 1 ? "Diterima" : "Ditolak" }}
      </template>
      <template v-slot:[`item.leveluser`]="{ item }">{{
        getLevel(item.leveluser)
      }}</template>
      <template v-slot:[`item.kategori_mustahik`]="{ item }">
        {{ getKetgoriMustahik(item.kategori_musatahik) }}
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <b-button-toolbar
          aria-label="Toolbar with button groups and dropdown menu"
        >
          <b-button-group class="mx-1">
            <v-btn
              v-show="!hideupdate"
              @click="$emit('edit', item)"
              outlined
              small
              >{{ $t("Edit") }}</v-btn
            >
            <v-btn
              v-show="!hidedelete"
              @click="$emit('delete', item)"
              outlined
              small
              >{{ $t("Delete") }}</v-btn
            >
          </b-button-group>
        </b-button-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: [
    "items",
    "headers",
    "hideadd",
    "hidedelete",
    "hideupdate",
    "hidesimpan",
  ],
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.layout.isDark,
    }),
  },
  methods: {
    getAsnaf(val) {
      if (val == 1) return "fakir miskin";
      if (val == 2) return "fisaabilillah";
      if (val == 3) return "fakir miskin";
    },
    getJK(val) {
      console.log(val);
      if (val == 1) return "Laki-Laki";
      if (val == 2) return "Perempuan";
    },
    getLevel(level) {
      if (level == 1) return "Admin";
      if (level == 2) return "Front Office";
      if (level == 3) return "Direktur";
    },
    getKetgoriMustahik(cat) {
      if (cat == 1) return "fakir miskin";
      if (cat == 2) return "fisaabilillah";
      if (cat == 3) return "fakir miskin";
    },
  },
};
</script>
