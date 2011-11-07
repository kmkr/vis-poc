package controllers;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Viewing;
import play.db.jpa.JPABase;
import play.mvc.Controller;
import play.mvc.Scope;

public class Viewings extends Controller {

    public static void list() {
        List<Viewing> list = Viewing.findAll();
        renderJSON(list);
    }
    
    public static void persist(Viewing viewing) {
        viewing.save();
        renderJSON(viewing);
    }

	public static void update(String body) {
		Viewing v = new Gson().fromJson(body, Viewing.class);
		v.save();
	}
    
}
