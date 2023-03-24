<template>
  <q-avatar class="q-mr-sm">
    <img src="src/assets/user.jpg">
  </q-avatar>
  <div class="q-mr-sm">{{ username }}</div>
  <q-btn color="red" size="sm" label="退出" @click="logout">
  </q-btn>
</template>
<script setup lang="ts">
import { CommonSuccess } from 'src/components/Result'
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const $q = useQuasar()
const rt = useRouter()
let dialog = ref(false)
const username: any = ref('')
const avatar: any = ref('')
function getUserInfo() {
  username.value = localStorage.getItem('username')
  avatar.value = localStorage.getItem('avatar')
}
getUserInfo()

// 登出
function logout() {
  $q.dialog({
    title: '登出',
    message: '你确定要登出吗？',
    cancel: true,
    persistent: true
  }).onOk(() => {
    localStorage.clear()
    rt.push('/login')
    // console.log('>>>> OK')
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
