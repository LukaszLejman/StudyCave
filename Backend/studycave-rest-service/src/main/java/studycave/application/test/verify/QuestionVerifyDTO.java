package studycave.application.test.verify;

import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import io.swagger.annotations.ApiModelProperty;

@JsonDeserialize(using = QuestionVerifyDeserializer.class)
public class QuestionVerifyDTO {
	
	 @ApiModelProperty(position = 1)
	Long id;
	 @ApiModelProperty(position = 2)
	String type;
	
	 @ApiModelProperty(position = 3)
	List<AnswerVerifyDTO> answers;

	public QuestionVerifyDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<AnswerVerifyDTO> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerVerifyDTO> answers) {
		this.answers = answers;
	}
}
