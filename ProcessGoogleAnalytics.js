$(document).ready(function(){
	
	//States which sections are loaded. Audience is loaded by default
	var loadedContent = false;
	var loadedTraffic = false;
		
	/**
	 * Initialize JqueryWireTabs
	 */
	$('#ga_form').WireTabs({
		items : $('#ga_form > .Inputfields > .InputfieldWrapper'),
		id : 'ga_tabs'	
	});
	
	/**
	 * Save Options
	 */
	$('#ga_saveOptions').click(function() {
		var startDate = '';
		var endDate = '';
		if ($('#ga_defaultDates:checked').size() == 0) {
			startDate = $('#ga_startDate').val();
			endDate = $('#ga_endDate').val();
		}
		var data = { 'startDate' : startDate, 'endDate' : endDate };
		$.post(config.ga_url + 'changeoptions/', data, function(){
			window.location.reload();		
		});
		return false;
	});
	
	/**
	 * Handle clicks on Tabs
	 */
	$('#_contentWrapper, #_trafficWrapper').click(function() {
		var section = $(this).attr('id');
		if (section == '_contentWrapper' && !loadedContent) {
			loadContent();
			loadedContent = true;
		} else if (section == '_trafficWrapper' && !loadedTraffic) {
			loadTraffic();
			loadedTraffic = true;
		}
	});
	
	
	/**
	 * Helper function to render a Line Chart with jqplot
	 */
	var _renderLineChart = function (div,data) {
		
		var options = {
		    axes:{
		    	xaxis:{renderer:$.jqplot.DateAxisRenderer},
		    	yaxis:{min:null,
		    		tickOptions:{
			    		formatString: '<br><span class="ga_highlight">%i</span>'
		    		}
		    	}
		    },
		    series:[{ lineWidth:4, 
		    	  	  markerOptions: { style : 'circle' },
		    	  	  color : config.ga_chart_color
		    	   }],
		    highlighter: {
			    show: true,
			    sizeAdjust: 7.5
			},
			cursor: {
				show: false
			},
			grid: {
				background: '#F7F9FA'
			}
    	};
    	
    	$(div).removeClass('load');
		$.jqplot(div,data,options);
		
	}

	/**
	 * Load all statistics for the Audience section
	 */
	var loadAudience = function() {

		//Chart Visits
		$.post(config.ga_url + 'audiencevisits/', function(data) {
			_renderLineChart('audience_visits_chart',data);		
		},'json');
		
		//General Statistics
		$.post(config.ga_url + 'audiencevisitsstats/', function(data) {
			$('#audience_visits_stats').removeClass('load').html(data);
		},'html');
		
		//Demographics
		$.post(config.ga_url + 'audiencedemographics/', function(data) {
			$('#audience_demographics').removeClass('load').html(data);
		},'html');
		
		//System
		$.post(config.ga_url + 'audiencesystem/', function(data) {
			$('#audience_system').removeClass('load').html(data);
		},'html');	
		
		//Mobile		
		$.post(config.ga_url + 'audiencemobile/', function(data) {
			$('#audience_mobile').removeClass('load').html(data);
		},'html');	
		
	}

	/**
	 * Load all statistics for the Content section
	 */
	var loadContent = function() {
		
		//Chart pageviews
		$.post(config.ga_url + 'contentpageviews/', function(data) {		
			_renderLineChart('content_pageviews_chart',data);		
		},'json');
		
		//Pages
		$.post(config.ga_url + 'contentstats/', function(data) {
			$('#content_stats').removeClass('load').html(data);
		},'html');
		
	}

	/**
	 * Load all statistics for the Traffic sources section
	 */	
	var loadTraffic = function() {
		
		//General stats
		$.post(config.ga_url + 'trafficsourcesstats/', function(data) {
			$('#traffic_sources_stats').removeClass('load').html(data);
		},'html');
	
		//Keywords
		$.post(config.ga_url + 'trafficsourceskeywords/', function(data) {
			$('#traffic_sources_keywords').removeClass('load').html(data);
		},'html');
		
		//Referral traffic
		$.post(config.ga_url + 'trafficsourcesreferral/', function(data) {
			$('#traffic_sources_referral').removeClass('load').html(data);
		},'html');
	
	}
	
	/**
	 * Toggle Tables by clicking Links
	 */
	$('.ga_header_links a').click(function() {
		var elem = $(this);
		elem.siblings('a').removeClass('on');
		elem.addClass('on');
		var url = elem.attr('href');
		elem.parent().next('div').children('.toggle_element').hide();
		$(url).show();
		return false;
	});
	
	/**
	 * Display more rows from a table
	 */
	$('a.ga_display_more_rows').live('click',function() {
		$(this).parents('tr').hide().nextAll('tr:hidden').slice(0,11).show();
		return false;
	});
	
	//Load audience section by default
	loadAudience();
		
});