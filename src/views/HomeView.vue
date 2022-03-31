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
        <div class="video-view" ref="videoBox">
          <vue3VideoPlay v-bind="options" @play="onPlay" @canplay="onCanplay"/>
        </div>
      </div>
      <div class="col-12 col-lg-3 home-right">
        <div class="chat-view">
          <div class="chat-view-top">
            <div class="chat-view-top-title" ref="chatTop">
              Chat
            </div>
            <div class="chat-view-top-badge">
              LIVE
            </div>
          </div>
          <div class="chat-view-content"
            :style="{'height': `${chatBoxHeight}px`}">
            <div class="result" v-for="comment in comments" :key="comment.id">
              <div>{{ comment.email }}</div>
              <div>{{ comment.id }}</div>
            </div>
            <InfiniteLoading :comments="comments" @infinite="load" />
          </div>
          <div class="row chat-view-bottom" ref="chatBottom">
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
  import { ref } from 'vue';
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
        }),
        comments: [
          {
            id: 1,
            email: 'test',
          },
          {
            id: 2,
            email: 'team',
          },
          {
            id: 3,
            email: 'team',
          },
          {
            id: 4,
            email: 'team',
          },
          {
            id: 5,
            email: 'team',
          },
          {
            id: 6,
            email: 'team',
          },
          {
            id: 7,
            email: 'team',
          },
          {
            id: 8,
            email: 'team',
          },
          {
            id: 9,
            email: 'team',
          },
          {
            id: 10,
            email: 'team',
          },
        ],
        chatHeight: 0,
      }
    },
    mounted() {
      this.resizeChatBox();
    },
    created() {
      window.addEventListener("resize", this.resizeChatBox);
    },
    destroyed() {
      window.removeEventListener("resize", this.resizeChatBox);
    },
    computed: {
      chatBoxHeight(): any {
        return this.chatHeight;
      },
    },
    methods: {
      handleSend(e: any) {
        console.log('handleSend');
      },
      load() {
        console.log('load');
      },
      onPlay() {
        this.resizeChatBox();
      },
      onCanplay() {
        this.resizeChatBox();
      },
      resizeChatBox(e: any) {
        let videoBoxHeight = this.$refs.videoBox.clientHeight;
        let chatTopHeight = this.$refs.chatTop.clientHeight;
        let chatBottomHeight = this.$refs.chatBottom.clientHeight;
        const chatHeight = videoBoxHeight - chatTopHeight - chatBottomHeight - 45;
        this.chatHeight = chatHeight;
      }
    }
  }
</script>