package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;


//@DiscriminatorValue("1")
@Entity
public class QuestionChoices extends Question {
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerChoices> answers = new ArrayList<>();
	
	
	public QuestionChoices(){
		super();
	}

	public List<AnswerChoices> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerChoices> answers) {
		this.answers = answers;
	}
	
	public void setType() {
		this.type = "choices";
	}
	
}
