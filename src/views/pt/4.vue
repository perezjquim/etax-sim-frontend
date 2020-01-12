<template>
  <div>
    
    <p>{{ strategy.name }}</p>
      <button v-on:click="onSubmit">Test</button>
    
  </div>
</template>

<script>
import FormHelper from '../../common/helpers/FormHelper';

export default {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                FormHelper.onBeforeRouteEnter(vm);
            })
        },        
    data() {
        return {
         strategy: {}
        }
    },
    methods:
    {
      onSubmit: function()
      {
          FormHelper.onSubmit(this, {test: 1, test2: 2});
      }
    }    
}
</script>
