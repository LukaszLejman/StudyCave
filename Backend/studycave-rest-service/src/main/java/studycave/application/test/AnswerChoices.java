package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class AnswerChoices extends Answer {

	private String content;

	@Column(name = "is_good")
	@JsonProperty("is_good")
	private Boolean good;

	public AnswerChoices() {
		super();
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Boolean getGood() {
		return good;
	}

	public void setGood(Boolean good) {
		this.good = good;
	}

}
