<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  created(){
    this.$router.push('/red')//Редирект на нужные роуты при открытии домашней страницы
  }
}
</script>
