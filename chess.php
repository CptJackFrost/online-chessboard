<?php

include 'class/Storage.php';
include 'class/FileStorage.php';
include 'class/Board.php';

$storage = new FileStorage('save.txt');
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