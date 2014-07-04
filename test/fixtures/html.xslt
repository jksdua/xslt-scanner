<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" indent="yes"/>
	<xsl:template match="/">
		<!-- Incorrect -->
		<b>Test</b>

		<xsl:element name="div">
			<!-- Incorrect nested -->
			<script>alert(1)</script>

			<!-- Correct -->
			<xsl:text>abcd</xsl:text>
		</xsl:element> <!-- </b> -->

	</xsl:template>
</xsl:stylesheet>
