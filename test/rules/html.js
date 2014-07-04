describe('#html', function() {
	var helpers = require(__dirname + '/../_helpers');

	var transform = helpers.fixtures.html;

	it('should pick up html tags', function(done) {
		helpers.scan(transform, function(err, res, body) {
			expect(err).to.not.exist;
			expect(res.statusCode).to.equal(200);
			expect(body.query.html).to.have.length(2);

			done();
		});
	});
});
