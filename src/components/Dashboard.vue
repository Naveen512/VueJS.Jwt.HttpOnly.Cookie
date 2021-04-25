<template>
  <div>
    <h4>Welcome to your dashboard page {{getUserProfile.firstName}} {{getUserProfile.lastName}}!</h4>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", {
      getUserProfile: "getUserProfile",
    }),
  }
};
</script>
