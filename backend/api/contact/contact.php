<?php
class Contact {
    private $conn;

    public function __construct($host, $user, $pass, $dbname) {
        $this->conn = new mysqli($host, $user, $pass, $dbname);
        if ($this->conn->connect_errno) {
            throw new Exception("Database connection failed: " . $this->conn->connect_error);
        }
    }

    public function save($name, $email, $message) {
        $stmt = $this->conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $this->conn->error);
        }
        $stmt->bind_param('sss', $name, $email, $message);
        if (!$stmt->execute()) {
            $stmt->close();
            throw new Exception("Execute failed: " . $stmt->error);
        }
        $stmt->close();
        return true;
    }

    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
}
?>
