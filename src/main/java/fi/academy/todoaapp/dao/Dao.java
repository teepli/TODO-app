package fi.academy.todoaapp.dao;

import fi.academy.todoaapp.todo.Todo;

import java.util.List;
import java.util.Optional;

public interface Dao {

    List<Todo> getTodos();
    Optional<Todo> getOneTodo(int id);
    int addTodo(Todo todo);
    Todo deleteTodo(int id);
    int editTodo(int id, Todo todo);
    void test();
}
