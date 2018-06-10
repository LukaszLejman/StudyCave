package studycave.application.test;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AnswerCreateDTO {
	private String content;
	@JsonProperty("is_good")
    private boolean good;
	
	
	protected AnswerCreateDTO(){

	}

	public AnswerCreateDTO(String content, boolean good) {
		super();
		this.content = content;
		this.good = good;
	}




	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public boolean isGood() {
		return good;
	}


	public void setGood(boolean good) {
		this.good = good;
	}
	
}
