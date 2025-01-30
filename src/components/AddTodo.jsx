import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo } from "../features/todo/todoSlice";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";


function AddTodo() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");
  const [completed, setCompleted] = useState(false);
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      status,
      completed,
      text: todo,
    };

    dispatch(addTodo(newTodo));

    setTitle("");
    setStatus("To Do");
    setCompleted(false);
    setTodo("");
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center text-primary">Add a New Todo</Card.Title>
            <Form >
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Todo</Form.Label>
                <Form.Control
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Enter a new Todo"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Mark as Completed"
                  checked={completed}
                  onChange={() => setCompleted(!completed)}
                />
              </Form.Group>

              <Button onClick={handleAdd}
               variant="primary" type="submit" className="w-100">
                Add Todo
              </Button>
              
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTodo;
