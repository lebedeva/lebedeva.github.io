input.validity = {  
    valid:false // If the input is valid
    customError:false // If a custom error message has been set
    patternMismatch:false // If the invalidity is against the pattern attribute
    rangeOverflow:false // If the invalidity is against the max attribute
    rangeUnderflow:true // If the invalidity is against the min attribute
    stepMismatch:true // If the invalidity is against the step attribute
    tooLong:false // If the invalidity is against the maxlength attribute
    tooShort:false // If the invalidity is against the minlength attribute
    typeMismatch:false // If the invalidity is against the type attribute
    valueMissing:false // If the input is required but empty
}

function CustomValidation() { }  
CustomValidation.prototype = {  
    // Set default empty array of invalidity messages
    invalidities: [],

    // Function to check validity
    checkValidity: function(input) {

        var validity = input.validity;

        if ( validity.patternMismatch ) {
            this.addInvalidity('This is the wrong pattern for this field');
        }
        if ( validity.rangeOverflow ) {
            var max = getAttributeValue(input, 'max');
            this.addInvalidity('The maximum value should be ' + max);
        }
        if ( validity.rangeUnderflow ) {
            var min = getAttributeValue(input, 'min');
            this.addInvalidity('The minimum value should be ' + min);
        } 
        if ( validity.stepMismatch ) {
            var step = getAttributeValue(input, 'step');
            this.addInvalidity('This number needs to be a multiple of ' + step);
        }
        // Additional validity checks here...
    },

    // Add invalidity message to invalidities object
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },

    // Retrieve the invalidity messages
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    }
};

// On click of form submit buttons
submit.addEventListener('click', function(e) {  
    // Loop through all inputs
    for ( var i = 0; i < inputs.length; i++ ) {

        var input = inputs[i];

        // Use native JavaScript checkValidity() function to check if input is valid
        if ( input.checkValidity() == false ) {

            var inputCustomValidation = new CustomValidation(); // New instance of CustomValidation
            inputCustomValidation.checkValidity(input); // Check Invalidities
            var customValidityMessage = inputCustomValidation.getInvalidities(); // Get custom invalidity messages
            input.setCustomValidity( customValidityMessage ); // set as custom validity message

        } // end if
    } // end loop
});

CustomValidation.prototype.getInvaliditiesForHTML = function() {  
    return this.invalidities.join('. <br>');
}

// On click of form submit buttons
submit.addEventListener('click', function(e) {  
    // Loop through all inputs
    for ( var i = 0; i < inputs.length; i++ ) {

        var input = inputs[i];

        // Use native JavaScript checkValidity() function to check if input is valid
        if ( input.checkValidity() == false ) {

            var inputCustomValidation = new CustomValidation(); // New instance of CustomValidation
            inputCustomValidation.checkValidity(input); // Check Invalidities
            var customValidityMessage = inputCustomValidation.getInvalidities(); // Get custom invalidity messages
            input.setCustomValidity( customValidityMessage ); // set as custom validity message

            // DISPLAY ERROR MESSAGES IN DOCUMENT
            var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
            input.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>')
            stopSubmit = true;

        } // end if
    } // end loop
    if ( stopSubmit ) { e.preventDefault(); }
});

CustomValidation.prototype.checkValidity = function(input) {

    // In-built validity checks here ------

    // Custom Validity checks ------
    if ( !input.value.match(/[a-z]/g) ) {
        this.addInvalidity('At least 1 lowercase letter is required');
    }
    if ( !input.value.match(/[A-Z]/g) ) {
    this.addInvalidity('At least 1 uppercase letter is required');
    }
}