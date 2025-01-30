import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo ,editTodo} from "../features/todo/todoSlice";
import { Container, Row, Col, Card, ListGroup,
    Form, Button, Badge } from "react-bootstrap";
import { useState } from "react";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");


  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSave = (id) => {
    dispatch(editTodo({ id, text: editedText }));
    setEditingId(null);
  };
  

  if (loading) {
    return <p className="text-center text-secondary">Loading todos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (
    <Container className="mt-4" >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center text-primary">Todo List</Card.Title>
            <ListGroup variant="flush">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 className="mb-1">{todo.title}</h5>
                      <p className={`mb-1 ${todo.completed ? "text-success" : "text-danger"}`}>
                        {todo.completed ? "Completed" : "Not Completed"}
                      </p>
                      <Badge bg="info">{todo.status}</Badge>
                      <p
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        className={`mt-2 cursor-pointer ${todo.completed ? "text-muted text-decoration-line-through" : "text-dark"}`}
                        style={{ cursor: "pointer" }}
                      >
                        {todo.text}
                      </p>
                      {editingId === todo.id ? (
            <Form.Control
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />) : (
                todo.text
              )}
                    </div>
                    {editingId === todo.id ? (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSave(todo.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(todo.id, todo.text)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button variant="danger" size="sm" onClick={() => dispatch(deleteTodo(todo.id))}>
                      Delete
                    </Button>
                   
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-center text-muted">No todos available</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
