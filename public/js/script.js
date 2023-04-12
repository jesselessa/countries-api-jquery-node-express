//! The ready function executes the code after the DOM is fully loaded
$().ready(() => {
  //* Display list of all countries
  async function showAllCountries() {
    let result;

    result = await $.ajax({
      url: "http://localhost:8000/all",
      success: populateCountryInfo,
      error: (error) => {
        console.log(error);
      },
    });
    return result;
  }
  showAllCountries();

  //* Populate countries info
  function populateCountryInfo(data) {
    console.log(data);

    // Handle error message when no data found
    if (data.length === 0) {
      alert(
        "No data found. First, make sure you entered a valid name or picked the right category or selected a region."
      );

      $("form")[0].reset();

      $(".errorMsg").css("display", "none");

      showAllCountries();
    }

    for (i = 0; i < data.length; i++) {
      const countryTemplate = `
      <li class="country">
        <div class="countryInfo">
          <p><span>Country :</span> ${data[i].name.common}</p>
          <p><span>Capital(s) :</span> ${data[i].capital}</p>
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

  //* Show or hide loader
  function showSpinner() {
    $("#loader").css("display", "block");
  }

  function hideSpinner() {
    $("#loader").css("display", "none");
  }

  //* Reset form
  function reset() {
    $("#btnReset").click(() => {
      $("form")[0].reset(); //  $("form").reset() doesn't work because reset is a JS method, so jQuery object must be turned into a JS one
      $("#countriesList").empty();

      $(".errorMsg").css("display", "none");

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
      url = `http://localhost:8000/country/${inputValue}`;
    } else if ($("#capital-btn").is(":checked")) {
      url = `http://localhost:8000/capital/${inputValue}`;
    } else if (
      $("#continent-btn").is(":checked") &&
      $("#continent-select option").is(":selected")
    ) {
      url = `http://localhost:8000/continent/${selectOptionValue}`;
    }

    result = await $.ajax({
      url: url,
      success: populateCountryInfo,
      error: (error) => {
        console.error(error);
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
});