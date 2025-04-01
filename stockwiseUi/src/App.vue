<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'app',
  components: {
    RouterView,
  },
  setup() {
    onBeforeMount(() => {})

    onMounted(() => {
      nextTick(() => {})
    })
  },
})
</script>
