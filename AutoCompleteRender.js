function AutoComplete($)
{
	this.SortDecriptions;	
	this.Tooltiptext;
	this.Insert;
	this.Update;
	this.ShowNoSuggestion;
	this.AutoSelectFrist;
	this.Class;
	this.Width;
	this.Height;
	this.AutoFill;
	this.GroupBy;
	this.MaxHeight;
	this.MinChars;
	this.TabDisabled;
	this.RestFull;
	this.SelectedItem;
	this.NoSuggestionNotice;
	this.ServiceParameters;
	this.Verb;

	// Databinding for property RestFull
	this.SetRestFull = function(data)
	{
		///UserCodeRegionStart:[SetRestFull] (do not remove this comment.)
		this.RestFull = data;
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}

	// Databinding for property RestFull
	this.GetRestFull = function()
	{
		///UserCodeRegionStart:[GetRestFull] (do not remove this comment.)
		return this.RestFull;
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}

	// Databinding for property SelectedItem
	this.SetSelectedItem = function(data)
	{
		///UserCodeRegionStart:[SetSelectedItem] (do not remove this comment.)
       this.SelectedItem = data;
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}

	// Databinding for property SelectedItem
	this.GetSelectedItem = function()
	{
		///UserCodeRegionStart:[GetSelectedItem] (do not remove this comment.)
       return this.SelectedItem;
		///UserCodeRegionEnd: (do not remove this comment.)
	}
	
	// Databinding for property ServiceParameters
	this.SetServiceParameters = function(data)
	{
		///UserCodeRegionStart:[SetValues] (do not remove this comment.)
		this.ServiceParameters = data;
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}

	// Databinding for property ServiceParameters
	this.GetServiceParameters = function()
	{
		///UserCodeRegionStart:[GetValues] (do not remove this comment.)
		return this.ServiceParameters;

		///UserCodeRegionEnd: (do not remove this comment.)
	}	

	this.show = function()
	{
		///UserCodeRegionStart:[show] (do not remove this comment.)
			var container = this.getContainerControl();			
			var buffer    = "";			

		    if(!this.IsPostBack)
		    {
	 		$('#'+container.id).append('<div style="position: relative; height:'+this.Height+'px;">'+
									   '<input type="text" name="KnetApp" id="autocomplete-ajax" class="'+this.Class+'" style="z-index: 2; height:'+this.Height+'; '+
												'width:'+this.Width+';" />'+
										'</div>'+
										'<div id="selection-ajax"></div>');
		    }			
			this.autocomplete(this);	
		
		
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}
	///UserCodeRegionStart:[User Functions] (do not remove this comment.)
        var DotNet = gx.gen.isDotNet();
		var Java   = gx.gen.isJava();		
	    var path   = gx.util.resourceUrl(gx.basePath + gx.staticDirectory, true)+'rest/';	
						
		
		this.autocomplete =  function(e) {	
		'use strict';	
		
		var _this = this;
		function toQueryString(obj) {
			var parts = {};
			var parmLength = obj.length;
			for (var i = 0; i < parmLength; i++) {
				parts[obj[i].Key] = obj[i].Value;
			}
		return parts;
		}
		
		var parms = {};
		if (this.ServiceParameters.Params!=undefined)
		{
			parms = toQueryString(this.ServiceParameters.Params);
		}
		$("#autocomplete-ajax").autocomplete({
				autoFocus  : true,
				serviceUrl : (gx.ajax.isabsoluteurl(this.RestFull)?this.RestFull:path+this.RestFull),
				autoFill   : this.AutoFill,
				minChars   : this.MinChars,
				maxHeight  : this.MaxHeight,
				tabDisabled: this.TabDisabled,
				showNoSuggestionNotice: this.ShowNoSuggestion,
				noSuggestionNotice	  : this.NoSuggestionNotice,
				autoSelectFirst       : this.AutoSelectFrist,
				groupBy               : (this.GroupBy==""?undefined:this.GroupBy),
				params: parms,
				type: this.Verb,
				dataType: 'text',
				paramName: 'query',
				noCache: false,
				success: function (data) {                 
              	},
				lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
					var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
					return re.test(suggestion.value);
				},				
				failure: function (data) {
					 console.log("Propiedad no encontrada!");
				},							
				onSelect: function(suggestion) {
					if(_this.Update) {
					  events(e,suggestion.id,suggestion.value);
					}else{
					$('#selection-ajax').html('<div class="btn-group" role="group" style="padding:5px">'+
												'<div id="update" style=" float: left; padding-right: 10px;">' +
												'<a class="btn btn btn-success"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Update</a>' +
											  '</div>' +
											  
											  '<div id="remove" style=" float: right;">' +
											 	'<a class="btn btn btn-danger" ><span class="glyphicon glyphicon-remove"></span>&nbsp;Remove</a>' +
											  '</div></div>');
											 
					events(e,suggestion.id,suggestion.value);					 
					};
					_this.SetSelectedItem({ID: suggestion.id, VALUE: suggestion.value});
	
				},				
				onHint: function(hint) {
				   var resultado = $('#autocomplete-ajax-x').val(hint);				
				},				
				onInvalidateSelection: function() {
					
				}
							
			});			

			$('#autocomplete-ajax').change(function() {				
				var result =  $("#autocomplete-ajax").val(); 						   
			
			if(_this.Insert){
				events(e,"",result);
			}else{						 
				$('#selection-ajax').html('<div id="inserir" class="btn-group" role="group" style="padding:5px">' +
											'<a class="btn btn btn-success">' +
												'<span class="glyphicon glyphicon-pencil"></span>&nbsp;'+result+
											'</a>'+										
										  '</div>');
			}		   			   
			events(e,"",result);		   		   
			});
			
			function events(a,b,c){				
				
				$('#inserir').click(function(){
					a.SelectedItem.ID    = b;
					a.SelectedItem.VALUE = c ;
					a.onclick();
				});
				
				$('#update').click(function(){
					a.SelectedItem.ID    = b;
					a.SelectedItem.VALUE = c ;
					a.onclick();
				});
								
				$('#remove').click(function(){
					a.SelectedItem.ID    = b;
					a.SelectedItem.VALUE = c ;
					a.onclick();
				});
			};

			
	};
	
	///UserCodeRegionEnd: (do not remove this comment.):
}
