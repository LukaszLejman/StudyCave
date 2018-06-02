package studycave.application.test.verify;

import org.springframework.data.annotation.Transient;


public abstract class AnswerVerifyDTO {

	protected Long id;

	@Transient
	protected String type;

	public AnswerVerifyDTO() {
		super();

	}

	public AnswerVerifyDTO(Long id) {
		super();
		this.id = id;
		this.type = "test";
	}

	public AnswerVerifyDTO(Long id, String type) {
		super();
		this.id = id;
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
