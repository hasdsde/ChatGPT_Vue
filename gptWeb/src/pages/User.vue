<template>
  <div class="q-pa-md">
    <q-card class="my-card bg-primary text-white">
      <q-card-section style="text-align: center;" class="no-padding ">
        <q-avatar class="q-mt-md">
          <img src="src/assets/user.jpg">
        </q-avatar>
      </q-card-section>
      <q-card-section style="text-align: center;">
        <div class="text-h6">{{ username }}</div>
        <div class="text-subtitle2">{{ openid }}</div>
      </q-card-section>
      <q-separator dark />
      <q-card-actions vertical>
        <q-btn flat @click="changeUserName">修改名称</q-btn>
        <!-- <q-btn flat @click="upload_dialog = !upload_dialog">修改头像</q-btn> -->
        <q-btn flat @click="dialog = true">修改密码</q-btn>
        <q-btn flat class="text-red" @click="logout">退出</q-btn>
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
        <q-btn flat label="提交" type="submit" color="red" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 头像上传 -->
  <q-dialog v-model="upload_dialog">
    <q-uploader :url="'http://localhost:8888/setAvatar?id=' + openid" style="max-width: 300px" auto-upload />
  </q-dialog>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { CommonSuccess, CommonWarn } from 'src/components/Result';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let old_pwd = ref('');
let new_pwd = ref('');
let confirm_pwd = ref('');
const dialog = ref(false)
let username: any = ref('')
let openid: any = ref('')
const rt = useRouter()
let avatar: any = ref('')
const $q = useQuasar()
const upload_dialog = ref(false)

function getUserInfo() {
  openid.value = localStorage.getItem('openid')
  username.value = localStorage.getItem('username')
  api.get('/getUserInfo?openId=' + openid.value).then((res: any) => {
    username.value = res.data[0].username
    avatar.value = res.data[0].avatar
    localStorage.setItem("username", username.value)
    localStorage.setItem("avatar", avatar.value)
  })
}
getUserInfo()
function onSubmit() {
  if (new_pwd.value == confirm_pwd.value) {
    api.post('/update_pwd', {
      'newPassword': new_pwd.value,
      'openId': openid.value,
      'oldPassword': old_pwd.value
    }).then((res: any) => {
      CommonSuccess('提交成功')
    })
    dialog.value = false
  } else {
    CommonWarn('两次输入不一致')
  }
}

function onReset() {
  old_pwd.value = ''
  new_pwd.value = ''
  confirm_pwd.value = ''
}
function logout() {
  localStorage.clear()
  rt.push('/login')
}

function changeUserName() {
  $q.dialog({
    title: '修改名称',
    message: '输入新名称',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: false
  }).onOk(data => {
    // console.log('>>>> OK, received', data)
    api.get('/setName?username=' + data + '&openId=' + openid.value).then((res: any) => {
      CommonSuccess('修改成功')
      getUserInfo()
    })
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<style scoped>
.my-card {
  max-width: 300px;
}
</style>
