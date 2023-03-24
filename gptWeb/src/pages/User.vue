<template>
  <div class="q-pa-md">
    <q-card class="my-card bg-primary text-white">
      <q-card-section style="text-align: center;" class="no-padding ">
        <q-avatar class="q-mt-md">
          <img src="src/assets/user.jpg">
        </q-avatar>
      </q-card-section>
      <q-card-section style="text-align: center;">
        <div class="text-h6">用户名</div>
        <div class="text-subtitle2">userid</div>
      </q-card-section>
      <q-separator dark />
      <q-card-actions vertical>
        <q-btn flat>修改名称</q-btn>
        <q-btn flat>修改头像</q-btn>
        <q-btn flat class="text-red">退出</q-btn>
      </q-card-actions>
    </q-card>
  </div>


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
import { ref } from 'vue';

let old_pwd = ref('');
let new_pwd = ref('');
let confirm_pwd = ref('');
const dialog = ref(false)
function onSubmit() {
  old_pwd.value = ''
  new_pwd.value = ''
  confirm_pwd.value = ''
}

function onReset() {

}

</script>

<style scoped>
.my-card {
  max-width: 300px;
}
</style>
