<template>
  <q-item clickable :class="isActive ? 'text-bold': ''" style="border-radius: 25px;" @click="onClick(model)">
    <q-item-section v-if="model.icon" avatar>
      <q-icon :name="model.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-capitalize">{{ model.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: [ 'model' ],
  data() {
    return {
      isActive: false
    }
  },
  created() {
    if(this.$route.name === this.model.slug) this.isActive = true
  },
  methods: {
    onClick(model) {
      if(model.url) {
        const url = model.url
        if(url === 'logout') {
          this.$Helper.destroyLocalStorage('token')
          this.$router.push({ name: 'login' })
        }
      }
    }
  }
}
</script>
