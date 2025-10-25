<script setup>

defineProps({
    project: {
        type: Object,
        required: true,
        default: () => ({
            icon: 'fa-folder',
            title: 'Project Title',
            description: 'Project Description',
            techStack: ['Tech1', 'Tech2', 'Tech3']
        })
    }
})

</script>

<template>
    <div
        class="project-card dark:bg-neutral-900 transition-all bg-white border border-neutral-500 p-4 h-64 flex flex-col justify-evenly rounded-2xl w-48">
            <div class="flex items-center gap-2">
                <i :class="['fas', 'fa-2xl', project.icon]"></i>
                <p class="font-bold text-xl">{{ project.title }}</p>
            </div>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech-stack">
                <span v-for="tech in project.techStack" :key="tech" class="italic text-neutral-500">{{ tech}}<br/></span>
            </div>
        </div>
        
</template>