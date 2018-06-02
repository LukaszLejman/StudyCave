package studycave.application.test.verify;

import java.util.ArrayList;
import java.util.List;

public class ResultResponse {
	float points;
	List<Result> results = new ArrayList<Result>();
	
	
	public ResultResponse(float points, List<Result> results) {
		super();
		this.points = points;
		this.results = results;
	}
	public float getPoints() {
		return points;
	}
	public void setPoints(float points) {
		this.points = points;
	}
	public List<Result> getResults() {
		return results;
	}
	public void setResults(List<Result> results) {
		this.results = results;
	}



}


