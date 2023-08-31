<?php

$images = $_FILES;

$types = ["image/jpeg", "image/png"];

foreach ($images as $image) {
    if (!in_array($image["type"], $types)) {
        die('Incorrect file type');
    }

    $fileSize = $image["size"] / 1000000;
    $maxSize = 1;

    if ($fileSize > $maxSize) {
        die('Incorrect file size');
    }

    if (!is_dir('../uploads')) {
        mkdir('../uploads', 0777, true);
    }

    $extension = pathinfo($image["name"], PATHINFO_EXTENSION);
    $fileName = time() . ".$extension";

    if (!move_uploaded_file($image["tmp_name"], "../uploads/" . $fileName)) {
        die('Error upload file');
    }

    sleep(1);
}

echo json_encode(["status" => true]);