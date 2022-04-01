<template>
  <div class="comment">
    <div>
      <img alt="avatar" :src="getAvatar" class="comment-avatar">
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
      getAvatar() {
        const url = this.avatar;

        return url ? url : 'src/assets/avatar.png';
      },
    },
    methods: {
    }
  }
</script>