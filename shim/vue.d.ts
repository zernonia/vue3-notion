declare module "*.vue" {
  import { defineComponent } from "vue"
  export const component: ReturnType<typeof defineComponent>
}
