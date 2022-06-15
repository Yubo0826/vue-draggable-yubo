import {h, defineComponent} from 'vue'

const dragItemComponent = defineComponent({
    name: 'dragItem',
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    data() {
        return {
            isDrag: false
        }
    },
    render() {
      let slot = this.$slots.default ? this.$slots.default() : []
      let dragSlot = this.$slots.drag()
      if(dragSlot.length > 1) {
        throw '具名插槽只能有一個root node'
      }
      if(dragSlot[0].props === null) {
        dragSlot[0].props = {}
      }
      if(dragSlot[0].props.style !== null) {
        dragSlot[0].props.style.cursor = 'move'
      } else {
        dragSlot[0].props.style = {cursor: 'move'}
      }
      dragSlot[0].props.onMouseenter = () => {
        this.isDrag = true
      }
      dragSlot[0].props.onMouseleave = () => {
        this.isDrag = false
      }

        return h(
            this.tag,
            {
              ref: 'item',
              draggable: this.isDrag,
              style: {cursor: !this.$slots.drag ?'move' :''},
              class: '__drag_item',
              ondragstart: this.onDragstart,
              ondragenter: this.onDragenter,
              ondragend: this.onDragend
            },
            [
              dragSlot,
              slot
            ]
        )
    },
    mounted() {
        this.emitter.emit('putChild', this.$el)
      },
      methods: {
        onDragstart(event) {
          this.$el.style.opacity = "0.3"
          this.emitter.emit('dragstart', this.$el)
          // 修飾符 modifier
          event.stopPropagation()
        },
        onDragenter(event) {
          this.emitter.emit('dragenter', this.$el)
          event.stopPropagation()
        },
        onDragend(event) {
          this.$el.style.opacity = "1"
          this.emitter.emit('dragend')
          event.stopPropagation()
        }
      },  
})

export default dragItemComponent