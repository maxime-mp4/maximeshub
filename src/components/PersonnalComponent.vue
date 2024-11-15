<script>
export default {
    data(){
        return {
            repoList : [],
            sortedRepoList : [],
            sortType : ["name", "stars", "fork"],
            sortIndex: 0,
        }
    },

    watch: {
        sortIndex() {
            this.sortBy(this.repoList, this.sortIndex   );
        },
        repoList() {
            this.sortBy(this.repoList, this.sortIndex   );
        }
  },

    methods: {
        getRepositories() {

            const url = "https://api.github.com/users/maxime-mp4/repos"

            return fetch(url, {
                headers: {
                    'Authorization': `token ${import.meta.env.VITE_TOKEN}`
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error("An error has occurred. Please refresh the page or contact the developer.");
                    return res.json();
                })
                .then(repositories => {
                    this.repoList = repositories
                        .filter(repo => !repo.private)
                        .map(repo => ({
                            name: repo.name,
                            id: repo.id,
                            description: repo.description,
                            owner: repo.owner.login,
                            fork: repo.fork,
                            language: repo.language,
                            stars: repo.stargazers_count
                        })
                    );
                })
                .catch(error => {
                    console.error(error);
                    return "An error has occurred. Please refresh the page or contact the developer.";
                });
        },
        sortBy(repositoriesList, sortIndex) {
            this.sortedRepoList = [...repositoriesList].sort((b,a) => a[this.sortType[sortIndex]] - b[this.sortType[sortIndex]])
        },
    },

    async mounted() {
        await this.getRepositories()
    }
}


</script>

<template>
<section class="flex flex-col">
    <div class="p-4 h-[calc(50vh-1rem)]">
        <div class="divide-y flex flex-col items-center ">
            <div class="pb-2 font-bold flex flex-col items-center">
                <span class="text-3xl text-neutral-300">maxime's website</span>
                <span class="text-neutral-300/50">{{ $route.fullPath.slice(1) != "" ? $route.fullPath.slice(1) : "home" }}</span>
            </div>
        <span class="pt-2 text-justify">Hello, my name is Maxime, I'm 18. I live in France, and I study computer science. My goal is simply to have a decent level of programming.</span>
        
        </div>
        <div class="m-8 flex justify-around">
            <ul>    
                <li>Discord</li>
                <li>Instagram</li>
                <li>Mail</li>
                <li>GitHub</li>
                <li>Linkedin</li>
            </ul>
            <ul>
                <li>Dark Theme</li>
                <li>Switch Layout</li>
                <li>Disable CSS</li>
            </ul>
        </div>
    </div>
    <div class="p-4 flex justify-around bg-neutral-800 rounded-xl h-[calc(50vh-1rem)]">
        <div class="flex flex-col items-center justify-center">
            <span class="text-neutral-300 font-bold">Frameworks used</span>
            <div class="flex ">
                <a href="https://tailwindcss.com" target="_blank" class="flex justify-center items-center hover:bg-neutral-700 p-1 h-20 w-20 rounded-xl ">
                    <img src="/tailwind.svg">
                </a>
                <a href="https://tailwindcss.com" target="_blank" class="flex justify-center items-center hover:bg-neutral-700 p-1 h-20 w-20 rounded-xl ">
                    <img src="/vite.svg">
                </a>
                <a href="https://tailwindcss.com" target="_blank" class="flex justify-center items-center hover:bg-neutral-700 p-1 h-20 w-20 rounded-xl ">
                    <img src="/vue.svg">
                </a>
            </div>
        </div>
        <div>
            <div class="flex flex-col items-center justify-center">
                <img class="h-64 rounded-xl" src="/public/rice.png">
                <span class="text-neutral-300 font-bold">Working on Fedora KDE</span>
            </div>
        </div>
    </div>
</section>

</template>