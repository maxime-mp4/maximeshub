<script setup>
import { ref, onMounted, onUnmounted, computed, Transition, nextTick, watch } from 'vue'
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

  document.body.style.overflow = ''

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

watch(
  () => toggled.value[0],
  (isDisabled) => {
    if (isDisabled) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = '' // remet la valeur par défaut
    }
  }
)



// Functions

function switchTheme() {
  document.documentElement.classList.toggle('dark')
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function scrollUp() {
  if(toggled[0].value) return;
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
    :class="[toggled[0] ? 'lg:w-2/3' : 'w-full', 'announcement-banner']">
    <span>Tracker Disabled. Coming back summer 2028. Click here for more info.</span>
  </header>

  <NavbarComponent :class="[{'-translate-x-1/3 lg:blur pointer-events-none': toggled[0]} ]" :scrollY="scrollY" :headerRef="headerRef"
    :navbarElements="navbarElements" />
  <HomeView :mainToggled="toggled"  :class="[{'-translate-x-1/3 lg:blur pointer-events-none': toggled[0]}]"
    class="mx-8 lg:w-3/4 xl:w-1/2 lg:mx-auto mb-24 transition-all duration-1000" />

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

    <section v-if="toggled[0]"
      class="flex flex-col gap-6 right-0 z-99 w-full px-12 h-full lg:w-7/20 overflow-auto bg-neutral-100 dark:bg-neutral-800 fixed top-0 lg:border-l border-neutral-500/50 dark:border-neutral-500 p-4">
      
      <header class="flex justify-between items-center">
        <p class="font-bold text-lg lg:text-xl">Tracker Current State</p>
        <button @click="toggled[0] = false"
          class="h-8 active:bg-neutral-200 hover:bg-neutral-200 p-2 rounded-full transition-all hover:text-neutral-800 cursor-pointer flex items-center text-neutral-500">
          <span>Close</span>
          <i class="fa-solid fa-xmark fa-xl"></i>
        </button>
      </header>
      
      <div class="flex flex-col gap-4">
        <p>
          The tracker project is currently undergoing a full rework and is expected to be on hold until at least summer 2028.
          My studies take up a lot of time, and since this is a large and complex project that I'm developing on my own, it requires
          a significant amount of effort and dedication. I also want to make sure that the final result is as polished and high-quality as possible,
          so I'm taking the time needed to do things right.
        </p>
        <p>
          I've also decided to replace the current version of the tracker (which is unfinished and not very optimized) with this new website.
          Don't worry though — the tracker isn't forgotten. It's simply being redesigned and improved to ensure that when it returns, it's the best version it can be.
        </p>
      </div>
      
      <div class="flex flex-col gap-4">
        <p>API is now currently public, and can be found <a class="underline" target="_blank" href="https://api.yandhi.me">here</a>.</p>
      </div>

      <p class="font-bold text-lg lg:text-xl">Quick API guide</p>
      <div class="flex flex-col gap-4">
        <p>
          To get started with the API, simply make a GET request to the base URL: <span class="italic font-semibold">https://api.yandhi.me/</span>.
          If a request returns "Route not found", ensure that you are using the correct endpoint and that it is properly defined in the API documentation.
        </p>
        <p>
          From there, you can access various endpoints to retrieve different types of data.
          For example, to get era information, you can make a GET request to <code>https://api.yandhi.me/eras/:id</code>,
          replacing <code>{id}</code> with the actual ID of the era you want to retrieve.
        </p>
        
        <p class="font-semibold underline">Current endpoints :</p>
        
        <div>
          <p>/eras/:id - Get information about a specific era by its ID.</p>
          <p>/eras - Get a list of all eras.</p>
          <p>/unreleased/:id - Get information about a specific unreleased item by its ID.</p>
          <p>/unreleased - Get a list of all unreleased items.</p>
        </div>

        <p class="italic">If you wonder how to retrieve IDs, just found it. It's pretty random.<br>I recommend using directly the global endpoint and search manually a song by its name.</p>

      </div>
    </section>
  </Transition>

  <footer @click="toggled[0] = !toggled[0]"
    :class="[toggled[0] ? 'lg:w-2/3' : 'w-full', 'announcement-banner']">
    <span >Tracker Disabled. Coming back summer 2028. Click here for more info.</span>
  </footer>
</template>

