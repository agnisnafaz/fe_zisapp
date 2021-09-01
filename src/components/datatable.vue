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
        v-show="!hidesimpan"
        @click="$emit('simpan', true)"
        color="primary"
        >{{ "simpan" }}</v-btn
      >
      <v-btn
        class="ml-0"
        data-testid="button"
        v-show="!hidecetak"
        @click="$emit('Cetak', true)"
        color="primary"
        >{{ "Cetak" }}</v-btn
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
      <template v-slot:[`item.status_pengajuan`]="{ item }">
        {{ getStatus(item.status_pengajuan) }}
      </template>
      <template v-slot:[`item.total_donasi`]="{ item }">
        Rp {{ formatCurrency(item.total_donasi) }}
      </template>
      <template v-slot:[`item.jumlah_pengajuan`]="{ item }">
        Rp {{ formatCurrency(item.jumlah_pengajuan) }}
      </template>

      <template v-slot:[`item.asnaf`]="{ item }">
        {{ getAsnaf(item.asnaf) }}
      </template>
      <template v-slot:[`item.status_pengguna`]="{ item }">
        {{ item.status_pengguna == 1 ? "Aktif" : "Tidak Aktif" }}
      </template>

      <template v-slot:[`item.leveluser`]="{ item }">{{
        getLevel(item.leveluser)
      }}</template>
      <template v-slot:[`item.kategori_mustahik`]="{ item }">
        {{ item.kategori_musatahik }}
      </template>
      <template v-slot:[`item.npwz`]="{ item }">
        <div v-if="cekHalaman">{{ item.npwz }}</div>
        <div v-else>
          <router-link :to="getDetailDonasi(item)">
            {{ item.npwz }}</router-link
          >
        </div>
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
            <v-btn
              v-show="!hidekonfirm"
              @click="$emit('konfirmasi', item)"
              outlined
              small
              :disabled="item.status_pengajuan == 4"
              >{{ $t("Konfirmasi") }}</v-btn
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
    "hidecetak",
    "hidekonfirm",
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
  created() {
    this.cekHalaman();
  },
  methods: {
    getAsnaf(val) {
      if (val == 1) return "fakir miskin";
      if (val == 2) return "Riqob";
      if (val == 3) return "Ibnu Sabil";
      if (val == 4) return "Ghorimin";
      if (val == 5) return "Amil";
      if (val == 6) return "Fisabilillah";
      if (val == 7) return "Amil";
      if (val == 8) return "Lain-lain";
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
      if (cat == 1) return "Perorangan";
      if (cat == 2) return "Lembaga";
      return "tidak diketahui";
    },
    getDetailDonasi(donasi) {
      return `/main/datadonasi/detail/${donasi.id_donasi}`;
    },
    getStatus(val) {
      if (val == 1) return "Proses";
      if (val == 2) return "Diterima";
      if (val == 3) return "Ditolak";
      if (val == 4) return "Selesai";
    },
    formatCurrency(total) {
      if (total) {
        const parse = parseFloat(total);
        return parse.toFixed(2).replace(/./g, function(c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
      }
      return "0,00.00";
    },
    cekHalaman() {
      console.log(this.$router.currentRoute.path);
      return this.$router.currentRoute.path == "/main/muzaki";
    },
  },
};
</script>
