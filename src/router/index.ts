import { createRouter, createWebHashHistory, RouteLocation } from "vue-router";
import Home from "@/views/Home.vue";
import sourceData from "@/data.json";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    props: true,
    beforeEnter: (to: RouteLocation, from: RouteLocation) => {
      console.log("from:" + from.fullPath);

      let destinationId = to.params.id as string;

      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(destinationId)
      );

      if (!exists)
        return {
          name: "NotFound",
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    childern: [
      // {
      //   path: ":experienceSlug",
      //   name: "experience.show",
      //   component: () => import("@/views/ExperienceShow.vue"),
      //   props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      // },
    ],
  },
  {
    path: "/destination/:id/:slug/:experienceSlug",
    name: "experience.show",
    component: () => import("@/views/ExperienceShow.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0 }), 300);
      })
    );
  },
});

export default router;
