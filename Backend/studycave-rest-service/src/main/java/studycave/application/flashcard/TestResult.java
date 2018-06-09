package studycave.application.flashcard;

public class TestResult {
	private Long id;
	private Boolean result;
	
	protected TestResult() {	
	
	}
	
	protected TestResult(Long id, Boolean result) {
		this.id = id;
		this.result = result;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getResult() {
		return result;
	}

	public void setResult(Boolean result) {
		this.result = result;
	}

	

	
	
}
