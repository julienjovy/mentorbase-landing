<script setup lang="ts">
const config = useRuntimeConfig();
const contactEmail = config.public.contactEmail as string;
</script>

<template>
  <footer class="landing-footer">
    <div class="container landing-footer__inner">
      <div>
        <p class="landing-footer__brand">MentorBase</p>
        <p class="landing-footer__copy">
          IA pédagogique contrôlée pour écoles, organismes de formation et formateurs.
        </p>
      </div>
      <div class="landing-footer__links">
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
        <a href="#pilote">Offre pilote</a>
      </div>
    </div>
  </footer>
</template>
