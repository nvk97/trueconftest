<template>
    <div class="timer">{{ticksRemain}}</div>
</template>

<script>
export default {
    props:['ticksRemain']
}
</script>
<style lang="scss" scoped>
.timer{
    margin-right: -70px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width:50px;
    font-size: 20px;
    height: 30px;
    background: #363636;
    border-radius: 10%;
    color:#fff;
}
</style>