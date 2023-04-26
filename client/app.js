
function getUseValue() {
  var radioButtons = document.getElementsByName("uiUsing");
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
}


  function getKouzouValue() {
    var radioButtons = document.getElementsByName("uiKouzou");
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i].value;
      }
    }
  }


  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var kozo = getKouzouValue();
    var typeJutaku = getUseValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var estPricePerSqft = document.getElementById("uiPricePerSqft"); // add this line
   
    //var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  　
    

    $.post(url, {
        get_sqft: parseFloat(sqft.value),
        kouzou: kozo,
        using: typeJutaku,
        location: location.value
    },function(data, status) {
      console.log(data.estimated_price);
      if (data.estimated_price) {
        // estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " 円</h2>";
        // var pricePerSqft = data.estimated_price / parseFloat(sqft.value); //
        // uiPricePerSqft.innerHTML = "<h2>" + pricePerSqft.toFixed(2).toString()　+ " 円　（平方メートル当たりの価格）</h2>";
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toLocaleString() + " 円</h2>";
        estPricePerSqft.innerHTML = "<h2>" + (data.estimated_price / parseFloat(sqft.value)).toFixed(2).toLocaleString() + " 円</h2>"; // add this line
        console.log(status);
      } else {
        estPrice.innerHTML = "<h2>Could not estimate price</h2>";
      }
      console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    //var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;