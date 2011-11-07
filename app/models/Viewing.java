package models;

import javax.persistence.Entity;

import play.db.jpa.Model;


@Entity
public class Viewing extends Model {
   
    public String address;
    
}
