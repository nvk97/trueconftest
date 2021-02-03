<template>
  <div class="container">
    <vTrafficLight :routeContext="routeContext" :totalTicks="totalTicks" :toRedirect="toRedirect"/>
  </div>
</template>
<script>
import vTrafficLight from "@/components/v-traffic-light";
export default {
  props: {                      //Принимаю пропсы при переходе на роут и кидаю их в копмпонент
    routeContext: {
      type: String,
      required: true,
    },
    totalTicks:{
      type:Number,
      required:true
    },
    toRedirect:{
      type: String,
      required: true,
    }
  },
  components: {
    vTrafficLight,
  },
};
</script>

