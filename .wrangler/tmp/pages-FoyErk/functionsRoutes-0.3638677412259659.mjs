import { onRequestOptions as __api_contact_created_js_onRequestOptions } from "D:\\Qevrix\\qevrix_frontend\\functions\\api\\contact\\created.js"
import { onRequestPost as __api_contact_created_js_onRequestPost } from "D:\\Qevrix\\qevrix_frontend\\functions\\api\\contact\\created.js"

export const routes = [
    {
      routePath: "/api/contact/created",
      mountPath: "/api/contact",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contact_created_js_onRequestOptions],
    },
  {
      routePath: "/api/contact/created",
      mountPath: "/api/contact",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_created_js_onRequestPost],
    },
  ]