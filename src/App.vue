<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import HomeView from './views/HomeView.vue'

const scrollY = ref(0)


const handleScroll = () => {
  scrollY.value = window.scrollY
}

const theme = ref('light')

const currentTheme = computed(() => theme.value)


onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    theme.value = 'dark'
  } else {
    theme.value = 'light'
    document.documentElement.classList.remove('dark')
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const headerRef = ref(null)

const getHeaderHeight = () => {
  if (headerRef.value) {
    return headerRef.value.clientHeight
  }
  return 0
}
function switchTheme() {
  document.documentElement.classList.toggle('dark')
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

</script>

<template>

      <header ref="headerRef" class="relative w-full min-h-8 items-center flex justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-neutral-800 text-center">
        <span>Tracker Disabled. Coming back summer 2028.</span>
      </header>

      <nav :class='["transition-all duration-500 max-w-full py-1 flex justify-center items-center gap-4 sticky px-3  backdrop-blur-xs z-50", scrollY > getHeaderHeight() ? "m-2 rounded-[1rem] border top-1.5 border-neutral-400/50 bg-neutral-200/75 dark:bg-neutral-800/75" : "border-transparent top-0"]'>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#"><i class="fa fa-solid fa-home"></i><span class="hidden mx-1 lg:block">Home</span></a>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#whoami"><i class="fa fa-solid fa-user"></i><span class="hidden mx-1 lg:block">Who Am I?</span></a>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#projects"><i class="fa fa-solid fa-folder"></i><span class="hidden mx-1 lg:block">Projects</span></a>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#skills-technologies"><i class="fa fa-solid fa-hashtag"></i><span class="hidden mx-1 lg:block">Skills & Technologies</span></a>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#langages"><i class="fa-solid fa-language"></i><span class="hidden mx-1 lg:block">Languages</span></a>
        <a class="active:bg-neutral-400/75 transition-all hover:bg-neutral-400/75 h-8 flex items-center px-2 rounded-full" href="#contact"><i class="fa fa-solid fa-envelope"></i><span class="hidden mx-1 lg:block">Contact</span></a>
      </nav>

      <HomeView class="m-8 md:mx-24 lg:mx-48 xl:mx-96 2xl:mx-144"/>

      <button @click="switchTheme()" :class="['m-4 cursor-pointer sticky bottom-4 h-8 aspect-square rounded-2xl transition-all duration-500 border border-neutral-500/50', currentTheme === 'dark' ? 'bg-emerald-500' : 'bg-neutral-200 lg:bg-transparent']">
        <i class='fa-solid fa-moon'></i>
      </button>


      <footer class="relative w-full min-h-8 items-center flex justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-neutral-800 text-center">
        <span>Tracker Disabled. Coming back summer 2028.</span>
      </footer>
</template>

