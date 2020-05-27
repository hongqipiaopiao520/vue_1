<template>
    <div>
        <p @click="jumpToAbout">xinzeng</p>
        <div id="app">
                       <p><input type="text" v-model="message"></p>
                      <p>
                            <!--click事件直接绑定一个方法-->
                            <button v-on:click="teng">我</button>
                        </p>
                      <p>
                          <!--click事件使用内联语句-->
                            <button v-on:click="say('帅！')">帅</button>
                        </p>
                    </div>
    </div>
</template>
<script>
    export default {
    data() {
       return {
           message: "hyj",
           name: "111",
       }
    },
        methods: {
            jumpToAbout() {
                this.$router.push('/about');
            },
            teng() {
                alert(this.message)
            },
            say(msg) {
                alert(msg)
            }
        }
    }
</script>
<style>

</style>