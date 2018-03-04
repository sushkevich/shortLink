<?php

if(isset($_GET['url'])){
$h = "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm1234567890";
$rand = substr(str_shuffle($h), 0, 5);
$site = "http://something.com/";
$url = $_GET['url'];

$result = "<a href='$site$rand' target='_blank'>$site$rand</a>";
$f = fopen("a/$rand.php", "w");
fwrite($f, "<?php header('Location: $url') ?>");
fclose($f);

$fh = fopen(".htaccess", "a");
fwrite($fh, "
RewriteRule ^$rand$ /a/$rand.php");
fclose($fh);

echo json_encode($result);
exit;
}

?>