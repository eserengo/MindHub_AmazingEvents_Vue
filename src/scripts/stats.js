const { createApp } = Vue

const App = createApp({
  data() {
    return {
      fetchedData: {},  
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

  computed: {
    pastEventsArray() {
      return this.fetchedData.events && this.fetchedData.events.filter(item => item.date <= this.fetchedData.currentDate);
    },

    upcomingEventsArray() {
      return this.fetchedData.events && this.fetchedData.events.filter(item => item.date > this.fetchedData.currentDate);
    },

    highestPercentageOfAssistance() {
      const percentage = (inputItem) => ((parseInt(inputItem.assistance) * 100) / parseInt(inputItem.capacity)).toFixed(2);
      let highestValue = 0;
      let highestName = "";

      this.fetchedData.events && this.pastEventsArray
        .map(item => {
          if (percentage(item) > highestValue) {
            highestValue = percentage(item);
            highestName = item.name;
          }
        });

      return `${highestName}: ${highestValue}%`;
    },

    lowestPercentageOfAssistance() {
      const percentage = (inputItem) => ((parseInt(inputItem.assistance) * 100) / parseInt(inputItem.capacity)).toFixed(2);
      let lowestValue = 100;
      let lowestName = "";

      this.fetchedData.events && this.pastEventsArray
        .map(item => {
          if (percentage(item) < lowestValue) {
            lowestValue = percentage(item);
            lowestName = item.name;
          }
        });

      return `${lowestName}: ${lowestValue}%`;
    },

    eventWithLargestCapacity() {
      let largestValue = 0;
      let largestName = "";

      this.fetchedData.events && this.fetchedData.events
        .map(item => {
          if (item.capacity > largestValue) {
            largestValue = item.capacity;
            largestName = item.name;
          }
        });

      return `${largestName}: ${largestValue.toLocaleString()}`;
    },

    setPastEventsTable() {
      const outputArray = [];

      const categories = Array.from(new Set(this.pastEventsArray.map(item => item.category)));

      categories.map(item => {

        const sortByCategory = this.pastEventsArray.filter(event => event.category == item);

        const revenuesPerCategory = sortByCategory
          .reduce(
            (acc, event) => acc + event.price * (event.assistance ? event.assistance : event.estimate), 0
          );

        const percentageOfAssistance = (sortByCategory
          .reduce(
            (acc, event) => acc + ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100, 0
          ) / sortByCategory.length)
          .toFixed(2);

        outputArray.push({
          event: item,
          revenues: revenuesPerCategory,
          percentage: percentageOfAssistance,
        });
      })

      return outputArray;
    },

    setUpcomingEventsTable() {
      const outputArray = [];

      const categories = Array.from(new Set(this.upcomingEventsArray.map(item => item.category)));

      categories.map(item => {

        const sortByCategory = this.upcomingEventsArray.filter(event => event.category == item);

        const revenuesPerCategory = sortByCategory
          .reduce(
            (acc, event) => acc + event.price * (event.assistance ? event.assistance : event.estimate), 0
          );

        const percentageOfAssistance = (sortByCategory
          .reduce(
            (acc, event) => acc + ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100, 0
          ) / sortByCategory.length)
          .toFixed(2);

        outputArray.push({
          event: item,
          revenues: revenuesPerCategory,
          percentage: percentageOfAssistance,
        });
      })

      return outputArray;
    },
  },

  created() {
    this.fetchData();
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
                  <a href="./stats.html" aria-current="page" class="nav-link active fs-6"
                    style="color: rgb(214, 0, 100);">Stats</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section id="carousel" class="carousel slide position-relative">
      <div class="carousel-inner">
        <figure class="carousel-item">
          <img src="../assets/optional_banner_1.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a sushi dish" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="../assets/optional_banner_2.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a theather" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="../assets/optional_banner_3.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a cathedral inside" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="../assets/optional_banner_4.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of party lights" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item active">
          <img src="../assets/optional_banner_5.jpg" class="d-block w-100 object-fit-cover"
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

      <h1 class="position-absolute top-50 start-50 translate-middle text-white" style="font-size: 64px;">Stats</h1>
    </section>
  </header>

  <main>

    <!-- Este es el elemento dentro del cual voy a generar las tablas de forma dinamica -->
    <div class="container-fluid" v-if="this.fetchedData.events">
    
      <div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Event Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col-4">Event with highest % of assistance</td>
                <td class="col-4">Event with lowest % of assistance</td>
                <td class="col-4">Event with largest capacity</td>
              </tr>
              <tr>
                <td class="text-secondary">{{this.highestPercentageOfAssistance}}</td>
                <td class="text-secondary">{{this.lowestPercentageOfAssistance}}</td>
                <td class="text-secondary">{{this.eventWithLargestCapacity}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Past Events statistics by category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col-4">Categories</td>
                <td class="col-4">Revenues</td>
                <td class="col-4">Percentage of assistance</td>
              </tr>
              <tr v-for="(object, index) in this.setPastEventsTable" :key="index">
                <td class="text-secondary">{{object.event}}</td>
                <td class="text-secondary">$ {{object.revenues.toLocaleString()}}</td>
                <td class="text-secondary">{{object.percentage}} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Upcoming Events statistics by category</th>
              </tr>
            </thead>
            <tbody id="thirdTableBody">
              <tr>
                <td class="col-4">Categories</td>
                <td class="col-4">Revenues (estimated)</td>
                <td class="col-4">Percentage of assistance (estimated)</td>
              </tr>
              <tr v-for="(object, index) in this.setUpcomingEventsTable" :key="index">
                <td class="text-secondary">{{object.event}}</td>
                <td class="text-secondary">$ {{object.revenues.toLocaleString()}}</td>
                <td class="text-secondary">{{object.percentage}} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <div class="container-fluid p-2" v-else>
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