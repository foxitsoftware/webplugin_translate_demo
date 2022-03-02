window.test = () => {
  console.log('testa');
};

Foxit.ready().then(() => {
  // didOpenDocument 就是 docOpen
  Foxit.ReaderApp.addAppListener('docOpen', () => {
    console.log('docOpen');
  });

  Foxit.ReaderApp.addAppListener('willCloseDocument', () => {
    console.log('will close document');
  });

  Foxit.ReaderApp.addAppListener('renderFileSuccess', () => {
    console.log('renderSuccess');
  });

  Foxit.ReaderApp.addAppListener('renderFileFailed', () => {
    console.log('Failed');
  });

  Foxit.ReaderApp.addAppListener('zoomToSuccess', () => {
    console.log('zoomToSuccess');
  });

  Foxit.ReaderApp.addAppListener('tapPage', () => {
    console.log('tapPage21');
  });

  Foxit.ReaderApp.addAppListener('pressPage', () => {
    console.log('pressPagess1');
  });

  Foxit.ReaderApp.addAppListener('selectText', (text) => {
    // vm.UpdateSelectText(text);
    document.getElementById('selectText').innerText = text;
    goTranslate();
  });

  Foxit.ReaderApp.addAppListener('mouseEnter', (type) => {
    console.log('mouseEnteraaa!! ' + type);
  });

  Foxit.ReaderApp.addAppListener('mouseLeave', (type) => {
    console.log('mouseLeave@@!! ' + type);
  });

  Foxit.ReaderApp.addAppListener('doubleTapPage', () => {
    console.log('doubleTapPage@@!! ');
  });

  Foxit.ReaderApp.addAppListener('rightClickPage', () => {
    console.log('rightClickPage@@!! ');
  });

  Foxit.ReaderApp.addAppListener('changeViewModeSuccess', () => {
    console.log('changeViewModeSuccess@@!! ');
  });

  Foxit.ReaderApp.addAppListener('changeViewModeFailed', () => {
    console.log('changeViewModeFailed@@!! ');
  });

  Foxit.ReaderApp.addAppListener('copyTextSuccess', () => {
    console.log('copyTextSuccess@@!!222 ');
  });

  Foxit.ReaderApp.addAppListener('onResultsUpdate', (data) => {
    console.log('onResultsUpdate', data);
  });

  Foxit.ReaderApp.addAppListener('bookmarkAdded', (data) => {
    console.log('bookmarkAdded', data);
  });

  Foxit.ReaderApp.addAppListener('bookmarkRemoved', (data) => {
    console.log('bookmarkRemoved ', data);
  });
});
