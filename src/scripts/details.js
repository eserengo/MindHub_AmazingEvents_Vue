
const { createApp } = Vue

const App = createApp({
  data() {
    return {
      fetchedData: {},
      params: new URLSearchParams(location.search),
    }
  },

  methods: {
    async fetchData() {
      try {
        const res = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
        if (res.ok) {
          const json = await res.json();
          return this.fetchedData = json;
        }
        throw new Error(res.status);
      } catch (err) {
        return this.fetchedData = { error: err.message };
      }
    },
  },

  created() {
    this.fetchData()
  },

  template: `
    <header class="p-2">
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <div class="row w-100 g-0 align-items-center justify-content-between">
          <div class="col-6 col-sm-3 col-lg-2">
            <figure class="navbar-brand m-0 p-0">
              <img src="../assets/amazing_brand.png" alt="Amazing Events brand logo" class="figure-img w-100 m-0 p-0">
            </figure>
          </div>
          <div class="col-2 col-sm-8 col-lg-6">
            <button type="button" class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbar"
              aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse w-100 justify-content-sm-end" id="navbar">
              <ul
                class="navbar-nav d-flex flex-column flex-sm-row flex-nowrap align-items-center justify-content-between">
                <li class="nav-item">
                  <a href="../../index.html" class="nav-link fs-6">Home</a>
                </li>
                <li class="nav-item">
                  <a href="./upcomingEvents.html" class="nav-link fs-6">Upcoming Events</a>
                </li>
                <li class="nav-item">
                  <a href="./pastEvents.html" class="nav-link fs-6">Past Events</a>
                </li>
                <li class="nav-item">
                  <a href="./contact.html" class="nav-link fs-6">Contact</a>
                </li>
                <li class="nav-item">
                  <a href="./stats.html" class="nav-link fs-6">Stats</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main>

    <!-- Este es el elemento dentro del cual voy a generar la tarjeta de detalles de forma dinámica -->
    <div v-for="(event, index) of fetchedData.events" :key="index" class="m-4" id="detailsContainer">
      <div v-if="event._id == params.get('id')" class="card">
          <div class="card-body container-fluid">
            <div class="row w-100 m-0 d-flex flex-column flex-wrap flex-sm-row">
              <figure class="col col-sm-12 col-md-6 col-lg-8 m-0">
                <img :src="event.image" :alt="event.category" class="card-img object-fit-cover h-100">
              </figure>
              <div class="col col-sm-12 col-md-6 col-lg-4">
                <h2 class="card-title fs-4 text-center mt-2 mt-sm-0">{{ event.name }}</h2>
                <p class="card-text">Date: {{ event.date }}</p>
                <p class="card-text">Description: {{ event.description }}</p>
                <p class="card-text">Category: {{ event.category }}</p>
                <p class="card-text">Place: {{ event.place }}</p>
                <p class="card-text">Capacity: {{ event.capacity }}</p>
                <p class="card-text">Assistance or Estimate: {{ event.assistance ? event.assistance : event.estimate }}</p>
                <p class="card-text">Price: {{ event.price }}</p>
              </div>
            </div>
          </div>
        </div>
    </div>

  </main>

  <footer class="p-2">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <div class="row w-100 g-0 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between">
          <div class="col col-sm-2">
            <ul class="navbar-nav d-flex flex-row flex-nowrap align-items-center justify-content-start gap-2">
              <li class="nav-item">
                <figure class="m-0 p-0">
                  <img src="../assets/facebook.png" alt="facebook logo" class="figure-img m-0" role="button"
                    style="max-width: 32px; filter: grayscale(1);">
                </figure>
              </li>
              <li class="nav-item">
                <figure class="m-0 p-0">
                  <img src="../assets/instagram.png" alt="instagram logo" class="figure-img m-0" role="button"
                    style="max-width: 32px; filter: grayscale(1);">
                </figure>
              </li>
              <li class="nav-item">
                <figure class="m-0 p-0">
                  <img src="../assets/whatsapp.png" alt="whatsapp logo" class="figure-img m-0" role="button"
                    style="max-width: 32px; filter: grayscale(1);">
                </figure>
              </li>
            </ul>
          </div>
          <div class="col col-sm-4 text-center text-sm-end">
            <p class="fs-6 m-0">AP Desarrollo Web 14 TN</p>
          </div>
        </div>
      </div>
    </nav>
  </footer>`
}).mount('#app')
