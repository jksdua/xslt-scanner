$(function() {
  var editor = ace.edit('editor');
  editor.setShowPrintMargin(false);
  editor.getSession().setMode('ace/mode/xml');
  editor.setTheme('ace/theme/monokai');

  // resize editor
  function resizeAce() {
    var bodyHeight = $('body').outerHeight();
    var windowHeight = window.innerHeight;
    var largerHeight = bodyHeight > windowHeight ? bodyHeight : windowHeight;
    var editor = $('#editor').height(largerHeight - $('.editor-title').outerHeight());
  }

  function outputResults(results) {
    var flat = [];
    var html = '';

    $('.waiting').addClass('hidden');
    $('.results').removeClass('hidden');

    // create flat list
    $.each(results, function(type, items) {
      $.each(items, function(id, findings) {
        if (findings.length) {
          flat.push({ id: id, findings: findings });
        }
      });
    });

    // sort list
    flat.sort(function(a, b) {
      return b.findings.length - a.findings.length;
    });

    $.each(flat, function(index, item) {
      html += '<div class="findings">' +
                '<h4 class="findings-id">' + item.id + '<span class="findings-count">' + item.findings.length + '</span></h4>' +
                '<p class="findings-short-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur excepturi soluta molestias, reprehenderit. Distinctio ab tempore, cumque dolorum dicta</p>' +
                '<h5 class="findings-subtitle">Instances identified</h5>' +
                '<ul class="findings-list">';

      $.each(item.findings, function(index, finding) {
        html += '<li><a href="#' + finding.lineNumber + ':' + finding.columnNumber + '">' +
                  '<span class="findings-line-number">Line ' + finding.lineNumber + '</span>' +
                  '<span>: </span>' +
                  '<span class="findings-column-number">col ' + finding.columnNumber + '</span>' +
                '</a></li>';
      });

      html += '</ul></div>';
    });

    $('.results').html(html);
  }

  function init() {
    resizeAce();
  }

  function scan() {
    var data = JSON.stringify({ xslt: editor.getValue() });
    $.ajax({
      url: '/v1/scan',
      type: 'POST',
      data: data,
      contentType: 'application/json'
    }).done(outputResults).fail(function(e) {
      vex.dialog.alert({
        message: '<h2>Error:</h2><p>' + JSON.stringify(e) + '</p>',
        className: 'vex-theme-wireframe'
      });
    });
  }

  $(window).on('resize', resizeAce);
  editor.on('change', $.debounce(scan, 300));

  init();
});
