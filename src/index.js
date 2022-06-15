import dragItem from "./components/drag-item.js"
import dragWrap from "./components/drag-wrap.js"

const Components = [
    dragItem, dragWrap
]

const install = function(Vue, options = {}) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install
}