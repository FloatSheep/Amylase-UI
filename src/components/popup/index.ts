import { type ComponentPublicInstance, createApp, nextTick } from 'vue'
import PopupComponent from './Popup.vue'

type PopupComponentType = 'info' | 'warning' | 'error' | 'success'

interface PopupComponentExpose extends ComponentPublicInstance {
  close: () => void
}

const showPopupComponent = ({
  title = 'Info',
  type = 'info',
  content,
}: {
  title?: string
  type?: PopupComponentType
  content: string
}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const popupComponentApp = createApp(PopupComponent, { title, type, content })
  const popupComponentInstance = popupComponentApp.mount(container)

  nextTick(() => {
    setTimeout(() => {
      (popupComponentInstance as PopupComponentExpose).close()
      setTimeout(() => {
        popupComponentApp.unmount()
        document.body.removeChild(container)
      }, 100)
    }, 2800)
  })
}

export const Popup = () => showPopupComponent
