<template>
  <div>
    <section class="destination">
      <h1>{{ destination?.name }}</h1>
      <GoBack />
      <div class="destination-details">
        <img :src="`/images/${destination?.image}`" :alt="destination?.name" />
        <p>{{ destination?.description }}</p>
      </div>
    </section>

    <section class="experiences" id="experiences">
      <h2>Top Experiences in {{ destination?.name }}</h2>
      <div class="cards">
        <router-link
          v-for="experience in destination?.experiences"
          :key="experience.slug"
          :to="{
            name: 'experience.show',
            params: { experienceSlug: experience.slug },
          }"
        >
          <ExperienceCard :experience="experience" />
        </router-link>
      </div>
      <section>
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import sourceData from "@/data.json";
import { defineComponent } from "vue";
import ExperienceCard from "@/components/ExperienceCard.vue";
import GoBack from "@/components/GoBack.vue";

export default defineComponent({
  components: {
    ExperienceCard,
    GoBack,
  },
  props: {
    id: { type: String, required: true },
    slug: { type: String, required: true },
  },
  computed: {
    destination() {
      return sourceData.destinations.find(
        (destination) => destination.id === parseInt(this.id)
      );
    },
  },
});
</script>
