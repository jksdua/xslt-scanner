/* jshint node:true */

'use strict';

var _ = require('lodash');

module.exports = [

	{
		tag: 'xsl:copy',
		description: '',
		recommendation: ''
	},

	{
		tag: 'xsl:copy-of',
		description: ''
	},

	{
		tag: 'xsl:evaluate',
		description: ''
	},

	{
		tag: 'xsl:function',
		description: ''
	},

	{
		tag: 'xsl:attribute',
		isVulnerable: function(node) {
			var nameAttribute = _.find(node.attributes, { name: 'name' });
			if (['src', 'href'].indexOf(nameAttribute.value) > -1) {
				/*
					If src was explicitly set, it would look like this:
					`<xsl:attribute name="src">some_path</xsl:attribute>`

					Otherwise, it could have a complex child node structure indicating it is most likely copying values from the source doc
					```
					<xsl:attribute name="src">
							<xsl:choose>
									<xsl:when test="//abc:a='b'">
											<xsl:value-of select="//abc:a"/>
									</xsl:when>
									<xsl:otherwise>
											<xsl:value-of select="//abc:b"/>
									</xsl:otherwise>
							</xsl:choose>
					</xsl:attribute>
					```
				*/
				return node.hasChildNodes();
			}
		},
		description: 'For images, lets you expose referer. For scripts, lets you insert arbitrary JavaScript code'
	}

];
