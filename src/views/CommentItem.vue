<template>
  <div class="comment">
    <div>
      <img alt="avatar" src="../assets/avatar.png" class="comment-avatar">
    </div>
    <div class="comment-msg">
      <mark>{{ this.user }}: </mark>
      {{ this.msg }}
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['id', 'avatar', 'user', 'msg'],
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>