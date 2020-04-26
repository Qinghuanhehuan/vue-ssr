<template>
  <div>
    <h2>Index</h2>
    <p>num:{{$store.state.count}}</p>
    <button @click="$store.commit('add')">add</button>
  </div>
</template>
<script>
export default {
  name:'index'
}
</script>
