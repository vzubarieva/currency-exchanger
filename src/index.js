import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function clearFields() {
  $('#amount').val("1");
  $('#convertFrom').val("USD");
  $('.showErrors').text("");
  $('.showResult').text("");
}

$(function () {
  $('#exchange').on("click", function () {

    const amount = $('#amount').val();
    const convertFrom = $('#convertFrom').val();
    const convertTo = $('#convertTo').val();

    clearFields();
    let promise = CurrencyService.getCurrencyExchange(convertFrom);

    promise.then(function (response) {
      const body = JSON.parse(response);
      console.log(body)
      const exchangeRate = body.conversion_rates[convertTo];
      if (amount && exchangeRate) {
        $(".showResult").text(exchangeRate * amount)
      } else if (!exchangeRate) {
        $('.showErrors').text(`The currency ${convertTo} doesn't exist`);
      } else if (!amount) {
        $('.showErrors').text(`Please enter the amount`);
      }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });



});


