<template>
  <div>
  
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      data: {
        show: false
      }
    };
  },
  methods: {
    showPopup() {
      this.show = true 
    },
    onClose() {
      this.show=false 
    }
  }
};
</script>
<style  scoped>
</style>