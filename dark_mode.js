//Latauksessa aseta kuu ikoni ja title OFF
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setIcon({
    path : "images/kuu_48.png"
  });
  chrome.action.setTitle({
    title: 'OFF'
  });
});

  // Käyttäjä painaa laajennusikonia
  chrome.action.onClicked.addListener(async (tab) => {
    // Katsotaan onko päällä vai pois
    const prevState = await chrome.action.getTitle({ tabId: tab.id });
    // Seuraava tila on päinvastainen
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    
    await chrome.action.setTitle({
      tabId: tab.id,
      title: nextState
    });

    if (nextState === 'ON') {
      // Injektoi CSS määritykset kun käyttäjä laittaa laajennuksen päälle ja vaihda ikoni
      await chrome.scripting.insertCSS({
        files: ['dark_mode.css'],
        target: { tabId: tab.id }
      });
      await chrome.action.setIcon({
        path : "images/pentagrammi_48.png"
      });
    } else if (nextState === 'OFF') {
      // Poista CSS määritys kun käyttäjä laittaa laajennuksen pois päältä ja vaihda ikoni
      await chrome.scripting.removeCSS({
        files: ['dark_mode.css'],
        target: { tabId: tab.id }
      });
      await chrome.action.setIcon({
        path : "images/kuu_48.png"
      });
    }
});