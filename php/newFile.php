<?php
	$file = $_POST['filename'];
	$dir = str_replace('\\', '/', realpath($_POST['dir']));


	$dst = $dir . '/' . $file;

	if(file_exists($dst)) {
		echo 'File Exists!';
	}
	else {
		//Check if it should be a folder or file
		if(strpos($file, '.') > 1) {
			if(touch($dst)) {
				echo true;
			}
			else {
				echo 'Failed to create file';
			}
		}		
		else {
			if(mkdir($dst)) {
				echo true;
			}
			else {
				echo 'Failed to create folder';
			}
		}
	}

?>