$(document).ready(function(){
	
	//States which sections are loaded. Audience is loaded by default
	var loadedContent = false;
	var loadedTraffic = false;
		
	/**
	 * Initialize JqueryWireTabs
	 *
	 */
	$('#ga_form').WireTabs({
		items : $('#ga_form > .Inputfields > .InputfieldWrapper'),
		id : 'ga_tabs',
		rememberTabs: -1 //Never remind
	});
	
	/**
	 * Handle clicks on Tabs
	 *
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
	 * Render a line chart with jqplot
	 *
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
	 *
	 */
	var loadAudience = function() {

		//Chart Visits
		$.get(config.ga_url + 'audiencevisits/',  function(data) {
			if (data != null) _renderLineChart('audience_visits_chart', data);		
		},'json');
		
		//General Statistics
		$.get(config.ga_url + 'audiencevisitsstats/', function(data) {
			$('#audience_visits_stats').removeClass('load').html(data);
		},'html');
		
		//Demographics
		$.get(config.ga_url + 'audiencedemographics/', function(data) {
			$('#audience_demographics').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');
		
		//System
		$.get(config.ga_url + 'audiencesystem/', function(data) {
			$('#audience_system').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');	
		
		//Mobile		
		$.get(config.ga_url + 'audiencemobile/', function(data) {
			$('#audience_mobile').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');	
		
	}

	/**
	 * Load all statistics for the Content section
	 *
	 */
	var loadContent = function() {
		
		//Chart pageviews
		$.get(config.ga_url + 'contentpageviews/', function(data) {		
			if (data != null) _renderLineChart('content_pageviews_chart', data);		
		},'json');
		
		//Pages
		$.get(config.ga_url + 'contentstats/', function(data) {
			$('#content_stats').removeClass('load').html(data);
		},'html');
		
		//Top Content
		$.get(config.ga_url + 'contenttoppages/', function(data) {
			$('#content_top_pages').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');
		
	}

	/**
	 * Load all statistics for the Traffic sources section
	 *
	 */	
	var loadTraffic = function() {
		
		//General stats
		$.get(config.ga_url + 'trafficsourcesstats/', function(data) {
			$('#traffic_sources_stats').removeClass('load').html(data);
		},'html');
	
		//Keywords
		$.get(config.ga_url + 'trafficsourceskeywords/', function(data) {
			$('#traffic_sources_keywords').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');
		
		//Referral traffic
		$.get(config.ga_url + 'trafficsourcesreferral/', function(data) {
			$('#traffic_sources_referral').removeClass('load').html(data);
			$('table.AdminDataTable td').find('a.ga_display_more_rows').parents('tr').nextAll().hide();
		},'html');
	
	}
		
	/**
	 * Toggle Tables by clicking Links
	 *
	 */
	$('.ga_header_links a').click(function() {
		var $elem = $(this);
		$elem.siblings('a').removeClass('on');
		$elem.addClass('on');
		var tableClass = $elem.attr('href');
		$wrapper = $elem.parent().next('.ga_tables_wrapper');
		$wrapper.find('table:visible').hide();
		$wrapper.find('table.'+tableClass).show();
		return false;
	});
	
	/**
	 * Display more rows from a table
	 *
	 */
	$('a.ga_display_more_rows').live('click', function() {
		$(this).parents('tr').hide().nextAll('tr:hidden').show();
		return false;
	});
	
	//Load audience section by default
	loadAudience();
		
});