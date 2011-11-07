package controllers;

import java.util.List;

import models.Viewing;
import play.db.jpa.JPABase;
import play.mvc.Controller;

public class Viewings extends Controller {

    public static void list() {
        List<Viewing> list = Viewing.findAll();
        renderJSON(list);
    }
    
    public static void persist(Viewing viewing) {
        viewing.save();
        renderJSON(viewing);
    }
    
}
