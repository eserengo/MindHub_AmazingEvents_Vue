const { createApp } = Vue

const App = createApp({
  data() {
    return {
      fetchedData: {},
      filterInput: [],
      searchInput: [],
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

    createEventsCards(inputArray) {
      document.querySelector(".card-wrapper") && document.querySelectorAll(".card-wrapper").forEach(item => item.remove());
      if (inputArray && !inputArray.length) {
        return `<h2 class="msg text-secondary text-center">Sorry, no events were found.</h2>`;
      }
      document.querySelector(".msg") && document.querySelector(".msg").remove();
      return inputArray && inputArray
        .map(event =>
          `
          <div key="${event._id}" class="card-wrapper col-12 col-sm-6 col-md-4 col-lg-3 my-2">
            <div class="card" style="min-height: 25rem">
              <figure class="m-0">
                <img src="${event.image}" alt="${event.category}" class="card-img-top object-fit-cover" style="height: 10rem;">
              </figure>
              <div class="card-body d-flex flex-column align-items-stretch justify-content-between">
                <h2 class="card-title fs-4 text-center">${event.name}</h2>
                <p class="card-text">${event.description}</p>
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                  <span class="card-text">Price: ${event.price}</span>
                  <a href="./src/pages/details.html?id=${event._id}" class="btn btn-outline-danger px-4" data-details="${event._id}">
                    Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        `)
        .join("")
    },

    setURLSearchParams(key, value, action) {
      const url = new URL(window.location.href);

      if (action == "delete") {
        const entries = url.searchParams.getAll(key).filter(item => item !== value);
        url.searchParams.delete(key);
        entries.map(item => url.searchParams.append(key, item));
      } else if (action == "set") {
        url.searchParams.delete(key);
        !value || url.searchParams.set(key, value);
      } else {
        url.searchParams.append(key, value);
      }

      window.history.pushState({ path: url.href }, "", url.href);
    },

    searching(event) {
      event.preventDefault();
      this.searchInput = [];
      this.searchInput.push(document.getElementById("search-input").value);
      this.setURLSearchParams("search", document.getElementById("search-input").value, "set");
    },

    clear() {
      this.searchInput = [];
      document.getElementById("search-input").value = "";
      this.setURLSearchParams("search", null, "set");
    },

    filtering(event) {
      this.filterInput.includes(event.target.value)
        ? (this.filterInput = this.filterInput.filter(subitem => subitem != event.target.value),
          this.setURLSearchParams("filter", event.target.value, "delete"))
        : (this.filterInput = [...this.filterInput, event.target.value],
          this.setURLSearchParams("filter", event.target.value, "append"));
    },
  },

  computed: {
    filteredData() {
      return this.fetchedData.events.filter(item => this.filterInput.find(subitem => subitem == item.category) !== undefined);
    },

    searchedData() {
      if (!this.filterInput.length) {
        return this.fetchedData.events.filter(item => {
          if (item.name.toLowerCase().includes(this.searchInput[0].toLowerCase())) return item;
        });
      }
      return this.filteredData.filter(item => {
        if (item.name.toLowerCase().includes(this.searchInput[0].toLowerCase())) return item;
      });
    },

    categories() {
      return this.fetchedData.events && Array.from(new Set(this.fetchedData.events.map(item => item.category)));
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
              <img src="./src/assets/amazing_brand.png" alt="Amazing Events brand logo" class="figure-img w-100 m-0 p-0">
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
                  <a href="./index.html" aria-current="page" class="nav-link active fs-6"
                    style="color: rgb(214, 0, 100);">Home</a>
                </li>
                <li class="nav-item">
                  <a href="./src/pages/upcomingEvents.html" class="nav-link fs-6">Upcoming Events</a>
                </li>
                <li class="nav-item">
                  <a href="./src/pages/pastEvents.html" class="nav-link fs-6">Past Events</a>
                </li>
                <li class="nav-item">
                  <a href="./src/pages/contact.html" class="nav-link fs-6">Contact</a>
                </li>
                <li class="nav-item">
                  <a href="./src/pages/stats.html" class="nav-link fs-6">Stats</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section id="carousel" class="carousel slide position-relative">
      <div class="carousel-inner">
        <figure class="carousel-item active">
          <img src="./src/assets/optional_banner_1.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a sushi dish" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="./src/assets/optional_banner_2.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a theather" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="./src/assets/optional_banner_3.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a cathedral inside" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="./src/assets/optional_banner_4.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of party lights" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="./src/assets/optional_banner_5.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a mic" style="max-height: 320px;">
        </figure>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

      <h1 class="position-absolute top-50 start-50 translate-middle text-white" style="font-size: 64px;">Home</h1>
    </section>
  </header>

  <main>
    <nav v-if="this.fetchedData.events" class="navbar">
      <div class="container-fluid">
        <div class="row w-100 d-flex flex-row align-items-center justify-content-between">
          <div class="col-6 col-md-8">

          <!-- Este es el elemento dentro del cual voy a generar las categorias de los eventos de forma dinamica -->
            <form
              class="d-flex flex-column flex-sm-row flex-wrap align-items-sm-start align-items-sm-center gap-1 gap-sm-3"
              action="#">
              <fieldset>
                <legend class="fs-6 text-secondary">Filter events by category</legend>
                <div v-for="(category, index) of categories" class="form-check form-check-inline" :key="index">
                  <input type="checkbox" class="form-check-input" :id="category" :value="category" name="$categories"
                    role="button" @click="filtering">
                  <label :for="category" class="form-check-label">{{ category }}</label>
                </div>
              </fieldset>
            </form>

          </div>

          <div class="col-6 col-md-4">
            <form class="d-flex flex-column flex-sm-row" action="#" role="search">
              <input class="form-control mb-2 me-sm-2 mb-sm-0" type="search" id="search-input" placeholder="Search events by name"
                aria-label="Search">
              <button class="btn btn-outline-danger" type="submit" @click="searching">Search</button>
            </form>
            <button class="btn btn-outline-secondary text-center float-end mt-2" @click="clear">clear search</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Este es el elemento dentro del cual voy a generar las tarjetas de los eventos de forma dinamica -->
    <div v-if="this.fetchedData.events" class="container-fluid p-2">

      <div v-if="!this.filterInput.length && !this.searchInput.length"
        class="row w-100" v-html="this.createEventsCards(this.fetchedData.events)"></div>

      <div v-else-if="this.filterInput.length && !this.searchInput.length"
        class="row w-100" v-html="this.createEventsCards(this.filteredData)"></div>

      <div v-else class="row w-100" v-html="this.createEventsCards(this.searchedData)"></div>
    </div>

    <div v-else class="container-fluid p-2">
      <h2 v-for="(value, key, index) in this.fetchedData" :key="index" class="text-center text-danger">{{ key }} {{ value }}</h2>
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
                  <img src="./src/assets/facebook.png" alt="facebook logo" class="figure-img m-0" role="button"
                    style="max-width: 32px; filter: grayscale(1);">
                </figure>
              </li>
              <li class="nav-item">
                <figure class="m-0 p-0">
                  <img src="./src/assets/instagram.png" alt="instagram logo" class="figure-img m-0" role="button"
                    style="max-width: 32px; filter: grayscale(1);">
                </figure>
              </li>
              <li class="nav-item">
                <figure class="m-0 p-0">
                  <img src="./src/assets/whatsapp.png" alt="whatsapp logo" class="figure-img m-0" role="button"
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
}).mount("#app")
