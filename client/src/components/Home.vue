<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn text :to='`/movies/${movie._id}`'>{{ movie.name }}
              </v-btn>
              </div>
            <span class="grey--text">{{ movie.release_year }} . {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <v-card-text>{{ movie.description }}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    movies: [],
  }),
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const token = window.localStorage.getItem('auth');
      this.axios
        .get('http://localhost:8081/movies', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((response) => {
          this.movies = response.data.movies;
          this.current_user = response.data.current_user;
        })
        .catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
