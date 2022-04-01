<template>
  <title>Login</title>
  <div class="logoutModal" v-if="isLogout" v-on:click.stop>
    <a href="#" class="float-right" :style="{'left': `${logoutIconX}px`, top: `${logoutIconY}px`, position: 'absolute'}">
      <img alt="Logo" :src="getAvatarUrl" class="avatar">
    </a>
    <button class="btn btn-primary logout-button" @click="handleLogout" :style="{'left': `${logoutIconX - 150}px`, top: `${logoutIconY}px`, position: 'absolute'}">
      Logout
    </button>
  </div>
  <nav>
    <a href="/">
      <img alt="Logo" src="../assets/logo.png" :class="getLogoClass">
    </a>
    <a href="#" class="float-right" @click="showLogoutModal" v-if="!isLogout">
      <img alt="Logo" :src="getAvatarUrl" class="avatar" ref="logoutIcon">
    </a>
  </nav>
  <div :class="getContainerClass">
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
            :style="{'height': `${chatBoxHeight}px`}"
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
              v-on:keyup.enter="onEnter"
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
  import { mapActions, mapGetters } from "vuex";
  import { reactive } from 'vue';
  import CommentItem from './CommentItem.vue';
  const db = firebase.database();
  const fetchChat = db.ref("messages/");
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
            isLogout: false,
            message: "",
            comments: [
            ],
            chatHeight: 0,
            logoutIconX: 0,
            logoutIconY: 0,
        };
    },
    mounted() {
        this.resizeChatBox();
        fetchChat.on("child_added", this.addChat);
    },
    created() {
        window.addEventListener("resize", this.onResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
    updated() {
        this.scrollChatToBottom();
    },
    computed: {
      ...mapGetters(['getUser', 'getAvatar']),
        chatBoxHeight(): any {
          return this.chatHeight;
        },
        getLogoClass(): String {
          return this.isLogout ? 'logo blur' : 'logo';
        },
        getContainerClass(): String {
          return this.isLogout ? 'container blur' : 'container';
        },
        logoutIconX(): number {
          return this.logoutIconX;
        },
        logoutIconY(): number {
          return this.logoutIconY;
        },
        getAvatarUrl(): String {
          const url = this.$store.getters.getAvatar;

          return url ? url : 'src/assets/avatar.png';
        },
    },
    methods: {
      ...mapActions(["signOutAction"]),
      ...mapGetters(['getUser', 'getAvatar']),
      showLogoutModal(e: any) {
        this.isLogout = true;
        if (this.$refs.logoutIcon) {
          const rect = this.$refs.logoutIcon.getBoundingClientRect();
          this.logoutIconX = rect.x - rect.width + 3;
          this.logoutIconY = rect.y - rect.height + 3;
        }
      },
      handleLogout(e: any) {
        this.signOutAction();
      },
      handleSend(e: any) {
        const timestamp = Date.now();
        const url = this.$store.getters.getAvatar;
        const name = this.$store.getters.getUser;
        const message = this.message;

        if (!name) {
          return;
        }
        if (!message) {
          return;
        }
        db.ref("messages/" + timestamp).set({
          user: name,
          avatar: url,
          msg: message,
        });
        this.message = '';
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
      onResize() {
        this.resizeChatBox();
      },
      onEnter() {
        this.handleSend();
      },
      resizeChatBox(e: any) {
        if (!this.$refs.videoBox || !this.$refs.chatTop || !this.$refs.chatBottom) {
          return;
        }
        let videoBoxHeight = this.$refs.videoBox.clientHeight;
        let chatTopHeight = this.$refs.chatTop.clientHeight;
        let chatBottomHeight = this.$refs.chatBottom.clientHeight;
        const chatHeight = videoBoxHeight - chatTopHeight - chatBottomHeight - 60;
        this.chatHeight = chatHeight;
      },
      scrollChatToBottom() {
          const chatBox = this.$refs.chatbox;
          //chatBox.scrollTop = chatBox.scrollHeight; //use this code in case of not using perfect-scrollbar
          if (chatBox && chatBox.$el) {
            chatBox.$el.scrollTop = chatBox.$el.scrollHeight;
          }
      },
      addChat(snapshot: firebase.database.DataSnapshot) {
        const snap = snapshot.val();

        this.comments.push({
          id: this.comments.length + 1,
          user: snap.user,
          avatar: snap.avatar,
          comment: snap.msg,
        });
        setTimeout(() => {
          this.scrollChatToBottom();
        }, 300);
      },
    },
}
</script>