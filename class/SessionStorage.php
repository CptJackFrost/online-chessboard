<?php

class SessionStorage implements Storage
{   
    public $name;

    function __construct($name){
        session_start();
    }


    function save($figures){
        $_SESSION[$this->name] = $figures;
    }

    function load(){
        return $_SESSION[$this->name];
    }
}