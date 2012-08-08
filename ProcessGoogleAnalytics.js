$(document).ready(function(){

	/**
	 * Audience - Visits - Chart Visits
	 */
	$.post(config.urls.admin + config.ga_page_name + '/audiencevisits/',function(data){
		
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
		
		$.jqplot('audience_visits_chart',data,options);
		
	},'json');
	
	/**
	 * Audience - Visits - Statistics
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/audiencevisitsstats/',function(data){
		$('#audience_visits_stats').html(data);
	},'html');

	/**
	 * Audience - Demographics
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/audiencedemographics/',function(data){
		$('#audience_demographics').html(data);
	},'html');

	/**
	 * Audience - System
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/audiencesystem/',function(data){
		$('#audience_system').html(data);
	},'html');	
	
	/**
	 * Audience - Mobile
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/audiencemobile/',function(data){
		$('#audience_mobile').html(data);
	},'html');	

	
	/**
	 * Content - Chart Pageviews by Date
	 */
	$.post(config.urls.admin + config.ga_page_name + '/contentpageviews/',function(data){
		
		var options = {
		    axes:{
		    	xaxis:{renderer:$.jqplot.DateAxisRenderer},
		    	yaxis:{
		    		min:null,
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
		
		$.jqplot('content_pageviews_chart',data,options);
		
	},'json');

	/**
	 * Content - Statistics
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/contentstats/',function(data){
		$('#content_stats').html(data);
	},'html');

	/**
	 * Traffic Sources - Statistics
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/trafficsourcesstats/',function(data){
		$('#traffic_sources_stats').html(data);
	},'html');

	/**
	 * Traffic Sources - Keywords
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/trafficsourceskeywords/',function(data){
		$('#traffic_sources_keywords').html(data);
	},'html');

	/**
	 * Traffic Sources - Referral
	 */ 	
	$.post(config.urls.admin + config.ga_page_name + '/trafficsourcesreferral/',function(data){
		$('#traffic_sources_referral').html(data);
	},'html');

	
	/**
	 * Toggle Tables by clicking Links
	 */
	$('.ga_header_links a').click(function(){
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
	$('a.ga_display_more_rows').live('click',function(){
		$(this).parents('tr').hide().nextAll('tr:hidden').slice(0,11).show();
		return false;
	});
		
});