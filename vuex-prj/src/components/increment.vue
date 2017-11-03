<template>
    <div>
        <button @click="addOneFun">+1</button>
        <button @click="subOneFun">-1</button>
    </div>
</template>

<script>
 export default {
    data () {
      return {

      }
    },
    methods: {
      addOneFun(){
        this.$store.commit('addOne')
      },
      subOneFun(){
        this.$store.commit('subOne')

      }
    },
    created(){

    }
 }
</script>

<style scoped>
    button  {
        width: 100px;
        height: 100px;
        font-size: 30px;
    }
</style>