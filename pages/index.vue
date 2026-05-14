<script setup lang="ts">
const config = useRuntimeConfig();
const contactEmail = config.public.contactEmail as string;
const siteUrl = (config.public.siteUrl as string).replace(/\/$/, "");
const ogImage = `${siteUrl}/og-mentorbase.png`;

const seoTitle = "MentorBase — IA pédagogique contrôlée pour organismes de formation";
const seoDescription =
  "Transformez vos supports de cours, TP et FAQ en assistant IA privé. MentorBase aide vos apprenants avec des indices et explications cadrées, sans donner les réponses toutes faites.";
const ogTitle = "MentorBase — Reprenez le contrôle pédagogique de l'IA";
const ogDescription =
  "Vos apprenants utilisent déjà ChatGPT. MentorBase transforme vos supports en assistant IA privé contrôlé par vos règles pédagogiques.";

const faqItems = [
  {
    question: "MentorBase remplace-t-il ChatGPT ?",
    answer:
      "Non. MentorBase encadre l'usage de l'IA dans le périmètre de votre formation, avec vos documents, vos règles et vos modes d'aide.",
  },
  {
    question: "Les apprenants peuvent-ils obtenir les corrections complètes ?",
    answer:
      "En mode indice, l'assistant guide sans livrer une réponse prête à copier. Les modes et règles pédagogiques sont définis par le formateur.",
  },
  {
    question: "Quels documents peut-on utiliser ?",
    answer:
      "PDF, Markdown, texte, énoncés de TP, FAQ, critères d'évaluation et autres supports pédagogiques déjà utilisés dans votre formation.",
  },
  {
    question: "Est-ce adapté aux écoles de développement web ?",
    answer:
      "Oui. Bootcamps, écoles de dev et formations techniques sont un cas d'usage naturel : TP, projets guidés, FAQ et critères de rendu.",
  },
  {
    question: "Comment se déroule le pilote ?",
    answer:
      "On part de vos supports existants, on configure les règles pédagogiques, on ouvre l'accès aux formateurs et apprenants, puis on mesure l'usage pendant 30 jours avec un bilan final.",
  },
  {
    question: "MentorBase fonctionne-t-il avec Moodle ou Notion ?",
    answer:
      "Vous pouvez importer vos fichiers existants dès le pilote. Les intégrations directes avec Moodle, Notion ou d'autres outils peuvent être envisagées selon votre contexte.",
  },
  {
    question: "Est-ce que les réponses citent les sources ?",
    answer:
      "Oui. Lorsque des passages de vos documents éclairent la réponse, l'assistant peut indiquer le support ou la section consultée.",
  },
];

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MentorBase",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: seoDescription,
  url: siteUrl,
  offers: {
    "@type": "Offer",
    price: "900",
    priceCurrency: "EUR",
    description: "Pilote 30 jours pour organismes de formation",
  },
};

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle,
  ogDescription,
  ogType: "website",
  ogImage,
  ogUrl: siteUrl,
  twitterCard: "summary_large_image",
  twitterTitle: ogTitle,
  twitterDescription: ogDescription,
  twitterImage: ogImage,
});

useHead({
  htmlAttrs: { lang: "fr" },
  link: [{ rel: "canonical", href: siteUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(softwareApplicationLd),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(faqPageLd),
    },
  ],
});

const contactName = ref("");
const contactEmailInput = ref("");
const contactOrganization = ref("");
const contactRole = ref("");
const contactFormationType = ref("");
const contactLearnerCount = ref("");
const contactSupportsLocation = ref("");
const contactIaProblem = ref("");
const contactMessage = ref("");
const contactSubmitted = ref(false);

const problemCards = [
  {
    title: "Des réponses hors cadre",
    description:
      "ChatGPT peut répondre sans connaître vos consignes, votre progression, vos interdits ou vos critères d'évaluation.",
  },
  {
    title: "Un risque de copier-coller",
    description:
      "Sans règle pédagogique, l'IA peut transformer un exercice en solution prête à rendre.",
  },
  {
    title: "Aucune visibilité formateur",
    description:
      "Vous ne savez pas quelles questions sont posées, où les apprenants bloquent, ni quels supports doivent être améliorés.",
  },
];

const solutionCards = [
  {
    title: "Réponses cadrées",
    description:
      "L'assistant s'appuie sur vos supports et signale quand l'information n'est pas présente.",
  },
  {
    title: "Aide sans correction complète",
    description: "En mode indice, il guide l'apprenant sans livrer une réponse prête à copier.",
  },
  {
    title: "Sources visibles",
    description:
      "Chaque réponse peut indiquer les documents ou sections utilisés pour justifier l'aide.",
  },
  {
    title: "Vision pédagogique",
    description:
      "Les questions fréquentes deviennent un signal pour améliorer vos cours, TP et FAQ.",
  },
];

const comparison = [
  {
    label: "ChatGPT libre",
    mentorbase: false,
    text: "L'apprenant choisit le prompt, les sources, le niveau d'aide et peut obtenir une réponse complète hors consigne.",
  },
  {
    label: "MentorBase",
    mentorbase: true,
    text: "Le formateur définit les documents, les règles, les modes d'aide et garde une visibilité sur les blocages.",
  },
];

const marketMatrixRows = [
  {
    label: "ChatGPT / Copilot en libre",
    covers:
      "Réponses générales, code, reformulations — utile mais hors périmètre précis de votre formation.",
    limit:
      "Pas vos consignes ni vos interdits ; aucune visibilité sur ce que posent réellement les apprenants.",
    mentorbase:
      "Réponses calées sur vos documents, modes d'aide (indice / explication) et signaux pour le formateur.",
  },
  {
    label: "Statu quo (interdire ou fermer les yeux)",
    covers: "Zéro outil, zéro ligne budgétaire IA dédiée.",
    limit:
      "L'usage continue en parallèle, sans cadre ni mesure : le risque pédagogique reste, il est seulement invisible.",
    mentorbase:
      "Un canal officiel, cadré et mesurable — alternative claire au tout-interdit / tout toléré.",
  },
  {
    label: "LMS + module IA générique",
    covers: "Parcours, suivi, parfois coach ou Q/R intégré au catalogue produit.",
    limit:
      "Souvent générique ou contenu catalogue : peu ancré sur vos TP, énoncés et FAQ spécifiques.",
    mentorbase:
      "Vos fichiers réels (PDF, MD, énoncés) indexés et interrogés dans le cadre que vous définissez.",
  },
  {
    label: "Outils d'auteur IA (création de contenu)",
    covers: "Accélérer slides, QCM, scripts de cours, reformulations de supports.",
    limit:
      "Optimise la production — ne contrôle pas l'apprenant au moment du TP avec ces mêmes consignes.",
    mentorbase:
      "Côté apprenant pendant la formation : aide sans correction toute faite, sources visibles quand c'est pertinent.",
  },
  {
    label: "Plateformes larges « agents IA »",
    covers: "Suite complète : LMS, plusieurs agents, multiples cas d'usage.",
    limit:
      "Surface large à prendre en main ; souvent un changement d'habitudes ou d'outil pour l'organisme.",
    mentorbase:
      "Couche ciblée : assistant pédagogique privé sur une ou quelques formations pilotes, sans tout remplacer.",
  },
];

const pilotIncludes = [
  "Espace privé pour votre organisme",
  "1 formation intégrée",
  "20 à 50 documents indexés",
  "Modes indice et explication",
  "Accès formateurs et apprenants",
  "Tableau de bord des questions",
  "Bilan d'usage après 30 jours",
];

const pilotMetrics = [
  "Questions posées par les apprenants",
  "Blocages récurrents identifiés",
  "Réponses jugées utiles",
  "Temps formateur économisé",
];

const exampleSteps = [
  "Le formateur importe l'énoncé du TP, la FAQ et les critères d'évaluation.",
  "L'apprenant demande : « Donne-moi le code complet de la validation. »",
  "MentorBase refuse de livrer la correction complète et propose un indice guidé à partir de l'énoncé.",
  "Le formateur voit que plusieurs apprenants bloquent sur la même étape et peut ajuster son support.",
];

function submitContact() {
  const subject = encodeURIComponent("Demande pilote MentorBase");
  const body = encodeURIComponent(
    [
      `Nom : ${contactName.value}`,
      `Email : ${contactEmailInput.value}`,
      `Organisme : ${contactOrganization.value}`,
      `Rôle : ${contactRole.value}`,
      `Type de formation : ${contactFormationType.value}`,
      `Nombre d'apprenants : ${contactLearnerCount.value}`,
      `Supports aujourd'hui : ${contactSupportsLocation.value}`,
      `Problème principal avec l'IA : ${contactIaProblem.value}`,
      "",
      "Message :",
      contactMessage.value,
    ].join("\n")
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  contactSubmitted.value = true;
}

useScrollReveal();
</script>

<template>
  <div id="top" class="landing-page">
    <div class="landing-page__ambient" aria-hidden="true">
      <span class="landing-page__orb landing-page__orb--one" />
      <span class="landing-page__orb landing-page__orb--two" />
    </div>

    <LandingHeader />

    <main>
      <section class="landing-hero container">
        <div class="landing-hero__copy hero-enter">
          <p class="eyebrow hero-enter__item" style="--i: 0">IA pédagogique contrôlée</p>
          <h1 class="landing-hero__title">
            <span class="landing-hero__title-seo hero-enter__item" style="--i: 1">Assistant IA pédagogique pour organismes de formation</span>
            <span class="landing-hero__title-hook hero-enter__item" style="--i: 2">
              Vos apprenants utilisent déjà ChatGPT. Reprenez le contrôle pédagogique sur ce qu'ils
              apprennent vraiment.
            </span>
          </h1>
          <p class="landing-hero__lead hero-enter__item" style="--i: 3">
            MentorBase transforme vos supports de cours, TP, FAQ et critères d'évaluation en assistant
            IA privé.
          </p>
          <p class="landing-hero__lead landing-hero__lead--secondary hero-enter__item" style="--i: 4">
            Vos apprenants peuvent demander un indice, une explication ou une reformulation — mais
            l'assistant reste cadré par vos règles pédagogiques et vos documents.
          </p>
          <div class="landing-hero__actions hero-enter__item" style="--i: 5">
            <a class="btn btn-lg" href="#contact">Tester sur une formation pilote</a>
            <a class="btn btn-secondary btn-lg" href="#difference-chatgpt">Voir la différence avec ChatGPT</a>
          </div>
        </div>

        <aside class="landing-hero__preview hero-enter__item" style="--i: 3" aria-label="Aperçu de l'assistant">
          <ChatPreview />
        </aside>
      </section>

      <section id="probleme" class="landing-section container">
        <div class="landing-section__intro" data-reveal>
          <p class="eyebrow">Le problème</p>
          <h2>Encadrer l'usage de ChatGPT en formation</h2>
          <p class="landing-section__lead">
            Les apprenants utilisent ChatGPT pour comprendre, avancer plus vite… ou parfois obtenir
            directement la solution. Le problème n'est plus de savoir s'ils utilisent l'IA, mais de
            savoir comment l'encadrer.
          </p>
        </div>
        <div class="landing-grid landing-grid--3">
          <article v-for="(card, index) in problemCards" :key="card.title" class="landing-card" data-reveal :style="{ '--reveal-delay': `${index * 80}ms` }">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </article>
        </div>
      </section>

      <section id="solution" class="landing-section landing-section--muted">
        <div class="container">
          <div class="landing-section__intro" data-reveal>
            <p class="eyebrow">La solution</p>
            <h2>Un assistant IA basé sur vos supports de cours, TP et FAQ</h2>
            <p class="landing-section__lead">
              Vous choisissez les documents, les règles et le niveau d'aide autorisé. MentorBase
              répond dans le cadre de la formation : indice, explication ou correction réservée au
              formateur.
            </p>
          </div>

          <div class="landing-grid landing-grid--2">
            <article
              v-for="(card, index) in solutionCards"
              :key="card.title"
              class="landing-card landing-card--feature"
              data-reveal
              :style="{ '--reveal-delay': `${index * 80}ms` }"
            >
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="landing-section container">
        <div class="landing-section__intro" data-reveal>
          <p class="eyebrow">Exemple concret</p>
          <h2>Une aide aux apprenants sans correction toute faite</h2>
        </div>
        <div class="example-flow">
          <div
            v-for="(text, index) in exampleSteps"
            :key="text"
            class="example-step"
            data-reveal
            :style="{ '--reveal-delay': `${index * 100}ms` }"
          >
            <span class="example-step__index">{{ index + 1 }}</span>
            <p>{{ text }}</p>
          </div>
        </div>
      </section>

      <section id="difference-chatgpt" class="landing-section landing-section--muted">
        <div class="container">
          <div class="landing-section__intro" data-reveal>
            <p class="eyebrow">Différence avec ChatGPT</p>
            <h2>Pourquoi choisir MentorBase plutôt qu'un ChatGPT libre ?</h2>
            <p class="landing-section__lead">ChatGPT est puissant, mais il n'est pas votre cadre pédagogique.</p>
          </div>
          <div class="comparison-table">
            <article
              v-for="(row, index) in comparison"
              :key="row.label"
              class="comparison-row"
              :class="{ 'comparison-row--highlight': row.mentorbase }"
              data-reveal
              :style="{ '--reveal-delay': `${index * 120}ms` }"
            >
              <h3>{{ row.label }}</h3>
              <p>{{ row.text }}</p>
            </article>
          </div>
          <p class="comparison-closing" data-reveal>
            MentorBase ne remplace pas ChatGPT.<br />
            Il transforme l'usage de l'IA en outil pédagogique contrôlé.
          </p>

          <div id="comparatif-marche" class="market-matrix" data-reveal>
            <h3 class="market-matrix__title">Repères marché : où se situe MentorBase ?</h3>
            <p class="market-matrix__intro">
              Les acheteurs comparent souvent mentalement avec ces approches — pas toujours avec un
              « concurrent » unique.
            </p>
            <div class="market-matrix__scroll" role="region" aria-label="Tableau comparatif des approches">
              <table class="market-matrix__table">
                <thead>
                  <tr>
                    <th scope="col">Approche</th>
                    <th scope="col">Ce qu'elle couvre souvent</th>
                    <th scope="col">Limite pour votre cadre</th>
                    <th scope="col" class="market-matrix__th--mb">Avec MentorBase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in marketMatrixRows" :key="row.label">
                    <th scope="row" class="market-matrix__rowhead">{{ row.label }}</th>
                    <td>{{ row.covers }}</td>
                    <td>{{ row.limit }}</td>
                    <td class="market-matrix__cell--mb">{{ row.mentorbase }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="pilote" class="landing-section container">
        <div class="landing-pilot" data-reveal>
          <div>
            <p class="eyebrow">Offre pilote</p>
            <h2>Offre pilote pour écoles, bootcamps et formateurs</h2>
            <p class="landing-section__lead">
              On part de vos supports existants, on configure les règles pédagogiques, puis on
              mesure pendant 30 jours ce que l'assistant change réellement : questions posées,
              blocages récurrents, réponses utiles, temps formateur économisé.
            </p>
            <ul class="landing-list">
              <li v-for="item in pilotIncludes" :key="item">{{ item }}</li>
            </ul>
            <p class="landing-pilot__price">Pilote 30 jours : à partir de 900 €</p>
          </div>
          <div class="landing-pilot__card">
            <h3>Ce que vous mesurez</h3>
            <ul class="landing-list">
              <li v-for="item in pilotMetrics" :key="item">{{ item }}</li>
            </ul>
            <a class="btn btn-lg" href="#contact">Demander un pilote</a>
          </div>
        </div>
      </section>

      <section id="faq" class="landing-section landing-section--muted">
        <div class="container">
          <div class="landing-section__intro" data-reveal>
            <p class="eyebrow">FAQ</p>
            <h2>Questions fréquentes sur MentorBase</h2>
          </div>
          <div class="landing-faq">
            <details
              v-for="(item, index) in faqItems"
              :key="item.question"
              class="landing-faq__item"
              data-reveal
              :style="{ '--reveal-delay': `${index * 60}ms` }"
            >
              <summary class="landing-faq__question">{{ item.question }}</summary>
              <p class="landing-faq__answer">{{ item.answer }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" class="landing-section landing-section--contact">
        <div class="container landing-contact">
          <div data-reveal>
            <p class="eyebrow">Contact</p>
            <h2>Vous voulez tester sur une formation existante ?</h2>
            <p class="landing-section__lead">
              Dites-moi quel type de formation vous proposez, combien d'apprenants sont concernés et
              où se trouvent vos supports. Je vous réponds avec une proposition de pilote adaptée.
            </p>
          </div>

          <form v-if="!contactSubmitted" class="landing-form" data-reveal @submit.prevent="submitContact">
            <div class="landing-form__grid">
              <label class="field">
                <span class="field__label">Nom</span>
                <input v-model="contactName" class="input" type="text" required />
              </label>
              <label class="field">
                <span class="field__label">Email</span>
                <input v-model="contactEmailInput" class="input" type="email" required />
              </label>
              <label class="field">
                <span class="field__label">Organisme</span>
                <input v-model="contactOrganization" class="input" type="text" required />
              </label>
              <label class="field">
                <span class="field__label">Rôle</span>
                <input
                  v-model="contactRole"
                  class="input"
                  type="text"
                  placeholder="Ex. responsable pédagogique, formateur"
                  required
                />
              </label>
              <label class="field">
                <span class="field__label">Type de formation</span>
                <input
                  v-model="contactFormationType"
                  class="input"
                  type="text"
                  placeholder="Ex. bootcamp dev, école, formation pro"
                  required
                />
              </label>
              <label class="field">
                <span class="field__label">Nombre approximatif d'apprenants</span>
                <input v-model="contactLearnerCount" class="input" type="text" required />
              </label>
            </div>
            <label class="field">
              <span class="field__label">Où sont vos supports aujourd'hui ?</span>
              <input
                v-model="contactSupportsLocation"
                class="input"
                type="text"
                placeholder="Ex. PDF, Moodle, Google Drive, Notion"
                required
              />
            </label>
            <label class="field">
              <span class="field__label">Votre principal problème avec l'usage de l'IA</span>
              <input v-model="contactIaProblem" class="input" type="text" required />
            </label>
            <label class="field">
              <span class="field__label">Message libre</span>
              <textarea v-model="contactMessage" class="textarea" rows="4" />
            </label>
            <button class="btn btn-lg" type="submit">Envoyer ma demande de pilote</button>
          </form>

          <div v-else class="landing-form landing-form--success" role="status">
            <p class="landing-form__success-title">Merci, votre demande a bien été préparée.</p>
            <p class="landing-form__success-copy">Je reviens vers vous rapidement.</p>
          </div>
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>
