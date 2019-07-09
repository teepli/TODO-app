package fi.academy.todoaapp.todo;

import fi.academy.todoaapp.dao.Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
    public List<Todo> postTodo(@RequestBody Todo todo) {
        todo.setId(dao.addTodo(todo));

        return Arrays.asList(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable(name = "id", required = true) int id) {
        dao.deleteTodo(id);
    }

    @PutMapping("/{id}")
    public List<Todo> updateTodo(@PathVariable(name = "id", required = true) int id,
                                 @RequestBody Todo todo) {
            dao.editTodo(id, todo);
            return Arrays.asList(todo);

    }
}