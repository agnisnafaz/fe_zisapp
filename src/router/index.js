/**
 * Author
 *
 */
import Vue from "vue";
import Router from "vue-router";
import ApiService from "@/services/api.service";
import { getUser } from "@/services/jwt.service";

// component

Vue.use(Router);

/**
 * routes definition
 * there only 1 nested routes
 * @see Router
 * ex:
 *  route1
 *    subroute1
 *    subroute2
 *  route2
 */
const routes = [
  /**
   * base route in this route will redirect to main
   */
  { path: "", redirect: { name: "dashboard" } },
  /**
   * in this route all children reqiresAuth for access
   */
  {
    path: "/main",
    component: () => import("../components/body"),
    meta: {
      reqiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard/dashboard.vue"),
        meta: {
          title: "Dashboard | ZISAPP",
          reqiresAuth: true,
        },
      },

      {
        path: "user",
        name: "user",
        component: () => import("@/pages/user/datauser.vue"),
        meta: {
          title: "ZISAPP | Data User",
          reqiresAuth: true,
        },
      },
      {
        path: "user/add",
        name: "adduser",
        component: () => import("@/pages/user/adduser.vue"),
        meta: {
          title: "ZISAPP | Tambah User",
          reqiresAuth: true,
        },
      },
      {
        path: "user/edit/:id",
        name: "edituser",
        component: () => import("@/pages/user/edituser.vue"),
        meta: {
          title: "ZISAPP | Edit User",
          reqiresAuth: true,
        },
      },

      {
        path: "muzaki",
        name: "muzaki",
        component: () => import("@/pages/muzaki/datamuzaki.vue"),
        meta: {
          title: "ZISAPP | Data Muzaki",
          reqiresAuth: true,
        },
      },
      {
        path: "muzaki/add",
        name: "addmuzaki",
        component: () => import("@/pages/muzaki/addmuzaki.vue"),
        meta: {
          title: "ZISAPP | Tambah Muzaki",
          reqiresAuth: true,
        },
      },
      {
        path: "muzaki/edit/:id",
        name: "editmuzaki",
        component: () => import("@/pages/muzaki/editmuzaki.vue"),
        meta: {
          title: "ZISAPP | Edit Muzaki",
          reqiresAuth: true,
        },
      },
      {
        path: "mustahik",
        name: "mustahik",
        component: () => import("@/pages/mustahik/datamustahik.vue"),
        meta: {
          title: "ZISAPP | Data Mustahik",
          reqiresAuth: true,
        },
      },
      {
        path: "mustahik/add",
        name: "addmustahik",
        component: () => import("@/pages/mustahik/addmustahik.vue"),
        meta: {
          title: "ZISAPP | Tambah Mustahik",
          reqiresAuth: true,
        },
      },
      {
        path: "mustahik/edit/:id",
        name: "editmustahik",
        component: () => import("@/pages/mustahik/editmustahik.vue"),
        meta: {
          title: "ZISAPP | Edit Mustahik",
          reqiresAuth: true,
        },
      },

      {
        path: "bank",
        name: "bank",
        component: () => import("@/pages/bank/databank.vue"),
        meta: {
          title: "ZISAPP | Data Bank",
          reqiresAuth: true,
        },
      },
      {
        path: "program",
        name: "program",
        component: () => import("@/pages/program/dataprogram.vue"),
        meta: {
          title: "ZISAPP | Data Program",
          reqiresAuth: true,
        },
      },

      {
        path: "donasi",
        name: "donasi",
        component: () => import("@/pages/donasi/donasi.vue"),
        meta: {
          title: "ZISAPP | Donasi",
          reqiresAuth: true,
        },
      },
      {
        path: "pengajuan",
        name: "pengajuan",
        component: () => import("@/pages/pengajuan/datapengajuan.vue"),
        meta: {
          title: "ZISAPP | Pengajuan",
          reqiresAuth: true,
        },
      },

      {
        path: "pengajuan/add",
        name: "addpengajuan",
        component: () => import("@/pages/pengajuan/addpengajuan.vue"),
        meta: {
          title: "ZISAPP | Pengajuan",
          reqiresAuth: true,
        },
      },
      {
        path: "direktur",
        name: "datapenyaluran",
        component: () => import("@/pages/direktur/datapenyaluran.vue"),
        meta: {
          title: "ZISAPP | Data Penyaluran",
          reqiresAuth: true,
        },
      },
      {
        path: "direktur/realisasi/:id",
        name: "realisasidirektur",
        component: () => import("@/pages/direktur/realisasipenyaluran.vue"),
        meta: {
          title: "ZISAPP | Data Penyaluran",
          reqiresAuth: true,
        },
      },
      {
        path: "direktur/edit",
        name: "editpenyaluran",
        component: () => import("@/pages/direktur/realisasipenyaluran.vue"),
        meta: {
          title: "ZISAPP | Edit Penyaluran",
          reqiresAuth: true,
        },
      },
      {
        path: "laporan",
        name: "laporan",
        component: () => import("@/pages/laporan/laporan.vue"),
        meta: {
          title: "ZISAPP | Laporan",
          reqiresAuth: true,
        },
      },
      {
        path: "datadonasi",
        name: "datadonasi",
        component: () => import("@/pages/data-donasi/datadonasi.vue"),
        meta: {
          title: "ZISAPP | Data Donasi",
        },
      },
      {
        path: "datadonasi/detail/:id",
        name: "detaildonasi",
        component: () => import("@/pages/data-donasi/detaildonasi.vue"),
        meta: {
          title: "ZISAPP | Data Donasi",
        },
      },
      {
        path: "cetaktandaterima",
        name: "cetaktandaterima",
        component: () => import("@/pages/cetakdonasi/cetak-tandaterima.vue"),
        meta: {
          title: "ZISAPP | Cetak",
        },
      },

      {
        path: "profil/update",
        name: "updateprofil",
        component: () => import("@/pages/profil/edit-profil.vue"),
        meta: {
          title: "ZISAPP | Update Profil",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/login.vue"),
    meta: {
      title: "ZISAPP | Login",
    },
  },
];

/**
 * instance router
 * mode use instead useing history must use hash for desktop
 */
const router = new Router({
  routes,
  base: process.env.BASE_URL || "/",
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  linkActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

/**
 * check session of user
 * if the user not  logged in route with meta requiresAuth the route will denied and redirect to login
 */
router.beforeEach((to, from, next) => {
  ApiService.setHeader();
  const user = getUser();
  if (to.meta.title) document.title = to.meta.title;
  if (to.meta.reqiresAuth) {
    if (user) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
