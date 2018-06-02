package studycave.application.test.verify;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AnswerChoicesVerifyDTO extends AnswerVerifyDTO{
	String content;
	@JsonProperty(value="is_good")
	Boolean isGood;

	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Boolean getIsGood() {
		return isGood;
	}
	public void setIsGood(Boolean isGood) {
		this.isGood = isGood;
	}

	
	
	
	
	
}
