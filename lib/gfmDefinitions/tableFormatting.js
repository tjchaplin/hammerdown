module.exports = function(){
	return {
		_currentColumn : 0,
		_inHeaderRow : false,
		_numberOfHeaders : 0,
		table : function(textData){
			textData = textData.replace(/^\s*\|/,'|');
			textData = textData.replace(/\|\s*\|/g,'|\n|');

			return '\n\n'+textData;
		},
		header : function(textData){
			var headerData = this.data(textData);

			this._inHeaderRow=true;
			this._numberOfHeaders++;
			return headerData;
		},
		data : function(textData){
			textData = textData.replace(/^\s*/,'');
			textData = textData.replace(/\s*$/,'');

			if(this._currentColumn === 0)
				textData = '|'+textData;

			this._currentColumn++;
			return textData +'|'
		},
		row : function(rowData){
			rowData = rowData.replace(/^\s*/,'');
			rowData = rowData.replace(/\s*$/,'');
			rowData = rowData.replace(/\|\s*/g,'|');

			this._currentColumn = 0;
			if(this._inHeaderRow)
				return this._headerRow(rowData)

			return '\n'+rowData;
		},
		_headerRow : function(rowData){
			this._inHeaderRow=false;
			
			var headerMarker = '|';
			for (var i = 0; i < this._numberOfHeaders; i++) {
				headerMarker = headerMarker+'---|'
			}
			return '\n'+rowData+'\n'+headerMarker;			
		}
	}
};