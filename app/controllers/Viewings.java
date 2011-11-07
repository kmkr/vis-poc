package controllers;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Viewing;
import play.db.jpa.JPABase;
import play.mvc.Controller;

public class Viewings extends Controller {

    public static void list() {
        List<Viewing> list = Viewing.findAll();
        renderJSON(list);
    }
    
    public static void persist(String body) {
		Viewing viewing = new Gson().fromJson(body, Viewing.class);
        viewing.save();
        renderJSON(viewing);
    }

	public static void update(String body) {
		Viewing updatedViewing = new Gson().fromJson(body, Viewing.class);
		Viewing v = Viewing.findById(updatedViewing.id);
		v.address = updatedViewing.address;
		v.save();
		renderJSON(v);
	}

	public static void destroy(Long id) {
		Viewing viewing = Viewing.findById(id);
		viewing.delete();
	}
    
}
