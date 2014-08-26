/* jshint node:true */

'use strict';

module.exports = [

  {
  	id: 'html',
  	descrption: 'Outputting straight html is bad',
  	// search all nodes that dont start with xsl:
    query: '//*[not( starts-with(name(), "xsl:") )]'
  }

];
