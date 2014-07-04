/* jshint node:true */

'use strict';

module.exports = [

  {
  	id: 'html',
  	descrption: 'Outputting straight html is bad...hmm ok',
  	// search all nodes that dont start with xsl:
    query: '//*[not( starts-with(name(), "xsl:") )]'
  }

];
