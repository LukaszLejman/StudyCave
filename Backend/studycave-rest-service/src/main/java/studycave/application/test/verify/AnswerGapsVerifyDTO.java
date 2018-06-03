package studycave.application.test.verify;

public class AnswerGapsVerifyDTO extends AnswerVerifyDTO {
	protected Long id;
	protected String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
