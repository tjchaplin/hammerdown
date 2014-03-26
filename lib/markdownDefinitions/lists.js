var stringExtensions = require('../utils/stringExtensions');

module.exports = function(){
	return {
		_currentListState : {listDefinition:{depth:0,number:0},_isOrderedList:false,_isUnOrderedList:false},
		_listStates : [],
		orderedList : function(){
			var currentListDefinition = this._currentListState.listDefinition;
			var listDefinition = {depth:currentListDefinition.depth+1,number:currentListDefinition.number+1};
			var listState = {
				listDefinition : listDefinition,
				_isOrderedList : true,
				_isUnOrderedList :false
			};
			this._listStates.push(this._currentListState);
			this._currentListState = listState;
		},
		unOrderedList : function(){
			var currentListDefinition = this._currentListState.listDefinition;
			var listDefinition = {depth:currentListDefinition.depth+1,number:0};
			var listState = {
				listDefinition : listDefinition,
				_isOrderedList : false,
				_isUnOrderedList :true
			};

			this._listStates.push(this._currentListState);
			this._currentListState = listState;
		},
		listClose : function(){
			this._currentListState = this._listStates.pop();
		},
		listItem : function(text){
			var item = '';
			var listDefinition = this._currentListState.listDefinition;

			if(this._currentListState._isUnOrderedList)
				item = listItem(text, '* ',listDefinition.depth);
			else if(this._currentListState._isOrderedList){
				item = listItem(text, listDefinition.number+'. ',listDefinition.depth);
				this._currentListState.listDefinition.number += 1;
			}
			return '\n'+item;
		}
	};
};

var listItem = function(text, itemMarker, depth){
	if(!text)
		text = '';

	text = text.replace(/^[\n]*/,'');
	text = text.replace(/[\n]$/,'');
	var doesntStartWithInnerLineFormatting = (/^[^   ]/).test(text);
	if(doesntStartWithInnerLineFormatting)
		text = text.replace(/\n/g,'\n'+stringExtensions.padLeft('  ', (depth - 1) * 2));

	var doesntStartWithNewline = (/^[^\n]/).test(text);
	var doesntStartWithInnerLineFormatting = (/^[^   ]/).test(text);
	if((doesntStartWithNewline && doesntStartWithInnerLineFormatting) || text === '')
		text = stringExtensions.padLeft(itemMarker, (depth - 1) * 2)+text;
	
	return text;
};