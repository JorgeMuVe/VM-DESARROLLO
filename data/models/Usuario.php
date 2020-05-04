<?php
    class Usuario {
        // DB stuff
        private $conn;
        private $table = 'usuario';

        // Usuario Properties
        public $idUsuario;
        public $nombreUsuario;
        public $contrasena;
        public $tipoUsuario;
        public $codigoUsuario;

        // Constructor with DB
        public function __construct($db){
            $this->conn = $db;
        }

        // Listar Usuarios
        public function listarUsuarios(){
            // Create query
            $query = 'SELECT * FROM '.$this->table. ';';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Excecute query
            $stmt->execute();

            return $stmt;
        }

        // Agregar Usuario
        public function agregarUsuario() {
            // Create query
            $query = 'CALL agregarUsuario(:registroNacional,:nombreCompleto,:apellidoPaterno,:apellidoMaterno,:nombreUsuario,:contrasena,:tipoUsuario);';
  
            // Prepare statement
            $stmt = $this->conn->prepare($query);
  
            // Clean data
            $this->registroNacional = htmlspecialchars(strip_tags($this->registroNacional));
            $this->nombreCompleto = htmlspecialchars(strip_tags($this->nombreCompleto));
            $this->apellidoPaterno = htmlspecialchars(strip_tags($this->apellidoPaterno));
            $this->apellidoMaterno = htmlspecialchars(strip_tags($this->apellidoMaterno));
            $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
            $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));
            $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));
  
            // Bind data
            $stmt->bindParam(':registroNacional', $this->registroNacional);
            $stmt->bindParam(':nombreCompleto', $this->nombreCompleto);
            $stmt->bindParam(':apellidoPaterno', $this->apellidoPaterno);
            $stmt->bindParam(':apellidoMaterno', $this->apellidoMaterno);
            $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
            $stmt->bindParam(':contrasena', $this->contrasena);
            $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);
  
            // Execute query
            $stmt->execute();
            
            return $stmt;
            //if($stmt->execute()){ return $stmt;}
            //else { return false; }
        }

        // Ingresar Verificar Usuario
        public function ingresarSistema(){
            // Create query
            $query = 'CALL ingresarSistema(:nombreUsuario,:contrasena,:tipoUsuario);';
  
            // Prepare statement
            $stmt = $this->conn->prepare($query);
  
            // Clean data
            $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
            $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));
            $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));

            // Bind data
            $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
            $stmt->bindParam(':contrasena', $this->contrasena);
            $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);

            // Execute Query
            $stmt->execute();

            return $stmt;
        }

        // Buscar un Usuario
        public function buscarUsuarioCliente(){
            // Create query
            $query = 'CALL buscarUsuarioCliente(:codigoUsuario);';
  
            // Prepare statement
            $stmt = $this->conn->prepare($query);
  
            // Clean data
            $this->codigoUsuario = htmlspecialchars(strip_tags($this->codigoUsuario));
  
            // Bind data
            $stmt->bindParam(':codigoUsuario', $this->codigoUsuario);

            // Execute Query
            $stmt->execute();

            return $stmt;
        }
    }
?>