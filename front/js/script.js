//! The ready function executes the code after the DOM is fully loaded
$().ready(() => {
  //* Display list of all countries
  function showAllCountries() {
    $.ajax({
      url: "https://restcountries.com/v3.1/all",
      dataType: "json",
      success: populateCountryInfo,
      error: (error) => {
        console.log(error);
        alert("A problem occured. Come back later.");
      },
    });
  }
  showAllCountries();

  //* Populate countries info
  function populateCountryInfo(data) {
    data.forEach((country) => {
      $("#countriesList").append(`
      <li class="country">
        <div class="countryInfo">
          <p><span>Country :</span> ${country.name.common}</p>
          <p><span>Capital(s) :</span> ${country.capital}</p>
          <p class="currency"><span>Continent :</span> ${country.region}</p>
            <p><span>Currency(ies) :</span> ${
              country.currencies && Object.keys(country.currencies) //! If no short-circuit operator, warning message
            }</p>
        </div>
      </li>`);
    });
  }

  //* Display data when submitting form
  function showData() {
    $("form").submit((e) => {
      e.preventDefault();

      $(".country").remove();

      showSpinner(); // Display spinner

      setTimeout(hideSpinner, 1000); // After 1 second delay, hide spinner

      setTimeout(getAllCountries, 1000); // After 1 second delay, display data
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
      $("form")[0].reset();
      $("#countriesList").empty(); // To remove data previously displayed

      showAllCountries();
    });
  }
  reset();

  //* Get countries info by name, capital or continent
  function getAllCountries() {
    let url,
      inputValue = $("#name").val(); // To retrieve value of input
    if ($("#country-btn").is(":checked")) {
      url = `https://restcountries.com/v3.1/name/${inputValue}`;
    } else if ($("#capital-btn").is(":checked")) {
      url = `https://restcountries.com/v3.1/capital/${inputValue}`;
    } else if ($("#continent-btn").is(":checked")) {
      url = `https://restcountries.com/v3.1/region/${inputValue}`;
    }

    $.ajax({
      url: url,
      data: "application/x-www-form-urlencoded",
      dataType: "json",
      success: populateCountryInfo,
      error: (error) => {
        console.log(error);
        alert(
          "A problem occured. First, make sure you selected the right category or entered a valid name. If so, come back later."
        );
      },
    });
  }
});
