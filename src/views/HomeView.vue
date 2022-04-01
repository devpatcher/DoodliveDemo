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
          <perfect-scrollbar
            class="chat-view-content"
            ref="chatbox"
            @ps-scroll-y="onScroll"
            :style="{'max-height': `${chatBoxHeight}px`}"
          >
            <div v-for="comment in comments" :key="comment.id">
              <CommentItem :id="comment.id" :avatar="comment.avatar" :user="comment.user" :msg="comment.comment"></CommentItem>
            </div>
          </perfect-scrollbar>
          <div class="row chat-view-bottom" ref="chatBottom">
            <input
              class="col-9 chat-view-bottom-input"
              placeholder="Message"
              autocomplete="off"
              type="text"
              id="message"
              v-model="message"
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
  import CommentItem from './CommentItem.vue';
  export default {
    components: { 
      CommentItem
    },
    data() {
        return {
            options: reactive({
                width: "100%",
                height: "100%",
                autoPlay: true,
                loop: true,
                src: "https://stream.mux.com/AHtNUiG600zlYSjecA5Nnp6OPitww802KLUnX023WnL118.m3u8",
                type: "m3u8",
            }),
            message: "",
            comments: [
                {
                    id: 1,
                    user: 'Konstantin_Alonov',
                    comment: "Hey mate! How’s going? I think it’s great idea to collaborate with you.",
                },
                {
                    id: 2,
                    user: 'Xayoo_',
                    comment: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound  the actual teachings.",
                },
                {
                    id: 3,
                    user: 'LCS',
                    comment: "Yeah man, you will have the verified on the new platform. This is the old one",
                },
                {
                    id: 4,
                    user: 'Konstantin_Alonov',
                    comment: "Hey mate! How’s going? I think it’s great idea to collaborate with you.",
                },
            ],
            chatHeight: 0,
        };
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
    updated() {
        this.scrollChatToBottom();
    },
    computed: {
        chatBoxHeight(): any {
            return this.chatHeight;
        },
    },
    methods: {
        handleSend(e: any) {
            this.comments.push({ id: this.comments.length + 1, user: 'Dummy', comment: this.message });
            setTimeout(() => {
                this.scrollChatToBottom();
            }, 300);
        },
        onPlay() {
            this.resizeChatBox();
        },
        onCanplay() {
            this.resizeChatBox();
        },
        onScroll() {
            console.log("onScroll");
        },
        resizeChatBox(e: any) {
            let videoBoxHeight = this.$refs.videoBox.clientHeight;
            let chatTopHeight = this.$refs.chatTop.clientHeight;
            let chatBottomHeight = this.$refs.chatBottom.clientHeight;
            const chatHeight = videoBoxHeight - chatTopHeight - chatBottomHeight - 60;
            this.chatHeight = chatHeight;
        },
        scrollChatToBottom() {
            const chatBox = this.$refs.chatbox;
            //chatBox.scrollTop = chatBox.scrollHeight; //use this code in case of not using perfect-scrollbar
            chatBox.$el.scrollTop = chatBox.$el.scrollHeight;
        },
    },
}
</script>