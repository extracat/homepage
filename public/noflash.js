(function () {

/*


    // Change these if you use something different in your hook.
    var storageKey = 'mode';
    var classNameDark = 'dark-mode';
    var classNameLight = 'light-mode';

    function setClassOnDocumentBody(mode) {
        var html = document.body.parentNode;
        var body = document.body;

        if (mode == 'dark') {
            html.classList.add(classNameDark);
            body.classList.add(classNameDark);
            html.classList.remove(classNameLight);
            body.classList.remove(classNameLight);
        }
        else {
            html.classList.add(classNameLight);
            body.classList.add(classNameLight);
            html.classList.remove(classNameDark);
            body.classList.remove(classNameDark);
        }
    }

    var preferDarkQuery = '(prefers-color-scheme: dark)';
    var mql = window.matchMedia(preferDarkQuery);
    var supportsColorSchemeQuery = mql.media === preferDarkQuery;
    var localStorageTheme = '';
    try {
        localStorageTheme = window.localStorage.getItem(storageKey);
    } catch (err) {}

    // Determine the source of truth
    if (localStorageTheme == 'dark' || localStorageTheme == 'light') {
        // source of truth from localStorage        
        setClassOnDocumentBody(localStorageTheme);
    } else if (supportsColorSchemeQuery) {
        // source of truth from system
        setClassOnDocumentBody(mql.matches);
        localStorage.setItem(storageKey, mql.matches);
    } else {
        // source of truth from document.body
        var isDarkMode = document.body.classList.contains(classNameDark);
        window.localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
    }

*/

})();

// Look
// https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt