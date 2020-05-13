<?php
    class Producto {
        // DB stuff
        private $conn;
        private $table = 'producto';

        // Producto Properties
        private $idTipoProducto;

        // Constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }

        // 
        public function listarProductoPorTipo(){
            // Create query
            $query = 'CALL listarProductoPorTipo(:tipoProducto);';
  
            // Prepare statement
            $stmt = $this->conn->prepare($query);
  
            // Clean data
            $this->tipoProducto = htmlspecialchars(strip_tags($this->tipoProducto));
  
            // Bind data
            $stmt->bindParam(':tipoProducto', $this->tipoProducto);

            // Execute Query
            $stmt->execute();

            return $stmt;
        }
    }