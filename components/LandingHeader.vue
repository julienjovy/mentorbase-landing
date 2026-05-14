<script setup lang="ts">
const isScrolled = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 12;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header class="landing-header" :class="{ 'landing-header--scrolled': isScrolled }">
    <div class="landing-header__inner container">
      <a class="landing-brand" href="#top">
        <span class="landing-brand__mark">MB</span>
        <span class="landing-brand__text">
          <span class="landing-brand__name">MentorBase</span>
          <span class="landing-brand__tagline">IA pédagogique contrôlée</span>
        </span>
      </a>

      <nav class="landing-nav" aria-label="Navigation">
        <a class="landing-nav__link" href="#probleme">Problème</a>
        <a class="landing-nav__link" href="#solution">Solution</a>
        <a class="landing-nav__link" href="#difference-chatgpt">Différence avec ChatGPT</a>
        <a class="landing-nav__link" href="#comparatif-marche">Marché</a>
        <a class="landing-nav__link" href="#pilote">Offre pilote</a>
        <a class="landing-nav__link" href="#faq">FAQ</a>
        <a class="btn" href="#contact">Demander une démo</a>
      </nav>
    </div>
  </header>
</template>
