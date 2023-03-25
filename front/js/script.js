// The ready function executes the code only when the DOM is fully loaded
$(document).ready(() => {
  // * getAllCountries Function
  function getAllCountries() {
    $.ajax({
      url: "https://restcountries.com/v3.1/all",
      type: "GET",
      dataType: "json",
      success: (data) => {
        console.log(data);
        data.forEach((country) => {
          $("#countriesList").append(`
                  <li class="country">
                    <div class="countryInfo">
                      <p><span>Country :</span> ${country.name.common}</p>
                      <p><span>Capital(s) :</span> ${country.capital}</p>
                      <p class="currency"><span>Continent :</span> ${
                        country.region
                      }</p>
                        <p><span>Currency(ies) :</span> ${
                          country.currencies && Object.keys(country.currencies)
                        }</p>                          
                    </div>
                  </li>`);
        });
      },
      error: (error) => {
        console.log(error);
        alert("A problem occured. Come back later.");
      },
    });
  }

  getAllCountries();
});
