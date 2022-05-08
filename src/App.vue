<template>
<div>
  <NavBar/>
  <router-view/>
</div>

</template>
<script>
import NavBar from "@/components/NavBar"
// import SpinnerC from "./components/SpinnerC.vue"
export default {
  components : { NavBar }
}
</script>

<style>

</style>
