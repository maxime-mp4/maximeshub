<script setup>
import { ref, onMounted, onUnmounted, computed, Transition, nextTick } from 'vue'
import HomeView from './views/HomeView.vue'
import NavbarComponent from './components/NavbarComponent.vue'

// Reactive state
const scrollY = ref(0)
const headerRef = ref(null)
const theme = ref(null)
const toggled = ref([])

// Computed properties
const currentTheme = computed(() => theme.value)

// Variables

const navbarElements = [{ href: 'home', icon: 'fa-home', text: 'Home' },
{ href: 'whoami', icon: 'fa-user', text: 'Who Am I?' },
{ href: 'projects', icon: 'fa-folder', text: 'Projects' },
{ href: 'skills-technologies', icon: 'fa-hashtag', text: 'Skills & Technologies' },
{ href: 'languages', icon: 'fa-language', text: 'Languages' },
{ href: 'contact', icon: 'fa-envelope', text: 'Contact' }]


// Lifecycle hooks

const handleScroll = () => {
  scrollY.value = window.scrollY
}

// Mounted/Unmounted

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

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})



// Functions

function switchTheme() {
  document.documentElement.classList.toggle('dark')
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


function updateNavbarHighlight() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const navItems = Array.from(navbar.children).slice(1);
    const activeIndex = navItems.findIndex(item => item.href.split("#")[1] === hash);

    if (activeIndex === -1) return;

    const activeItem = navItems[activeIndex];
    const background = navbar.children[0];
    const navbarRect = navbar.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    const offset = itemRect.left - navbarRect.left;

    Object.assign(background.style, {
      transform: `translateX(${offset}px)`,
      width: `${activeItem.clientWidth}px`,
      height: `${activeItem.clientHeight}px`,
      opacity: '1'
    });
  }

</script>

<template>

  <header @click="toggled[0] = !toggled[0]" ref="headerRef"
    :class="[toggled[0] ? 'w-2/3' : 'w-full', 'announcement-banner transition-all duration-800']">
    <span>Tracker Disabled. Coming back summer 2028.</span>
  </header>

  <NavbarComponent :class="[{'-translate-x-1/3': toggled[0]}]" :scrollY="scrollY" :headerRef="headerRef"
    :navbarElements="navbarElements" />
  <HomeView :class="[{'-translate-x-1/3': toggled[0]}]"
    class="mx-8 lg:w-3/4 xl:w-1/2 lg:mx-auto transition-all duration-600" />

  <ul class="p-2 flex sticky bottom-0 gap-2">
    <li>
      <button @click="switchTheme()"
        :class="['bottom-buttons z-50', currentTheme === 'dark' ? 'bg-emerald-500' : 'bg-neutral-200 lg:bg-transparent']">
        <i class='fa-solid fa-moon'></i>
      </button>
    </li>
    <li>
      <Transition name="translate">
        <button v-if="scrollY > 300" @click="scrollUp()"
          :class="['bottom-buttons z-40', currentTheme === 'dark' ? 'bg-emerald-500' : 'bg-neutral-200 lg:bg-transparent']">
          <i class='fa-solid fa-chevron-up'></i>
        </button>
      </Transition>
    </li>
  </ul>

  <Transition name="translate-left">
    <div v-if="toggled[0]"
      class="flex flex-col right-0 z-99 h-screen w-7/20 bg-neutral-800 fixed top-0 border border-neutral-500 rounded-2xl p-4">
      <div class="flex justify-between items-center">
        <p class="font-black text-xl">Where went the tracker?</p>
        <button @click="toggled[0] = false"
          class="h-8 hover:bg-neutral-200 p-2 rounded-full transition-all hover:text-neutral-800 cursor-pointer flex items-center text-neutral-500">
          <span>Close</span>
          <i class="fa-solid fa-xmark fa-xl"></i>
        </button>
      </div>
      <div class="mt-4">
        <p>The tracker has been disabled and will return in summer 2028.</p>
        <p class="mt-2">In the meantime, feel free to explore the rest of the website!</p>
        </div>
    </div>
  </Transition>

  <footer @click="toggled[0] = !toggled[0]"
    :class="[toggled[0] ? 'w-2/3' : 'w-full', 'announcement-banner transition-all duration-800']">
    <span>Tracker Disabled. Coming back summer 2028.</span>
  </footer>
</template>

