<template>
  <section>
    <h1>{{ experience?.name }}</h1>
    <div class="experience-details">
      <img :src="`/images/${experience?.image}`" :alt="experience?.name" />
      <p>{{ experience?.description }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import sourceData from "@/data.json";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    experienceSlug: { type: String, required: true },
  },
  computed: {
    experience() {
      let destination = sourceData.destinations.find(
        (destination) => destination.id === parseInt(this.id)
      );
      return destination?.experiences.find(
        (experience) => experience.slug == this.experienceSlug
      );
    },
  },
});
</script>
