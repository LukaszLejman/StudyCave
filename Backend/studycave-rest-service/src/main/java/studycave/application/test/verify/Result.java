package studycave.application.test.verify;

public class Result {
	protected Long id;
	protected Boolean correct;
	
	
	
	public Result(Long id, Boolean correct) {
		super();
		this.id = id;
		this.correct = correct;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getCorrect() {
		return correct;
	}
	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}

	
	
	
	
	
}
