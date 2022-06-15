import {h, defineComponent} from 'vue'

const drapWrapComponent = defineComponent({
    name: 'dragWrap',
    props: {
        list: {
            type: Array
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    emits: ['watchData'],
    data() {
        return {
            fromDom: null,
            toDom: null,
            children: [],
            origin_list: [],
        }
    },
    render() {
        try {
            // ES6 解構賦值
            const { $slots, tag } = this;
            return h(
                tag, 
                {
                    ref: 'wrap',
                    ondragenter: event => {
                        event.preventDefault()
                    },
                    ondragover: event => {
                        event.preventDefault()
                    }
                }, 
                $slots.default()
                )
        } catch (err) {
            return h('pre', {style: {color: 'red'}}, err.stack)
        }
    },
    created() {
        this.emitter.on('dragstart', this.onDragstart)
        this.emitter.on('dragenter', this.onDragenter)
        this.emitter.on('dragend', this.onDragend)
        this.emitter.on('putChild', child => {
            this.children.push(child)
            console.log(child)
        })
        this.origin_list = this.list
        console.log(this.origin_list);
    },
    methods: {
        onDragstart(el) {
            this.fromDom = el
            console.log('拿起' + this.fromDom.innerHTML)
        },
        onDragenter(el) {
            this.toDom = el
            if(this.toDom === this.fromDom) return
            console.log('進入到' + this.toDom.innerHTML)
            // 判斷進入node是否在起始node前面
            if(this.isPrevNode(this.fromDom, this.toDom)) {
                // 把參數一放在參數二前面
                console.log('交換');
                this.$refs.wrap.insertBefore(this.fromDom, this.toDom)
            } else {
                console.log('交換');
                this.$refs.wrap.insertBefore(this.fromDom, this.toDom.nextSibling)
            }
        },
        onDragend() {
            // this.$emit('watchData', this.list)
            console.log('執行onDragend')
            if(!this.list.length) return
            // this.$el.children是偽陣列
            // 獲取drag-item的Dom
            console.log(this.$el.children);
            const realDomOrder = [...this.$el.children].filter(child => 
                child.classList.contains('__drag_item')
            )
            this.getDataOrder(realDomOrder, this.children)
        },
        // to是否在from的前面
        isPrevNode(from, to) {
            while(from.previousSibling != null) {
                if(from.previousSibling === to) {
                    return true
                }
                from = from.previousSibling
            }
        },
        getDataOrder(realList, originList) {
            // 拿到打亂item的index
            console.log(realList);
            console.log(originList);
            const order = realList.map(realItem => {
                return originList.findIndex(dragItem => realItem === dragItem)
            })
            console.log(order);
            const newData = []
            order.forEach((item, i) => {
                newData[i] = this.origin_list[item]
            })
            console.log(newData);
            this.$emit('watchData', newData)
        }
    },

})

export default drapWrapComponent