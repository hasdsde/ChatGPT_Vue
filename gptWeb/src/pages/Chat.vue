<template >
  <div ref="chat">
    <div class="q-pa-md row justify-center" v-for="(item, index) in dialog" :key="index">
      <div style="width: 100%; ">
        <q-chat-message name="用户" avatar="src/assets/user.jpg" :text="[item.content]" :sent="item.is_user == 1"
          v-if="item.is_user == 1" />
        <q-chat-message name="ChatGPT" avatar="src/assets/ai.png" :text="[item.content]" :sent="item.is_user == 1"
          v-if="item.is_user == 0" />
      </div>
    </div>
  </div>
  <div style="height: 6vh;">
  </div>
  <div class="fixed-bottom bg-grey-2  " style="margin-bottom: 5vh;text-align: center;">
    <div class="q-pa-md">
      <q-input class="sent" style="width: 75vw" dense outlined v-model="text" />
      <q-btn class="sent q-ml-sm" color="primary" label="发送" @click="sendMessage" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
const text = ref('')
const openid = 'oZGPM6iQs55RZ1SWIorjsOGw6smo'
let pageCount = 10;
let dialog: any = ref([])
const chat: any = ref(null);
function loadPage() {
  getHisttory()
}
loadPage()

function sendMessage() {
  api.post('/send', {
    'sendMessage': text.value,
    'userid': openid
  }).then((res: any) => {
    console.log(res.data);
  })
}

onMounted(() => {
  chat.value.scrollTop = 1000

});




function getHisttory() {
  api.get('/his?openId=' + openid + "&count=" + pageCount).then((res: any) => {
    dialog.value = res.data
  })
}



function getScrollTarget(el: any) {
  throw new Error('Function not implemented.');
}

function setVerticalScrollPosition(target: void, offset: number, duration: number) {
  throw new Error('Function not implemented.');
}
</script>

<style>
.sent {
  display: inline-block;
}
</style>
