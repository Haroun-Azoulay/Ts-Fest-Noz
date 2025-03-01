$(document).on('change','#eventPaymentMethods',function(){
    if (this.value == "CC") {
        $("#eventPaymentFormContent").css('display', 'initial');
    } else {
        $("#eventPaymentFormContent").css('display', 'none');
    }
});

$(document).on('change','#eventPaymentForm input',function() {
    let inputBillingAddressPostalCode = false;
    let inputCardNumber = false;
    let inputCardSecurityCode = false;
    let inputCardName = false;
    $('#eventPaymentForm input').each(function() {
        if (this.id == "inputBillingAddressPostalCode") {
            if (this.value.length >= 5 && this.value.length <= 5) {
                inputBillingAddressPostalCode = true;
            }
        } else if (this.id == "inputCardNumber") {
            if (this.value.length >= 16 && this.value.length <= 16) {
                inputCardNumber = true;
            }
        } else if (this.id == "inputCardSecurityCode") {
            if (this.value.length >= 3 && this.value.length <= 3) {
                inputCardSecurityCode = true;
            }
        } else if (this.id == "inputCardName") {
            if (this.value.length >= 7) {
                inputCardName = true;
            }
        }
    });
    console.log(inputCardNumber + " " + inputCardSecurityCode + " " + inputCardName);
    if (inputBillingAddressPostalCode
        && inputCardNumber
        && inputCardSecurityCode
        && inputCardName) {
        $("#invalidCardMessage").css('display', 'none');
        $("#validCardMessage").css('display', 'initial');
        $('#submitEventPaymentForm').removeClass("bg-gray-600");
        $('#submitEventPaymentForm').removeClass("hover:bg-gray-700");
        $('#submitEventPaymentForm').addClass("bg-violet-600");
        $('#submitEventPaymentForm').addClass("hover:bg-violet-700");
        $('#submitEventPaymentForm').removeAttr("disabled");
    } else {
        $("#validCardMessage").css('display', 'none');
        $("#invalidCardMessage").css('display', 'initial');
        $('#submitEventPaymentForm').removeClass("bg-violet-600");
        $('#submitEventPaymentForm').removeClass("hover:bg-violet-700");
        $('#submitEventPaymentForm').addClass("bg-gray-600");
        $('#submitEventPaymentForm').addClass("hover:bg-gray-700");
        $('#submitEventPaymentForm').attr("disabled", true);
    }
});