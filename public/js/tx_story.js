/* global $, document */
/* exported show_tx_step */
//var lsKey = 'marbles';
//var fromLS = {};

// =================================================================================
// On Load
// =================================================================================
$(document).on('ready', function() {
	//fromLS = window.localStorage.getItem(lsKey);
	//if(fromLS) fromLS = JSON.parse(fromLS);
	//else fromLS = {};
	
	// =================================================================================
	// jQuery UI Events
	// =================================================================================
	$('#closeTxStory').click(function(){
		$('#txStoryPanel, #tint').fadeOut();
	});

});
// =================================================================================
// Start Up Fun
// ================================================================================

//show the current step from the start up panel
function show_tx_step(obj){
	var state = obj.state;
	$('#txStoryPanel, #tint').fadeIn();

	if(state === 'building_proposal'){
		$('#txStep1').removeClass('inactiveStep');
		$('#txStep2, #txStep3, #txStep4').addClass('inactiveStep');

		setTimeout(function(){story1_animation();}, 500);
		setTimeout(function(){show_tx_step({state: 'endorsing'});}, 3000);
	}
	else if(state === 'endorsing'){
		$('#txStep1, #txStep2').removeClass('inactiveStep');
		$('#txStep3, #txStep4').addClass('inactiveStep');
		$('#txStep1').addClass('stepComplete');

		story2_animation();
	}
	else if(state === 'ordering'){
		setTimeout(function(){
			$('#txStep1, #txStep2, #txStep3').removeClass('inactiveStep');
			$('#txStep4').addClass('inactiveStep');
			$('#txStep1, #txStep2').addClass('stepComplete');

			story3_animation();
			setTimeout(function(){show_tx_step({state: 'committing'});}, 4000);
		}, 1000);
	}
	else if(state === 'committing'){
		$('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('inactiveStep');
		$('#txStep1, #txStep2, #txStep3').addClass('stepComplete');

		story4_animation(220);
		setTimeout(function(){show_tx_step({state: 'finished'});}, 5000);
	}
	else if(state === 'finished'){
		$('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('inactiveStep');
		$('#txStep1, #txStep2, #txStep3, #txStep4').addClass('stepComplete');
	}
}


//1. animate borders to join marble in center
function story1_animation(){
	var dist = 50;
	$('#marbleBorderTop, #marbleBorderBottom, #marbleBorderLeft, #marbleBorderRight').show();
	$('#marbleBorderTop').animate({top: '+=' + dist}, {duration: 1800});
	$('#marbleBorderBottom').animate({top: '-=' + dist}, {duration: 1300});
	$('#marbleBorderLeft').animate({left: '+=' + dist}, {duration: 800});
	$('#marbleBorderRight').animate({left: '-=' + dist}, {duration: 800});
}

//1. show marble that will roll 
//2. hide all other border marbles (?) dsh to do remove
//3. roll it
//4. hide rolled marble
//5. show endorse marble with icon
function story2_animation(){
	$('#proposeMarble').show();

	$('#proposeMarbleStable').removeClass('hideBorders');
	$('#marbleBorderTop').hide();
	$('#marbleBorderBottom').hide();
	$('#marbleBorderLeft').hide();
	$('#marbleBorderRight').hide();

	roll_ball('#proposeMarble', 235, function(){
		$('#proposeMarble').hide();
		$('#endorseMarbleStable').show();
	});
}

//1. show the marble that will roll
//2. roll endorsed marble
//3. show orderer marbles
//4. build box around marbles
function story3_animation(){
	$('#endorseMarble').show();
	roll_ball('#endorseMarble', 240, function(){
		$('#endorseMarbleStable').show();
		$('.ordererMarbles').fadeIn();
		setTimeout(function(){
			$('#orderBoxStable').fadeIn(1000);
		}, 300);
	});
}

//1. fade in solid box around marbles
//2. animate it right
function story4_animation(dist){
	$('#orderBox').fadeIn(1000);
	setTimeout(function(){
		//$('#proposeMarbleStable, .ordererMarbles').hide();
		setTimeout(function(){
			$('#orderBox').animate({left: '+=' + dist}, {
				duration: 2000,
				/*complete: function(){
					$('#orderBoxStable').css('background', '#2EB9D6');
				}*/
			});
		}, 500);
	}, 1000);
}

//roll a circle right xxx distance
function roll_ball(who, move, cb) {
	if(!cb) cb = function(){};

	$(who).animate({left: '+='+move}, {
		duration: 2000,
		step: function(distance) {
			var degree = distance * 360 / move;
			$(who).css('transform','rotate(' + degree + 'deg)');
		},
		complete: cb
	});
}
