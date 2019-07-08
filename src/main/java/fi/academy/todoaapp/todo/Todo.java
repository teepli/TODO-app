package fi.academy.todoaapp.todo;

import java.sql.Date;

public class Todo {

    private int id;
    private String subject;
    private String description;
    private Date duedate;
    private boolean finished;

    public Todo() {
    }

    public Todo(String subject, String description) {
        this.subject = subject;
        this.description = description;
    }

    public Todo(String subject, String description, Date duedate) {
        this.subject = subject;
        this.description = description;
        this.duedate = duedate;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDuedate() {
        return duedate;
    }

    public void setDuedate(Date duedate) {
        this.duedate = duedate;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", subject='" + subject + '\'' +
                ", description='" + description + '\'' +
                ", duedate=" + duedate +
                ", finished=" + finished +
                '}';
    }
}
