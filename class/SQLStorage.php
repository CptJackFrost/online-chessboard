<?php  

class SQLStorage implements Storage
{
    public $pdo;

    function __construct($dns, $user, $password){
        $this->pdo = new PDO($dns, $user, $password);
    }

    function save($figures){
        $this->pdo
                ->prepare('UPDATE board SET figures = ?')
                ->execute(array($figures));
        return $this->load();

    }

    function load(){
        return $this->pdo
                ->query('SELECT figures FROM board')
                ->fetch()[0];
    }

}
