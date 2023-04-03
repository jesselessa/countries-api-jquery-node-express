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
  function populateCountryInfo(countries) {
    countries.forEach((country) => {
      $("#countriesList").append(`
      <li class="country">
        <div class="countryInfo">
          <p><span>Country :</span> ${country.name.common}</p>
          <p><span>Capital(s) :</span> ${country.capital}</p>
          <p class="currency"><span>Continent :</span> ${country.region}</p>
            <p><span>Currency(ies) :</span> ${
              country.currencies && Object.keys(country.currencies) // If no short-circuit operator, warning message
            }</p>
        </div>
      </li>`);
    });
  }

  //* Display countries when submitting form
  function showData() {
    $("form").submit((e) => {
      e.preventDefault();

      $(".country").remove(); // Empty list

      $(".errorMsg").css("display", "none"); 
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

      showAllCountries();
    });
  }
  reset();

  //* Get countries info depending on checked radio button
  function getAllCountries() {
    let url,
      inputValue = $("#name").val(),
      selectOptionValue = $("#continent-select option:selected").text();

    if ($("#country-btn").is(":checked")) {
      url = `https://restcountries.com/v3.1/name/${inputValue}`;
    } else if ($("#capital-btn").is(":checked")) {
      url = `https://restcountries.com/v3.1/capital/${inputValue}`;
    } else if (
      $("#continent-btn").is(":checked") &&
      $("#continent-select option").is(":selected")
    ) {
      url = `https://restcountries.com/v3.1/region/${selectOptionValue}`;
    }

    $.ajax({
      url: url,
      data: "application/x-www-form-urlencoded",
      dataType: "json",
      success: populateCountryInfo,
      error: (error) => {
        console.log(error);
        alert(
          "A problem occured. First, make sure you picked the right category or entered a valid name or selected a region. If so, come back later."
        );
        showAllCountries(); 
      },
    });
  }

  function handleErrorMsg() {
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
  handleErrorMsg();
});
