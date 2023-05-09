<template>
  <div id="app">
    <router-view :key="$route.params.id?.toString()"></router-view>
  </div>
</template>
