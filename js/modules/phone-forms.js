
/*
 *
 * Mask away the URLs from the anchor elements until after the traps are "traversed"
 *
 */
var $trapSites = $( ".loginner_form_phone" ).closest( "[ data-loginner ]" );
$trapSites.find( "a" ).each( function ( _i, domAnchor ) {
	var $anchor = $( domAnchor );
	var url = $anchor.attr( "href" );
	$anchor.removeAttr( "href" );
	$anchor.data( "href", url );
} );

/*
 *
 * Wire in the phone country code UI
 *
 */
$( document ).on( "change", ".js_phone_country_code", function ( event ) {
	var $countryCode = $( event.target );
	var countryCode = $countryCode.val().replace( /[^+0-9]/g, "" );
	$countryCode
		.closest( "form" )
		.find( ".js_phone_country_code_label" )
		.text( countryCode );
} );



/*
 *
 * Register all the phone traps
 *
 */
// -----
// 1. Define all hook functions that are common across all the phone traps
// -----
var onTrigger = function onTrigger ( event ) {
	var $triggerElement = $( event.target ).closest( ".js_user_required" )
	$triggerElement.addClass( "hidden" );
	var $trapSite = $triggerElement.closest( "[ data-loginner ]" );
	$trapSite
		.find( ".loginner_form_phone" )
			.removeClass( "hidden" )
			.find( ".js_phone_number" )
				.get( 0 ).focus();
};
var onPhoneValidationError = function onPhoneValidationError ( message ) {
	__OMEGA.utils.notify( message, {
		level: "error",
		context: "Login Prompt"
	} );
};
var onPhoneSend = function onPhoneSend ( phoneNumber, project ) {
	$( this ).find( ".js_feedback_message" ).text( "Sending....." );
	__OMEGA.utils.getAnalyticsId().then( function ( clientId ) {
		__OMEGA.utils.addPotentialCustomer( phoneNumber, project, clientId );
	} );
};
var onShowOTP = function ( domPhoneForm, domOTPForm, phoneNumber, project ) {
	$( domPhoneForm ).addClass( "hidden" );
	$( domOTPForm ).removeClass( "hidden" );
};
var onOTPSend = function () {
	$( this ).find( ".js_feedback_message" ).text( "Sending....." );
};
var onPhoneError = function ( code, message ) {
	__OMEGA.utils.notify( message, {
		level: "error",
		context: "Login Prompt"
	} );
	console.log( message )
	$( this ).find( "[ type = submit ] span" ).text( "→" );
	$( this ).find( "input, select, button" ).prop( "disabled", false );
};
var onOTPError = function ( code, message ) {
	__OMEGA.utils.notify( message, {
		level: "error",
		context: "Login Prompt"
	} );
	$( this ).find( "[ type = submit ] span" ).text( "Send" );
	$( this ).find( "input, select, button" ).prop( "disabled", false );
};
var onOTPVerified = function ( context, phoneNumber, project ) {
	var url = "/trac/user/new/" + context;
	__OMEGA.utils.trackPageVisit( url );
	__OMEGA.utils.verifyPotentialCustomer( phoneNumber );
};

// -----
// 2. Set the traps.....
// -----
// Large 4BHK section
var $large4BHKFormSite = $( "[ data-loginner = 'Large 4BHK' ]" );
Loginner.registerLoginPrompt( "Large 4BHK", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true );
			$( this ).addClass( "hidden" );

			// Bring back the button
			$large4BHKFormSite.find( ".js_user_required" )
				.removeClass( "hidden" )
		}
	}
} );

// Large 4BHK Download Details section
var $large4BHKEastFacingFormSite = $( "[ data-loginner = 'Large 4BHK House East Facing' ]" );
Loginner.registerLoginPrompt( "Large 4BHK House East Facing", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$large4BHKEastFacingFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );
var $large4BHKWestFacingFormSite = $( "[ data-loginner = 'Large 4BHK House West Facing' ]" );
Loginner.registerLoginPrompt( "Large 4BHK House West Facing", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$large4BHKWestFacingFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );

// Brochure section
var $brochureFormSite = $( "[ data-loginner = 'Brochure' ]" );
Loginner.registerLoginPrompt( "Brochure", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$brochureFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );

// Masterplan section
var $masterplanFormSite = $( "[ data-loginner = 'Masterplan' ]" );
Loginner.registerLoginPrompt( "Masterplan", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$masterplanFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );

// BDA Layout section
var $bdaLayoutFormSite = $( "[ data-loginner = 'BDA Layout' ]" );
Loginner.registerLoginPrompt( "BDA Layout", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$bdaLayoutFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );

// Flexi-plan section
var $flexiplanFormSite = $( "[ data-loginner = 'Flexi-plan' ]" );
Loginner.registerLoginPrompt( "Flexi-plan", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$flexiplanFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );

// Customise House section
var $customiseHouseFormSite = $( "[ data-loginner = 'Customise House' ]" );
Loginner.registerLoginPrompt( "Customise House", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$customiseHouseFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );

// XLarge 4BHK section
var $xLarge4BHKFormSite = $( "[ data-loginner = 'XLarge 4BHK' ]" );
Loginner.registerLoginPrompt( "XLarge 4BHK", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true );
			$( this ).addClass( "hidden" );

			// Bring back the button
			$xLarge4BHKFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );


// XLarge 4BHK Download Details section
var $xLarge4BHKEastFacingFormSite = $( "[ data-loginner = 'XLarge 4BHK House East Facing' ]" );
Loginner.registerLoginPrompt( "XLarge 4BHK House East Facing", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$xLarge4BHKEastFacingFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );
var $xLarge4BHKWestFacingFormSite = $( "[ data-loginner = 'XLarge 4BHK House West Facing' ]" );
Loginner.registerLoginPrompt( "XLarge 4BHK House West Facing", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$xLarge4BHKWestFacingFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );

// Ameneties section
var $amenitiesFormSite = $( "[ data-loginner = 'Amenities' ]" );
Loginner.registerLoginPrompt( "Amenities", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$amenitiesFormSite.find( ".js_user_required" )
				.removeClass( "hidden" );
		}
	}
} );

// Construction Updates section
var $constructionUpdatesFormSite = $( "[ data-loginner = 'Construction Updates' ]" );
Loginner.registerLoginPrompt( "Construction Updates", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true );
			$( this ).addClass( "hidden" );

			// Bring back the button
			$constructionUpdatesFormSite.find( ".js_user_required" )
				.removeClass( "hidden" )
		}
	}
} );

// Enquiry section
var $enquiryFormSite = $( "[ data-loginner = 'Enquiry' ]" );
Loginner.registerLoginPrompt( "Enquiry", {
	onTrigger: function onTrigger ( event ) {
		$enquiryFormSite.find( ".js_enquiry_form" ).addClass( "hidden" );
		$enquiryFormSite
			.find( ".loginner_form_phone" )
				.removeClass( "hidden" )
				.find( ".js_phone_number" )
					.get( 0 ).focus();
	},
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the enquiry form, and submit it
			$enquiryFormSite.find( ".js_enquiry_form" )
				.removeClass( "hidden" )
				.trigger( "submit" );
		}
	}
} );

// Contact section
var $contactFormSite = $( "[ data-loginner = 'Contact' ]" );
Loginner.registerLoginPrompt( "Contact", {
	onTrigger: onTrigger,
	onPhoneValidationError: onPhoneValidationError,
	onPhoneSend: onPhoneSend,
	onShowOTP: onShowOTP,
	onOTPSend: onOTPSend,
	onPhoneError: onPhoneError,
	onOTPError: onOTPError,
	onOTPVerified: onOTPVerified,
	onLogin: function ( user, context ) {
		if ( this ) {
			// Disable and Hide the form
			$( this )
				.find( "input, select, button" )
				.prop( "disabled", true )
			$( this ).addClass( "hidden" );
			// Bring back the button
			$contactFormSite.find( ".js_user_required" )
				.text( "This Way →" )
				.removeClass( "hidden" );
		}
	}
} );
