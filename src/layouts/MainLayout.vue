<template>
  <q-layout view="hHh lpR fFf">

      <q-drawer show-if-above v-model="sidebarExpand.left" side="left" bordered :mini="miniState" :width="350" :mini-width="100">
        <q-list class="q-pa-sm">
          <q-item v-if="!miniState" clickable dark class="q-pa-lg" @click="$router.push({ name: 'home' })">
            <q-img src="~assets/logo.png" width="45%" />
          </q-item>
          <q-item v-else clickable dark class="q-pa-lg" @click="$router.push({ name: 'home' })">
            <q-img src="~assets/icon.png" width="45%" />
          </q-item>
        </q-list>
        <q-scroll-area :style="'height: ' + ($q.screen.height - 120) + 'px'" class="q-px-md">
          <EssentialLink v-for="(val, i) in essentialLink" :key="i" :model="val" />
        </q-scroll-area>
      </q-drawer>

      <q-drawer show-if-above v-model="sidebarExpand.right" side="right" bordered :width="400">
        <q-list class="q-py-xl">
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <q-img v-if="profile.profile" :src="profile.profile" />
                <q-icon v-else name="account_circle" color="grey" size="xl" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ profile.username }}</q-item-label>
              <q-item-label caption>{{ profile.name }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-btn label="Switch" no-caps flat color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
</template>

<script>
import EssentialLink from '../components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },

  data() {
    return {
      essentialLink: null,
      sidebarExpand: {
        left: false,
        right: false
      },
      miniState: false,
      profile: null
    }
  },

  watch: {
    '$q.screen.width'() {
      if(this.$q.screen.width > 760 && this.$q.screen.width < 1360) this.miniState = true
      else this.miniState = false
    }
  },

  created() {
    const profile = this.$Helper.getLocalStorage('profile')
    this.profile = profile
    this.essentialLink = [
      { label: 'home', slug: 'home', icon: 'home', url: 'home' },
      { label: 'search', slug: 'search', icon: 'search', url: 'search' },
      { label: 'explore', slug: 'explore', icon: 'explore', url: 'explore' },
      { label: 'reels', slug: 'reels', icon: 'slideshow', url: 'reels' },
      { label: 'messages', slug: 'messages', icon: 'chat', url: 'messages' },
      { label: 'notifications', slug: 'notifications', icon: 'favorite', url: 'notifications' },
      { label: 'create', slug: 'create', icon: 'add_box', url: 'create' },
      { label: 'profile', slug: 'profile', icon: 'explore', url: 'profile' },
      { label: 'settings', slug: 'settings', icon: 'settings', url: 'settings' },
      { label: 'your activity', slug: 'activities', icon: 'update', url: 'your activity' },
      { label: 'saved', slug: 'saved', icon: 'bookmark', url: 'saved' },
      { label: 'switch appearance', slug: 'switch', icon: 'dark_mode', url: 'saved' },
      { label: 'logout', slug: 'logout', icon: 'logout', url: 'logout' },
    ]
  },

  methods: {
    toggleLeftDrawer() {
      this.sidebarExpand.left = !this.sidebarExpand.left
    }
  }
}
</script>