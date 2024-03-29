//! The ready function executes the code after the DOM is fully loaded
$().ready(() => {
  const API_URL = "http://localhost:8000"; // Replace by your own API URL in production mode

  //* Elevator button
  function handleElevatorBtn() {
    const button = $("#button-top");

    $(window).scroll(showElevatorBtn);
    function showElevatorBtn() {
      if ($(window).scrollTop() > 200) {
        button.css("display", "block");
      } else {
        button.css("display", "none");
      }
    }

    button.click(goToTop);
    function goToTop() {
      $(document.body).scrollTop(0);
      $(document.documentElement).scrollTop(0);
    }
  }
  handleElevatorBtn();

  //* Display list of all countries
  async function showAllCountries() {
    let result;

    result = await $.ajax({
      url: `${API_URL}/all`,
      success: populateCountryInfo,
      error: (error) => {
        console.log(error);
        alert("A problem occured. Come back later.");
      },
    });
    return result;
  }
  showAllCountries();

  //* Handle error message when no data found
  function handleNoDataFound() {
    alert(
      "No data found. First, make sure you entered a valid name or picked the right category or selected a region. If so, come back later."
    );

    $("form")[0].reset();

    $(".errorMsg").css("display", "none");

    $("#name").prop("disabled", false);
  }

  //* Populate countries info
  function populateCountryInfo(data) {
    if (data.length === 0) {
      handleNoDataFound();
      showAllCountries();
    }

    // Generate list dynamically
    for (i = 0; i < data.length; i++) {
      const countryTemplate = `
      <li class="country">
        <div class="countryInfo">
          <p><span>Country :</span> ${data[i].name.common}</p>
          <p><span>Capital(s) :</span> ${data[i].capital.join(", ")}</p>
          <p class="currency"><span>Continent :</span> ${data[i].region}</p>
          <div class="cont-img"><img src=${
            (data[i].flags && data[i].flags.png) ||
            (data[i].flags && data[i].flags.svg)
          } alt="flag"></div>
        </div>
      </li>`;

      $("#countriesList").append(countryTemplate);
    }
  }

  //* Display countries when submitting form
  function showData() {
    $("form").submit((e) => {
      e.preventDefault();

      $(".country").remove(); // Empty list

      showSpinner();

      setTimeout(hideSpinner, 1000);

      setTimeout(getAllCountries, 1000);
    });
  }
  showData();

  //* Show loader
  function showSpinner() {
    $("#loader").css("display", "block");
  }

  //* Hide loader
  function hideSpinner() {
    $("#loader").css("display", "none");
  }

  //* Reset form
  function reset() {
    $("#btnReset").click(() => {
      $("form")[0].reset(); // [0] => jQuery doesn’t have a reset() method, but native JS does; so, we have to convert the jQuery element into a JS one

      $("#countriesList").empty();

      $(".errorMsg").css("display", "none");

      $("#name").prop("disabled", false);

      showAllCountries();
    });
  }
  reset();

  //* Get countries info depending on checked radio button
  async function getAllCountries() {
    let url,
      inputValue = $("#name").val(),
      selectOptionValue = $("#continent-select option:selected").text(),
      result;

    if ($("#country-btn").is(":checked")) {
      url = `${API_URL}/country/${inputValue}`;
    } else if ($("#capital-btn").is(":checked")) {
      url = `${API_URL}/capital/${inputValue}`;
    } else if (
      $("#continent-btn").is(":checked") &&
      $("#continent-select option").is(":selected")
    ) {
      url = `${API_URL}/continent/${selectOptionValue}`;
    }

    result = await $.ajax({
      url: url,
      success: populateCountryInfo,
      error: (error) => {
        console.error(error);
        handleNoDataFound();
        showAllCountries();
      },
    });
    return result;
  }

  function handleContinentErrorMsg() {
    $(".input-radio-group:nth-child(3) input").click(() => {
      $(".errorMsg").css("display", "block");
      $("#name").prop("disabled", true);
    });

    $(".input-radio-group input").click((e) => {
      if (!$(e.target).is(".input-radio-group:nth-child(3) input")) {
        // All radio buttons except the continent one
        $(".errorMsg").css("display", "none");
        $("#name").prop("disabled", false);
      }
    });
  }
  handleContinentErrorMsg();

  //* Dynamically add year to footer
  function addYearToFooter() {
    const currentYear = new Date().getFullYear();
    $(".year").prepend(currentYear);
  }
  addYearToFooter();
});
