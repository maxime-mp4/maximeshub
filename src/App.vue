<script setup>
import { ref, onMounted, onUnmounted, computed, Transition, nextTick } from 'vue'
import HomeView from './views/HomeView.vue'

const scrollY = ref(0)


const handleScroll = () => {
  scrollY.value = window.scrollY
}

const theme = ref('light')

const currentTheme = computed(() => theme.value)


onMounted(async () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    theme.value = 'dark'
  } else {
    theme.value = 'light'
    document.documentElement.classList.remove('dark')
    
  }

  await nextTick()
  updateNavbarHighlight()

  

  window.addEventListener("hashchange", updateNavbarHighlight)
  window.addEventListener("resize", updateNavbarHighlight)

  window.addEventListener('scroll', handleScroll)
})

function updateNavbarHighlight() {
    const newHash = window.location.hash.substring(1);
    const navbar = document.getElementById("navbar");
    const navbarChildren = navbar?.children;
    const texts = Array.from(navbarChildren).slice(1).map(child => child.href.split("#")[1]);
    for (let i = 0; i < texts.length; ++i) {
      const element = texts[i];
      if (element === newHash) {
        const childPosition = navbarChildren[i + 1].getBoundingClientRect().left + window.scrollX;
        const navbarPosition = navbar.getBoundingClientRect().left + window.scrollX;
        const offset = childPosition - navbarPosition;
        const background = navbarChildren[0];
        background.style.transform = `translateX(${offset}px)`;
        background.style.width = `${navbarChildren[i + 1].clientWidth}px`;
        background.style.height = `${navbarChildren[i + 1].clientHeight}px`;
        background.style.opacity = '1';
        break;
      }
    }
  }

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

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>

  <header ref="headerRef"
    class="relative w-full min-h-8 items-center flex justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-neutral-800 text-center">
    <span>Tracker Disabled. Coming back summer 2028.</span>
  </header>

  <nav id="navbar"
    :class='["m-4 transition-all duration-500 w-max mx-auto py-1 flex justify-center items-center gap-4 sticky px-3  backdrop-blur-xs z-50 rounded-full top-1.5 border", scrollY > getHeaderHeight() ? "border-neutral-400/50 bg-neutral-200/75 dark:bg-neutral-800/75" : "border-transparent"]'>
    <div class="opacity-0 left-0 duration-500 transition-all h-8 bg-neutral-400/75 absolute rounded-full z-0"></div>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#home"><i class="fa fa-solid fa-home"></i><span class="hidden mx-1 lg:block">Home</span></a>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#whoami"><i class="fa fa-solid fa-user"></i><span class="hidden mx-1 lg:block">Who Am I?</span></a>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#projects"><i class="fa fa-solid fa-folder"></i><span class="hidden mx-1 lg:block">Projects</span></a>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#skills-technologies"><i class="fa fa-solid fa-hashtag"></i><span class="hidden mx-1 lg:block">Skills &
        Technologies</span></a>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#languages"><i class="fa-solid fa-language"></i><span class="hidden mx-1 lg:block">Languages</span></a>
    <a class="active:text-neutral-400 transition-all hover:text-neutral-400 h-8 flex items-center px-2 rounded-full relative z-10"
      href="#contact"><i class="fa fa-solid fa-envelope"></i><span class="hidden mx-1 lg:block">Contact</span></a>
  </nav>

  <HomeView class="m-8 md:mx-24 lg:mx-48 xl:mx-96 2xl:mx-144" />

  <ul class="p-2 flex sticky bottom-0 gap-2">
    <li>
      <button @click="switchTheme()"
        :class="['relative z-50 cursor-pointer h-8 aspect-square rounded-2xl transition-all duration-500 border border-neutral-500/50', currentTheme === 'dark' ? 'bg-emerald-500' : 'bg-neutral-200 lg:bg-transparent']">
        <i class='fa-solid fa-moon'></i>
      </button>
    </li>
    <li>
      <Transition name="translate">
        <button v-if="scrollY > 300" @click="scrollUp()"
          :class="['relative z-40 cursor-pointer h-8 aspect-square rounded-2xl transition-all duration-500 border border-neutral-500/50', currentTheme === 'dark' ? 'bg-emerald-500' : 'bg-neutral-200 lg:bg-transparent']">
          <i class='fa-solid fa-chevron-up'></i>
        </button>
      </Transition>
    </li>
  </ul>


  <footer
    class="relative w-full min-h-8 items-center flex justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-neutral-800 text-center">
    <span>Tracker Disabled. Coming back summer 2028.</span>
  </footer>
</template>

