import { ref } from "vue";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
// 菜单数据
export let menu: any = ref([
  {
    icon: 'home', label: '主页', id: 1, isopen: true, children: [
      { link: 'Chat', icon: 'forum', desc: '聊天', id: 4, },
      { link: 'Template', icon: 'category', desc: '模板', id: 5 },
      { link: 'User', icon: 'person', desc: '关于', id: 10 }
    ]
  }
])
