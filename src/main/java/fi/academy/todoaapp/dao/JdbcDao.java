package fi.academy.todoaapp.dao;

import fi.academy.todoaapp.todo.Todo;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class JdbcDao implements Dao {

    private Connection con;

    public JdbcDao() throws SQLException, ClassNotFoundException {
        Class.forName("org.postgresql.Driver");
        con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/todo",
                "postgres", "academy");
    }

    @Override
    public void test() {
        String sql = "INSERT INTO todo (topic, description) VALUES ('test', 'teeest')";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Todo> getTodos() {
        String sql = "SELECT * FROM todo";
        List<Todo> haetut = new ArrayList<>();
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            for (ResultSet rs = pstmt.executeQuery(); rs.next(); ) {
                haetut.add(handleTodo(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Collections.EMPTY_LIST;
        }
        return haetut;
    }

    @Override
    public Optional<Todo> getOneTodo(int id) {
        String sql = "SELECT * FROM Todo WHERE id=?";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            for (ResultSet rs = pstmt.executeQuery(); rs.next(); ) {
                return Optional.of(handleTodo(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Optional.empty();
        }
        return Optional.empty();
    }

    @Override
    public int addTodo(Todo todo) {
        String sql = "INSERT INTO todo (topic, description, duedate) " +
                "VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, todo.getSubject());
            pstmt.setString(2, todo.getDescription());
            pstmt.setDate(3, todo.getDuedate());
            pstmt.executeUpdate();

            ResultSet generatedKey = pstmt.getGeneratedKeys();
            if (generatedKey.next()) {
                return generatedKey.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public boolean deleteTodo(int id) {
        String sql = "DELETE FROM todo WHERE id = ?";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean editTodo(int id, Todo todo) {
        String sql = "UPDATE todo SET topic = ?, description = ?, finished = ? WHERE id = ?";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setString(1, todo.getSubject());
            pstmt.setString(2, todo.getDescription());
            pstmt.setBoolean(3, todo.isFinished());
//            pstmt.setDate(3, todo.getDuedate());
            pstmt.setInt(4, id);
            pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Todo handleTodo(ResultSet rs) throws SQLException {
        Todo todo = new Todo();
        todo.setId(rs.getInt("id"));
        todo.setSubject(rs.getString("topic"));
        todo.setDescription(rs.getString("description"));
        todo.setDuedate(rs.getDate("duedate"));
        todo.setFinished(rs.getBoolean("finished"));
        return todo;
    }
}
