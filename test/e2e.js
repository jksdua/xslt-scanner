describe('#e2e', function() {
	var helpers = require(__dirname + '/_helpers');

	var transform = helpers.fixtures.transform_1;

	it('should pick up vulnerabilities', function(done) {
		helpers.scan(transform, function(err, res, body) {
			expect(err).to.not.exist;
			expect(res.statusCode).to.equal(200);
			expect(body.tags['xsl:copy-of']).to.have.length(3);
			expect(body.tags['xsl:attribute']).to.have.length(7);

			done();
		});
	});
});
