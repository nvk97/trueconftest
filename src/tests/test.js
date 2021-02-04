import { mount } from '@vue/test-utils'
import vTrafficLight from '@/components/v-traffic-light.vue'

const wrapper = mount(vTrafficLight,{
    propsData:{
        routeContext:'blue'
    }
})

