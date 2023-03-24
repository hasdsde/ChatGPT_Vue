<template>
  <q-avatar class="q-mr-sm">
    <img src="https://cdn.quasar.dev/img/avatar.png">
  </q-avatar>
  <div class="q-mr-sm">这是用户名</div>
  <q-btn color="red" size="sm" label="退出" @click="logout">
  </q-btn>
</template>
<script setup lang="ts">
import { CommonSuccess } from 'src/components/Result'
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const $q = useQuasar()
let dialog = ref(false)



// 登出
function logout() {
  $q.dialog({
    title: '登出',
    message: '你确定要登出吗？',
    cancel: true,
    persistent: true
  }).onOk(() => {
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
