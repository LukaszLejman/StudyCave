package studycave.application.test;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuestionCreateDTO {
	private String type;
	@JsonProperty("question")
	private String text;
    @JsonProperty("nr")
    private long nrQuestion;
    
    private long points;
    List<AnswerCreateDTO> answers;
    
    protected QuestionCreateDTO(){
    	
    }
    
    
	public QuestionCreateDTO(String type, String text, long nrQuestion, long points, List<AnswerCreateDTO> answers) {
		super();
		this.type = type;
		this.text = text;
		this.nrQuestion = nrQuestion;
		this.points = points;
		this.answers = answers;
	}


	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public long getNrQuestion() {
		return nrQuestion;
	}

	public void setNrQuestion(long nrQuestion) {
		this.nrQuestion = nrQuestion;
	}

	public long getPoints() {
		return points;
	}

	public void setPoints(long points) {
		this.points = points;
	}

	public List<AnswerCreateDTO> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerCreateDTO> answers) {
		this.answers = answers;
	}
    
    
}
