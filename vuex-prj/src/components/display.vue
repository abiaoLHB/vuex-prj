<template>
    <div>
        <h3>Count is {{count}}</h3>
    </div>
</template>

<script>
import {mapState} from 'vuex'; // 引入mapState

  export default {
    // 简单原始写法
    computed: {
        count () {
            return this.$store.state.count
        }
    }


    }
</script>

<style scoped>
    h3 {
        font-size: 30px;
    }
</style>