<?php
$username = explode("/", dirname(__FILE__))[2];
$home = '/home/'.$username;
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$server_data = $home.'/server_data';
// ffmpeg is installed centrally on jspsychlearning
$ffmpeg = '/usr/local/bin/ffmpeg'; 
$filename = $obj["filename"];
$path = $server_data."/audio/".$filename;

if (substr(realpath(dirname($path)), 0, strlen($server_data))!=$server_data) {
    error_log("attempt to write to bad path: ".$path);
} else {
    // decode data
    $data = base64_decode($obj["data"]);
    // save temp .webm file
    $tmp_file_path = tempnam("/tmp", "audio_").".webm";
    file_put_contents($tmp_file_path, $data);
    // convert!
    $cmd = $ffmpeg." -y -i ".$tmp_file_path." ".$path;
    $output = null;
    exec($cmd, $output);
}
?>