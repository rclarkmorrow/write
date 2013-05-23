jQuery(document).ready(function($) {

  var data = {
    last_note: 0
    ,bg: "#ffffff"
    ,fg: "#373737"
    ,ft: "Anonymous Pro"
    ,notes: [{title: "New note",body: "Type."}]
  }

  // Initial data load
  if ( localStorage.getItem('write_data') != null ) {
    data = JSON.parse(localStorage.getItem('write_data') );
  }
  restoreData();

  function StoreData(noteId,note) {
    data.notes[data.last_note].title = $('#title').val();
    data.notes[data.last_note].body = $('#editor').val();
    data.fg = $('#color').val();
    data.bg = $('#background').val();
    data.ft = $('#font').val();
    localStorage.setItem('write_data',JSON.stringify(data));
  }

  function restoreData() {
    document.title = data.notes[data.last_note].title;
    $('#title').val(data.notes[data.last_note].title);
    $('#editor').val(data.notes[data.last_note].body );
    $('#color').val(data.fg);
    $('#background').val(data.bg);
    $('#font').val(data.ft);
    $('body').css('background-color',data.bg);
    $('#title,#editor').css({
      color: data.fg
      ,"font-family": data.ft
    })
    $('#file_picker').empty();
    for(n=0;n<data.notes.length;n++) {
      $('#file_picker').append($('<option value="' + n + '">'+ data.notes[n].title +'</option>'));
    }
  }

  function changeNote(nid) {
    var note;
    if ( nid > 0 ) {
      note = data.notes[nid];
      data.notes.splice(nid,1);
    } else {
      note = {title: "Title",body:"..."}
    }
    data.notes.unshift(note);
    restoreData();
  }

  $('#editor').attr('contenteditable','true');
  $('#editor, #title, #settings input').bind({
    'keyup': function() {
      StoreData('note',$(this).val());
    }
  })

  $('#settings').dialog({
    title: 'Settings',
    modal: true,
    autoOpen: false,
    minWidth: '400',
    open: function(){
      restoreData();
    },
    beforeClose: function(){
      restoreData();
      StoreData();
    }
  });

  $('#settings').tabs();
  $('#settings-button').click(function(){
    $('#settings').dialog("open");
  })

  $('#create_new').click(function(){
    changeNote(-1);
    $('#settings').dialog('close');
  })
  $('#file_picker').change(function(){
    if ( $(this).val() > 0 ) changeNote($(this).val());
  })

  $('#delete').click(function(){
    if ( $('#file_picker option').length > 1 ) {
      data.notes.splice( $('#file_picker option').val(),1);
      restoreData();
    }
  })

});