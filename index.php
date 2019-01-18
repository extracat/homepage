<?php 
foreach ($_SERVER as $k => $v) {
    echo "\$a[$k] => $v.\n";
} 
?>

<?php //require $_SERVER['DOCUMENT_ROOT']."/index.html";
// header( 'Location: /index.html' ); 




/*

$langs=array(
            'ru'=>array('ru','be','uk','ky','ab','mo','et','lv'),
            'de'=>'de',
            'en'=>'en'
        );


function getBestMatch($default, $langs)
    {


        $language=array();
        if (($list = strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE']))) {
            if (preg_match_all('/([a-z]{1,8}(?:-[a-z]{1,8})?)(?:;q=([0-9.]+))?/', $list, $list)) {
                $language = array_combine($list[1], $list[2]);
                foreach ($language as $n => $v)
                    $language[$n] = $v ? $v : 1;
                    print $language[$n];
                arsort($language, SORT_NUMERIC);
            }
        } 


        $languages=array();
        foreach ($langs as $lang => $alias) {
            if (is_array($alias)) {
                foreach ($alias as $alias_lang) {
                    $languages[strtolower($alias_lang)] = strtolower($lang);
                    print $languages[strtolower($alias_lang)];
                }
            } else $languages[strtolower($alias)]=strtolower($lang);
            print $languages[strtolower($alias)];
        }

        foreach ($language as $l => $v) {
            print $l;
            $s = strtok($l, '-'); // убираем то что идет после тире в языках вида "en-us, ru-ru"
            if (isset($languages[$s]))
                return $languages[$s];
        }
        return $default;
    }

print getBestMatch('en', $langs);

*/

?>