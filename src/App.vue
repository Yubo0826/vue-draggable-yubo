<script setup>
import dragItem from '@/components/drag-item.js'
import dragWrap from '@/components/drag-wrap.js'
</script>

<template>
    <div>
      <table class="table table-bordered">
        <!--props tag 因為傳字串所以不加冒號(加冒號是傳變數或methods) -->
        <thead>
          <drag-wrap :list="headers" tag="tr" @watchData="watchData">
            <drag-item v-for="header in headers" :key="header" tag="th">
              <template v-slot:drag>
                <div style="text-align: center;"><img src="./assets/bars-solid.svg" alt="" style="width: 15px;height: 15px;"></div>
              </template>
              <span>
                {{ header }}
              </span>
            </drag-item>
          </drag-wrap>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.number">
            <td v-for="(header, sindex) in headers" :key="sindex">
              {{ item[header] }}
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="test">test</button>
      <button @click="update">update</button>

      <!-- <drag-wrap :list="items" :tag="span">
        <drag-item v-for="(item, index) in items" :key="index" @watchData="watchData">
          <div style="width:100px;height:50px;border:1px solid black;margin-bottom:30px">
            {{ item.name }}
          </div>
        </drag-item>
      </drag-wrap> -->
      
      <div>
        <div v-for="(item, index) in headers" :key="item">{{index}}. {{item}}</div>
      </div>
    </div>
</template>

<script>
export default {
  components: {
    'drag-item': dragItem,
    'drag-wrap': dragWrap
  },
  data() {
    return {
      headers: ['number', 'name', 'sex', 'age', 'position'],
      items: [
        {
          number: 35,
          name: 'Durant',
          sex: 'male',
          age: 34,
          position: 'SF' 
        },
        {
          number: 23,
          name: 'James',
          sex: 'male',
          age: 37,
          position: 'SF' 
        },
        {
          number: 30,
          name: 'Curry',
          sex: 'male',
          age: 34,
          position: 'PG' 
        },
      ]
    }
  },
  mounted() {
    console.log(this.$el)
  },
  beforeUpdate() {
    console.log(this.headers)
  },
  updated() {
    console.log('更新囉')
  },
  methods: {
    watchData(newData) {
      this.headers = newData
      // 觸發畫面更新
      // this.headers.splice(this.headers.length)
    },
    test() {
      alert(this.headers)
    },
    update() {
      this.$forceUpdate()
    }
  }
}
</script>

<style>
.__drag_item {
  animation: shake .3s;
}
@keyframes shake {
  0% {
    transform: translate3d(-5%, 0, 0);
  }
  50% {
    transform: translate3d(5%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
