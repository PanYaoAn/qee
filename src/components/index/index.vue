<template>
  <div>
    111111111111111111111
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