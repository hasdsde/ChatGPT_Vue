<template>
  <q-pull-to-refresh @refresh="refresh">
    <div class="q-pa-md row justify-center" v-for="(item, index) in dialog" :key="index">
      <div style="width: 100%; ">
        <q-chat-message name="用户" avatar="src/assets/user.jpg" :text="[item.content]" :sent="item.is_user == 1"
          v-if="item.is_user == 1" />
        <q-chat-message name="ChatGPT" avatar="src/assets/ai.png" :text="[item.content]" :sent="item.is_user == 1"
          v-if="item.is_user == 0" />
      </div>
    </div>
  </q-pull-to-refresh>

  <div style="height: 6vh;">
  </div>

  <div class="fixed-bottom bg-grey-2  " style="margin-bottom: 5vh;text-align: center;">
    <div class="q-pa-md">
      <q-input class="sent" style="width: 70vw" dense outlined v-model="text" />
      <!-- <q-btn class="sent q-ml-sm" color="primary" label="发送" @click="sendMessage" /> -->
      <q-btn :loading="loading" class="sent q-ml-sm" color="primary" @click="simulateProgress" label="发送" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { CommonSuccess, loadedSuucess, loading } from 'src/components/Result';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const text = ref('')
let openid: any = ''
let pageCount = 10;
let dialog: any = ref([])
const chat: any = ref(null);
const loading = ref(false)
const sign = ref(false)

// 发送按钮
function simulateProgress() {
  loading.value = true
  // 什么屎山
  api.post('/send', {
    'sendMessage': text.value,
    'userid': openid
  }).then((res: any) => {
    loading.value = false
    localStorage.removeItem('genStr')
    text.value = ''
    sign.value = true
    loadPage()
  })
}

// 加载页面
function loadPage() {
  checkUser()
  getHisttory()
  CommonSuccess('刷新完成')
}
loadPage()
checkTemplate()

// 检查模板
function checkTemplate() {
  // @ts-ignore
  if (localStorage.getItem('genStr')?.length > 0) {
    // @ts-ignore
    text.value = localStorage.getItem('genStr')
  }
}

// 发送消息
async function sendMessage() {
  api.post('/send', {
    'sendMessage': text.value,
    'userid': openid
  }).then((res: any) => {
    localStorage.removeItem('genStr')
    text.value = ''
    sign.value = true
    loadPage()
  })

}

// 检查用户信息
function checkUser() {
  if (localStorage.getItem('openid') == undefined || localStorage.getItem('openid') == '') {
    console.log('用户信息为空');
    // window.location.href = '/login'
    useRouter().push('/login')
  } else {
    openid = localStorage.getItem('openid')
  }
}

// 上拉刷新
function refresh(done: any) {
  pageCount += 10
  loadPage()
  done()
}

// 获取历史
function getHisttory() {
  api.get('/his?openId=' + openid + "&count=" + pageCount).then((res: any) => {
    dialog.value = res.data
  })
}

</script>

<style>
.sent {
  display: inline-block;
}
</style>
