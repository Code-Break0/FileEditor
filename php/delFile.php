<?php

	$path = str_replace('\\', '/', realpath($_POST['path']));


	function remove($path) {
		$result = true;
		if(is_file($path)) {
			if(!unlink($path)) {
				$result = false;
			}
		}
		else {
			$files = scandir($path);
			foreach($files as $file) {
				if($file !== '.' && $file !== '..') {
					$filepath = str_replace('\\', '/', realpath($path . '/' . $file));
					if(file_exists($filepath)) {
						if(!remove($filepath)) {
							$result = false;
						}
					}
				}
			}
			if(!rmdir($path)) {
				$result = false;
			}
		}

		return $result;
	}

	if(file_exists($path)) {
		echo remove($path);
	}
	else {
		echo 'Does Not Exist';
	}

?>