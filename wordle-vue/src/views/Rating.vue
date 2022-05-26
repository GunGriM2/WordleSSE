<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="15"
    class="elevation-0"
    style="width: 60%; margin: 0 auto"
    sort-desc="rating"
  >

  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserService from '@/services/UserService';

@Component
export default class Rating extends Vue {

  async mounted() {
    try {
      const response = await UserService.getAll();

      this.users = response.data.map((object: {
        "user_name": string,
        "user_tries": number,
        "user_1": number,
        "user_2": number,
        "user_3": number,
        "user_4": number,
        "user_5": number,
        "user_6": number,
        "user_current_streak": number
        "user_max_streak": number
      }) => {
        return {...object,
          win_percent: Math.ceil((object.user_1 + object.user_2  + object.user_3 + object.user_4
              + object.user_5  + object.user_6)/object.user_tries * 100) ?
              String(Math.ceil((object.user_1 + object.user_2  + object.user_3  + object.user_4
              + object.user_5  + object.user_6)/object.user_tries * 100)) + '%' : '0%',
          rating: object.user_1 * 6
          + object.user_2 * 5 + object.user_3 * 4 * object.user_4 * 3
          + object.user_5 * 2 + object.user_6 * 1 + object.user_max_streak * 3
        };
      });
    } catch (e) {

    }

  }

  headers: Array<{}> =[
    {
      text: 'Username',
      align: 'start',
      sortable: false,
      value: 'user_name',
    },
    { text: 'Plays', value: 'user_tries' },
    { text: 'Win Percentage', value: 'win_percent' },
    { text: 'Current Streak', value: 'user_current_streak' },
    { text: 'Max Streak', value: 'user_max_streak' },
    { text: 'Rating', value: 'rating' }
  ]
  users: Array<{}> = []

}
</script>

<style scoped>

</style>