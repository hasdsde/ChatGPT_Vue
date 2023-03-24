<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; ">
      <q-chat-message name=" me" avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="['hey, how are you?']" sent />
      <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['doing fine, how r you?']" />
    </div>
  </div>
  <div class="absolute-bottom bg-grey-2 " style="margin-bottom: 5vh;">
    <div class="q-pa-md">
      <q-input class="sent" style="width: 75vw" dense outlined v-model="text" />
      <q-btn class="sent q-ml-sm" color="primary" label="发送" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
const text = ref('')

function getHisttory() {
  api.get('/his')
}


</script>

<style>
.sent {
  display: inline-block;
}
</style>
