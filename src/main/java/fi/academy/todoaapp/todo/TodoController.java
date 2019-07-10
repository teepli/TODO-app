package fi.academy.todoaapp.todo;

import fi.academy.todoaapp.Errormessage;
import fi.academy.todoaapp.dao.Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
    public ResponseEntity<?> getOneTodo(@PathVariable(name = "id", required = true) int id) {
        var todoSearch = dao.getOneTodo(id);
        if (!todoSearch.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new Errormessage(String.format("Id %d doesn't exist", id)));
        }
        return ResponseEntity.ok(todoSearch.get());
//        return dao.getOneTodo(id).get();
    }

    @PostMapping("")
    public ResponseEntity<Todo> postTodo(@RequestBody Todo todo) {
        int id = dao.addTodo(todo);
        todo.setId(id);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).body(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable(name = "id", required = true) int id) {
//        dao.deleteTodo(id);
        Todo deleted = dao.deleteTodo(id);
        if (deleted != null)
            return ResponseEntity.ok(deleted);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new Errormessage(String.format("Id %d doesn't exist: not deleted", id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable(name = "id", required = true) int id,
                                        @RequestBody Todo todo) {
//        dao.editTodo(id, todo);
//        return todo;
        int changedRows = dao.editTodo(id, todo);
        if (changedRows != 0) {
//            tiedot.setId(id);
            return ResponseEntity.ok(todo);
        }
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new Errormessage(String.format("Id %d ei ole olemassa: ei muutettu", id)));

    }
}