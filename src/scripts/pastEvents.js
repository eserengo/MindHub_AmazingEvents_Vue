
const { createApp } = Vue

const App = createApp({
  data() {
    return {
      
    }
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
                  <a href="./pastEvents.html" aria-current="page" class="nav-link active fs-6"
                    style="color: rgb(214, 0, 100);">Past Events</a>
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
        <figure class="carousel-item active">
          <img src="../assets/optional_banner_3.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of a cathedral inside" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="../assets/optional_banner_4.jpg" class="d-block w-100 object-fit-cover"
            alt="An image of party lights" style="max-height: 320px;">
        </figure>
        <figure class="carousel-item">
          <img src="../assets/optional_banner_5.jpg" class="d-block w-100 object-fit-cover" alt="An image of a mic"
            style="max-height: 320px;">
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

      <h1 class="position-absolute top-50 start-50 translate-middle text-white" style="font-size: 64px;">Past Events</h1>
    </section>
  </header>

  <main>
    <nav class="navbar d-none" id="pastEventsNavBar">
      <div class="container-fluid">
        <div class="row w-100 d-flex flex-row align-items-center justify-content-between">
          <div class="col-6 col-md-8">

            <!-- Este es el elemento dentro del cual voy a generar las categorias de los eventos de forma dinamica -->
            <form class="d-flex flex-column flex-sm-row flex-wrap align-items-sm-start align-items-sm-center gap-1 gap-sm-3"
              action="#">
              <fieldset id="pastEventsCategoriesContainer">
                <legend class="fs-6 text-secondary">Filter events by category</legend>
              </fieldset>
            </form>

          </div>

          <div class="col-6 col-md-4">
            <form class="d-flex flex-column flex-sm-row" action="#" role="search">
              <input class="form-control mb-2 me-sm-2 mb-sm-0" type="search" id="search-input" placeholder="Search events by name"
                aria-label="Search">
              <button class="btn btn-outline-danger" type="submit" id="submit-input">Search</button>
            </form>
            <button class="btn btn-outline-secondary text-center float-end mt-2" id="clear-btn">clear search</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid p-2">

      <!-- Este es el elemento dentro del cual voy a generar las tarjetas de los eventos de forma dinamica -->
      <div class="row w-100" id="pastEventsCardsContainer"></div>

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