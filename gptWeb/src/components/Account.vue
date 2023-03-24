<template>
  <q-avatar class="q-mr-sm">
    <img src="https://cdn.quasar.dev/img/avatar.png">
  </q-avatar>
  <div class="q-mr-sm">这是用户名</div>
  <q-btn color="secondary" size="sm" label="选项">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @click="updatePassword">修改密码</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="logout">退出</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-menu>
  </q-btn>

  <!-- 修改密码对话框 -->
  <q-dialog v-model="dialog">
    <q-card style="min-width: 20%;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">修改密码</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input class="q-pa-sm" filled v-model="old_pwd" label="旧密码" />
          <q-input class="q-pa-sm" filled v-model="new_pwd" label="新密码" />
          <q-input class="q-pa-sm" filled v-model="confirm_pwd" label="确认密码" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="重置" color="primary" v-close-popup />
        <q-btn flat label="提交" type="submit" color="red" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
// 修改密码
let old_pwd = ref('');
let new_pwd = ref('');
let confirm_pwd = ref('');
function onSubmit() {

}
function onReset() {

}
//修改密码弹窗
function updatePassword() {
  dialog.value = true
}
</script>
