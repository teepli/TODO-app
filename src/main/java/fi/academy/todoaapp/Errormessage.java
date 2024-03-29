package fi.academy.todoaapp;


import java.util.Date;

public class Errormessage {

    private String message;
    private Date date;

    public Errormessage() {
        this("Random error");
    }

    public Errormessage(String message) {
        this.message = message;
        this.date = new Date();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
