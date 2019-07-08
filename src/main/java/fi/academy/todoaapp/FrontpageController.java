package fi.academy.todoaapp;

import org.springframework.stereotype.Controller;

@Controller
public class FrontpageController {

    public String frontpage() {
        return "index";
    }
}
