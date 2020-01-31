<?php

include 'class/Storage.php';
include 'class/SQLStorage.php';
include 'class/FileStorage.php';
include 'class/SessionStorage.php';
include 'class/Board.php';

//$storage = new SessionStorage('map');
//$storage = new FileStorage('save.txt');
$storage = new SQLStorage('mysql:host=127.0.0.1;dbname=chessboard;charset=utf8', 'root', '');

$board = new Board($storage);

if(isset($_GET['newFigures'])){
    echo $board->newFigures();
}

if (isset($_GET['getFigures'])){
    echo $board->getFigures();
}

if (isset($_GET['moveFigure'])){
    echo $board->moveFigures($_GET['coordFrom'], $_GET['coordTo']);
}