<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          AI聊天系统
        </q-toolbar-title>
        <Account />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <Aside />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white ">
      <q-tabs style="height: 5vh;" inline-label v-model="tab" indicator-color="yellow"
        class="bg-primary text-white no-shadow">
        <q-route-tab to="/Chat" name="Chat" icon="forum" label="聊天" />
        <q-route-tab to="/Template" name="Template" icon="category" label="模板" />
        <q-route-tab to="/User" name="User" icon="person" label="关于" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Aside from 'src/components/Aside.vue';
import Account from 'src/components/Account.vue';
const tab = ref()

// 侧栏开关
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
