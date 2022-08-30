// ts模板，引用对象每次
import { provide, reactive } from 'vue'

export const allReactiveSource = () => {
  // 人员-管理人员
  const adminSourceRy = reactive({})

  // 人员-劳务人员
  const laborSourceRy = reactive({})

  return [
    adminSourceRy,
    laborSourceRy,  
  ]
}
// 数组解构
const allReactiveData = allReactiveSource()
const [
  adminSourceRy,
  laborSourceRy,
] = allReactiveData