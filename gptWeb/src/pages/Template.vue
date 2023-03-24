<template>
  <div class="q-pa-md" style="text-align: center;">
    <q-card class="my-card q-ma-sm" v-for="(s, index) in sort" :key="index">
      <q-card-section>
        <div class="text-h6">{{ s.sort }}</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
      </q-card-section>

      <q-separator />
      <div v-for="(item, index) in tempaltes" :key="index">
        <q-card-actions vertical v-if="s.sort == item.sort">
          <q-btn flat @click="handleClick(item.id)">{{ item.title }}</q-btn>
        </q-card-actions>
      </div>

    </q-card>
  </div>
  <!-- 弹窗  -->
  <q-dialog v-model="prompt">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ currentItem[0].target }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-for="(item, index) in currentItem" :key="index">
        <div>{{ item.text }} </div>
        <q-input dense v-model="item.value" @keyup.enter="prompt = false" :label="item.info" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确定" v-close-popup @click="getResult" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const sort: any = ref('')
const tempaltes: any = ref('')
const prompt = ref(false)
const currentItem: any = ref([])
const rt = useRouter()
function loadPage() {
  getSrot()
}
loadPage()

// 处理结果
function getResult() {
  console.log(currentItem.value);
  let generateStr = '生成一段' + currentItem.value[0].target + '，要求如下:'
  currentItem.value.forEach((element: any) => {
    generateStr += element.text + ':' + element.value + " "
  });
  localStorage.setItem("genStr", generateStr)
  rt.push('/')
}

// 点击弹窗
function handleClick(id: string) {
  api.get('/getTemplateById?id=' + id).then((res: any) => {
    currentItem.value = res.data
    prompt.value = true
  })
}

// 获取模板
function getTemplate() {
  api.get('/template').then((res: any) => {
    tempaltes.value = res.data
  })

}

// 获取分类
function getSrot() {
  api.get('/sort').then((res: any) => {
    sort.value = res.data
    getTemplate()
  })
}

</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  display: inline-block;
}
</style>
