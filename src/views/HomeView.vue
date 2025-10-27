<script setup>
import ProjectCard from '@/components/ProjectCard.vue';
import { ref } from 'vue';

const props = defineProps({
  mainToggled: {
    type: Array,
    required: true
  }
});

const toggled = ref([]);
const carousel = ref(null);

const onWheel = (e) => {
  if (props.mainToggled[0]) return;
  e.preventDefault();
  carousel.value.scrollBy({
    left: e.deltaY,
  });
};

const carouselScroll = (deltaY) => {
  if (props.mainToggled[0]) return;
  const maxScroll = carousel.value.scrollWidth - carousel.value.clientWidth;
  const currentScroll = carousel.value.scrollLeft;
  
  if (deltaY > 0 && currentScroll >= maxScroll) {
    carousel.value.scrollTo({ left: 0, behavior: "smooth" });
  } else if (deltaY < 0 && currentScroll <= 0) {
    carousel.value.scrollTo({ left: maxScroll, behavior: "smooth" });
  } else {
    carousel.value.scrollBy({ left: deltaY, behavior: "smooth" });
  }
};
</script>

<template>
  <main class="home min-h-screen flex flex-col gap-12">
      <section id="home">
        <h1>Maxime's Hub</h1>
        <p>Developer. Creator. Always learning.</p>
      </section>

      <section id="whoami" class="flex flex-col gap-2">
        <h2 class="title">Who am I ?</h2>
        <p>
          Hi, I'm Maxime, a 19-year-old French student preparing for engineering school.
          I'm fascinated by technology and mechanics, always curious about how things work and how to improve them.
          I can code when needed, but my real passion lies in understanding and creating with machines and tech.
        </p>
      </section>

      <section id="projects" class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 class="title">Projects</h2>
          <p>Some repositories may be private.</p>
        </div>
        <div class="px-2 flex gap-4">
          <button class="h-12 active:scale-105 aspect-square flex rounded-full transition justify-center items-center hover:bg-neutral-800" @click="carouselScroll(-200)"><i class="fas fa-chevron-left"></i></button>
          <button class="h-12 active:scale-105 aspect-square flex rounded-full transition justify-center items-center hover:bg-neutral-800" @click="carouselScroll(200)"><i class="fas fa-chevron-right"></i></button>
        </div>
        <ul class="flex overflow-x-auto snap-x snap-mandatory gap-4 py-4 scrollbar-hide" @wheel="onWheel" ref="carousel">
          <li>
            <ProjectCard class="w-72 lg:w-96" :project="{
              icon: 'fa-music',
              title: 'Tracker',
              description: 'A web app to listen to unreleased music.',
              techStack: ['Vue.js', 'Tailwind CSS', 'JavaScript']
            }"/>
          </li>
          <li>
            <ProjectCard :project="{
              icon: 'fa-layer-group',
              title: 'Yepi',
              description: 'An API for Ye\'s unreleased music. Working with Tracker.',
              techStack: ['JavaScript', 'Node.js', 'Express'  ]
            }" />
          </li>
          <li>
            <ProjectCard :project="{
              icon: 'fa-gamepad',
              title: 'S101',
              description: 'Creation of a Pac-Man type game using C++',
              techStack: ['C++', 'Makefile', 'OOP']
            }" />

          </li>
          <li>

            <ProjectCard :project="{
              icon: 'fa-palette',
              title: 'Chromata',
              description: 'Managing color palettes and themes for applications.',
              techStack: ['', 'Electron', 'JavaScript']
            }" />

          </li>
          
        </ul>
      </section>

      <section id="skills-technologies" class="flex flex-col gap-2">
        <h2 class="title">Skills & Technologies</h2>
        <p>
          Here are some of the skills and technologies I have experience with:
        </p>
        <article class="flex flex-col gap-2">
            <p class="font-bold text-lg">Hard Skills</p>
            <ul class="flex flex-wrap gap-3">
              <li class="skill-button bg-gradient-to-r from-red-400 to-rose-500">Mathematics & Data Analysis</li>
              <li class="skill-button bg-gradient-to-l from-neutral-400 to-zinc-500">Modeling</li>
              <li class="skill-button bg-conic/decreasing from-lime-500 via-blue-500 to-lime-500">UI Design</li>
              <li class="skill-button dark:bg-neutral-200 bg-neutral-800">UX Design</li>
            </ul>
        </article>
        <article class="flex flex-col gap-2">
            <p class="font-bold text-lg">Soft Skills</p>
            <ul class="flex flex-wrap gap-3">
              <li class="skill-button bg-gradient-to-r from-indigo-400 to-purple-600">Teamwork & Collaboration</li>
              <li class="skill-button bg-gradient-to-r from-lime-300 to-amber-500">Problem Solving</li>
              <li class="skill-button bg-gradient-to-tr from-teal-200 to-sky-500">Adaptability</li>
            </ul>
        </article>
        <article class="flex flex-col gap-2">
            <p class="font-bold text-lg">Technologies</p>
            <ul class="flex flex-wrap gap-3">
              <li class="skill-button bg-gradient-to-bl from-blue-400 to-yellow-400">Python</li>
              <li class="skill-button bg-gradient-to-r from-yellow-300 to-amber-400">JavaScript</li>
              <li class="skill-button bg-gradient-to-r from-blue-600 to-blue-800">C/C++</li>
              <li class="skill-button bg-gradient-to-r from-blue-600 to-blue-800">C#</li>
              <li class="skill-button bg-gradient-to-r from-emerald-500 to-teal-300">Vue.js</li>
              <li class="skill-button bg-gradient-to-r from-sky-300 to-sky-600">Tailwind CSS</li>
              <li class="skill-button bg-gradient-to-r from-orange-400 to-amber-500">SQL</li>
              <li class="skill-button bg-gradient-to-r from-red-500 to-rose-600">Ruby</li>
            </ul>
        </article>
      </section>

      <section id="languages" class="flex flex-col gap-2">
        <h2>Languages</h2>
        <ul class="flex flex-wrap gap-3">
          <li class="skill-button bg-neutral-800 dark:bg-neutral-200 rounded-full">French (Native)</li>
          <li class="skill-button bg-neutral-800 dark:bg-neutral-200 rounded-full">English</li>
          <li class="skill-button bg-neutral-800 dark:bg-neutral-200 rounded-full">Spanish</li>
        </ul>
      </section>

      <section id="contact" class="flex flex-col gap-12 h-64">
        <div class="flex flex-col gap-2">
          <h2 class="title">Contact</h2>

          <div class="flex gap-4 flex-wrap justify-between">


            <div class="relative flex flex-col items-center">
              <button @click="toggled[1] = !toggled[1]" class="p-2 rounded-xl hover:scale-105 bg-emerald-300 dark:bg-emerald-700 drop-shadow border border-neutral-500/50 active:-translate-y-1 transition-all font-bold cursor-pointer w-24">LinkedIn</button>
             <transition>
                <div v-if="toggled[1]" class="absolute z-50 border border-neutral-500/50 top-10 bg-neutral-900 p-2 my-2 w-max rounded-xl font-bold text-sm text-white">No LinkedIn.</div>
              </transition>
            </div>

            <div class="relative flex flex-col items-center">
              <button @click="toggled[2] = !toggled[2]" class="p-2 rounded-xl hover:scale-105 bg-emerald-300 dark:bg-emerald-700 drop-shadow border border-neutral-500/50 active:-translate-y-1 transition-all font-bold cursor-pointer w-24">Email</button>
              <transition>
                <div v-if="toggled[2]" class="absolute z-50 border border-neutral-500/50 top-10 bg-neutral-900 p-2 my-2 w-max rounded-xl font-bold text-sm text-white">No mail.</div>
              </transition>
            </div>
            
            <div class="relative flex flex-col items-center">
              <button @click="toggled[3] = !toggled[3]" class="p-2 rounded-xl hover:scale-105 bg-emerald-300 dark:bg-emerald-700 drop-shadow border border-neutral-500/50 active:-translate-y-1 transition-all font-bold cursor-pointer w-24">Discord</button>
              <transition>
                <div v-if="toggled[3]" class="absolute z-50 border border-neutral-500/50 top-10 bg-neutral-900 p-2 my-2 w-max rounded-xl font-bold text-sm text-white">@maximedu91</div>
              </transition>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <span>Made with <i class="fas fa-heart text-red-500"></i></span>
          <span>This website uses Vue.js 3 & Tailwind CSS</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <a target="_blank" href="https://github.com/maxime-mp4" class="opacity-50"><i class="fa fa-github fa-3x"></i></a>
          <a target="_blank" href="https://github.com/maxime-mp4/maximeshub" class="text-sm opacity-50 underline italic">Or the repository of this website</a>
        </div>

      </section>

  </main>
</template>
