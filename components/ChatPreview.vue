<script setup lang="ts">
const step = ref(0);

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    step.value = 3;
    return;
  }

  window.setTimeout(() => {
    step.value = 1;
  }, 350);
  window.setTimeout(() => {
    step.value = 2;
  }, 1100);
  window.setTimeout(() => {
    step.value = 3;
  }, 1900);
});
</script>

<template>
  <div class="chat-preview" :class="{ 'chat-preview--live': step >= 1 }">
    <div class="chat-preview__header" :class="{ 'is-visible': step >= 1 }">
      <span class="chat-preview__dot" />
      <span>Mode indice · TP Laravel API</span>
    </div>

    <div
      class="chat-preview__message chat-preview__message--user"
      :class="{ 'is-visible': step >= 2 }"
    >
      Donne-moi directement le code du contrôleur pour valider l'emprunt.
    </div>

    <div
      class="chat-preview__message chat-preview__message--assistant"
      :class="{ 'is-visible': step >= 3 }"
    >
      <p>
        Je ne vais pas te donner le code complet, car cette formation est configurée en mode indice.
      </p>
      <p>Commence par identifier :</p>
      <ol class="chat-preview__list">
        <li>quelles données doivent être validées ;</li>
        <li>quelle règle métier empêche un emprunt ;</li>
        <li>où cette règle est décrite dans l'énoncé.</li>
      </ol>
      <p class="chat-preview__sources">
        Repère utile : TP Laravel API — section « Validation d'un emprunt »
      </p>
    </div>
  </div>
</template>
