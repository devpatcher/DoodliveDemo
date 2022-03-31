<template>
  <title>Login</title>
  <nav>
    <a href="/">
      <img alt="Logo" src="../assets/logo.png" class="logo">
    </a>
    <a href="#" class="float-right">
      <img alt="Logo" src="../assets/avatar.png" class="avatar">
    </a>
  </nav>
  <div class="container">
    <div class="row justify-content-center home">
      <div class="col-12 col-lg-9 home-left">
        <div class="video-view">
          <vue3VideoPlay v-bind="options"/>
        </div>
      </div>
      <div class="col-12 col-lg-3 home-right">
        <div class="chat-view">
          <div class="chat-view-top">
            <div class="chat-view-top-title">
              Chat
            </div>
            <div class="chat-view-top-badge">
              LIVE
            </div>
          </div>
          <div class="chat-view-content">
            <div class="result" v-for="comment in comments" :key="comment.id">
              <div>{{ comment.email }}</div>
              <div>{{ comment.id }}</div>
            </div>
            <InfiniteLoading :comments="comments" @infinite="load" />
          </div>
          <div class="row chat-view-bottom">
            <input
              class="col-9 chat-view-bottom-input"
              placeholder="Message"
              autocomplete="off"
              type="text"
            >
            <button class="col-3 btn btn-primary chat-view-bottom-send" @click="handleSend">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import firebase from "firebase";
  import router from '../router';
  import { reactive } from 'vue';
  // @ts-ignore
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots
  export default {
    data() {
      return {
        options: reactive({
          width: '100%',
          height: '100%',
          autoPlay: true,
          loop: true,
          src: "https://stream.mux.com/AHtNUiG600zlYSjecA5Nnp6OPitww802KLUnX023WnL118.m3u8",
          type: 'm3u8',
        })
      }
    },
    methods: {
      handleSend(event: any) {
        console.log('handleSend');
      }
    }
  }
</script>