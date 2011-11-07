package jobs;

import java.util.List;

import models.Viewing;
import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;
import play.test.Fixtures;
/**
 * Job running on startup of the application. 
 *
 */
@OnApplicationStart
public class Bootstrap extends Job {

	@Override
	public void doJob() throws Exception {
	    if (Viewing.count() == 0) {
			System.out.println("Loading initial data");
			Fixtures.deleteDatabase();
			Fixtures.loadModels("initial-data.yml");
	    }
	}
}
