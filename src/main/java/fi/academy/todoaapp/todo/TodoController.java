package fi.academy.todoaapp.todo;

import fi.academy.todoaapp.dao.Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private Dao dao;

    @Autowired
    public TodoController(Dao dao) {
        this.dao = dao;
    }

    @GetMapping("/test")
    public void test() {
        dao.test();
    }

    @GetMapping("")
    public List<Todo> getTodos() {
        return dao.getTodos();
    }

    @GetMapping("/{id}")
    public Todo getOneTodo(@PathVariable(name = "id", required = true) int id) {
        return dao.getOneTodo(id).get();
    }

    @PostMapping("")
    public void postTodo(@RequestBody Todo todo) {
        dao.addTodo(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable(name = "id", required = true) int id) {
        dao.deleteTodo(id);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable(name = "id", required = true) int id,
                           @RequestBody Todo todo) {
        dao.editTodo(id, todo);
    }
}