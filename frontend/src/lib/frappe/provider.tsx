import { FrappeProvider as Provider } from 'frappe-react-sdk'
import React, { PropsWithChildren } from 'react'

export default function FrappeProvider({ children }: PropsWithChildren) {
  
  const getSiteName = () => {
    if (
      // @ts-ignore
      window.frappe?.boot?.versions?.frappe &&
      // @ts-ignore
      (window.frappe.boot.versions.frappe.startsWith('15') ||
        // @ts-ignore
        window.frappe.boot.versions.frappe.startsWith('16'))
    ) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME
  }
  // console.log("FRAPPE PROVIDER");
  
  return (
    <Provider
      // url={import.meta.env.VITE_FRAPPE_PATH ?? ""}
      // url="http://192.168.0.55"
      enableSocket={false}
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      siteName={getSiteName()}
    >

      {children}
    </Provider>
  )
}
